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

export function buildPropertySEO(property: Property): SEOData {
  const slug = toPropertySlug(property);
  const city = property.location.split(",")[0].trim();
  const canonical = `${SITE_URL}${slug}`;
  const firstParagraph = property.description.split("\n\n")[0];
  const description = truncate(
    `${firstParagraph} Book directly with Brown Tree Resorts for the best rates in ${city}.`,
    160
  );
  // `property.type` doubles as a filter category on the homepage — for most
  // properties it's just the city name, not an accommodation type, so only
  // surface it in the title when it adds information (e.g. "Private Villa").
  const isLocationLabel = ["ooty", "kothagiri", "kodaikanal"].includes(property.type.toLowerCase());
  const title = isLocationLabel
    ? `${property.name} | ${city} Stay – Brown Tree Resorts`
    : `${property.name} – ${property.type} in ${city} | Brown Tree Resorts`;
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
