/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property } from "./types";
import { toPropertySlug } from "./slug";

export const SITE_URL = "https://browntreeresorts.com";

export interface SEOData {
  title: string;
  description: string;
  path: string; // e.g. "/" or "/ooty-the-earthy-nest-by-brown-tree"
  image: string; // absolute URL
  imageAlt: string;
  /** JSON-LD objects injected only while this route is active; home relies on the static tags in index.html */
  jsonLd?: object[];
}

export const DEFAULT_SEO: SEOData = {
  title: "Brown Tree Resorts | Luxury Resort, Home Stay & Heritage Stays – Ooty, Kothagiri & Kodaikanal",
  description:
    "Brown Tree Resorts offers luxury resorts, home stays and heritage accommodations in Ooty, Kothagiri and Kodaikanal. Experience the Nilgiri and Palani Hills with warm BrownTree hospitality. Book now.",
  path: "/",
  image: "https://i.postimg.cc/9MBBdTWW/nature.png",
  imageAlt: "Misty Nilgiri hillside landscape – Brown Tree Resorts hill station stays",
};

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength);
  return clipped.slice(0, clipped.lastIndexOf(" ")) + "…";
}

function toAbsoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

/** Closest named landmark from whichever shape this property's data uses, for a real (non-fabricated) proximity claim. */
function getNearestLandmark(property: Property): { name: string; distance: string } | null {
  if (property.nearbyLandmarks && property.nearbyLandmarks.length > 0) {
    return property.nearbyLandmarks[0];
  }
  const first = property.nearbyAttractions?.[0];
  if (first?.includes(" – ")) {
    const [name, distance] = first.split(" – ");
    return { name: name.trim(), distance: distance.trim() };
  }
  return null;
}

export function buildPropertySEO(property: Property): SEOData {
  const slug = toPropertySlug(property);
  const city = property.location.split(",")[0].trim();
  const canonical = `${SITE_URL}${slug}`;
  const firstParagraph = property.description.split("\n\n")[0];

  const landmark = getNearestLandmark(property);
  const descriptionTail = landmark
    ? ` Just ${landmark.distance} from ${landmark.name} — book direct for the best rates.`
    : ` Book direct with Brown Tree Resorts for the best rates in ${city}.`;
  const description = `${truncate(firstParagraph, Math.max(158 - descriptionTail.length, 60))}${descriptionTail}`;

  // `property.type` doubles as a filter category on the homepage — for most
  // properties it's just the city name, not an accommodation type, so only
  // surface it in the title when it adds information (e.g. "Private Villa").
  // Most property names already contain "Brown Tree" — skip the redundant
  // brand suffix in that case to keep titles under ~70 characters.
  const isLocationLabel = ["ooty", "kothagiri", "kodaikanal"].includes(property.type.toLowerCase());
  const nameHasBrand = /brown tree/i.test(property.name);
  const contextClause = isLocationLabel ? `${city} Stay` : `${property.type} in ${city}`;
  const title = nameHasBrand
    ? `${property.name} – ${contextClause}`
    : `${property.name} – ${contextClause} | Brown Tree Resorts`;
  const image = toAbsoluteUrl(property.image);

  const lodgingBusiness = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: truncate(firstParagraph, 300),
    url: canonical,
    image: property.gallery.slice(0, 6).map(toAbsoluteUrl),
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: property.region,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.coordinates.lat,
      longitude: property.coordinates.lng,
    },
    priceRange: `₹${property.price}+`,
    amenityFeature: property.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    ...(property.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: property.rating,
            reviewCount: property.reviewCount,
            bestRating: 5,
          },
        }
      : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Properties", item: `${SITE_URL}/#properties` },
      { "@type": "ListItem", position: 3, name: property.name, item: canonical },
    ],
  };

  return {
    title,
    description,
    path: slug,
    image,
    imageAlt: `${property.name} – ${property.type} accommodation in ${property.location}`,
    jsonLd: [lodgingBusiness, breadcrumb],
  };
}
