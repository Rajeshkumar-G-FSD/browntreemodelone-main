/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property } from "./types";

// Standalone shareable page — not derived from property data, so it's a fixed constant.
export const ABOUT_US_PATH = "/aboutus";

// Converts a property to a URL slug: /ooty-the-earthy-nest-by-brown-tree
export function toPropertySlug(property: Property): string {
  const location = property.location.split(",")[0].trim().toLowerCase().replace(/\s+/g, "-");
  const name = property.name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
  return `/${location}-${name}`;
}

export function findPropertyBySlug(properties: Property[], slug: string): Property | null {
  return properties.find((p) => toPropertySlug(p) === slug) ?? null;
}

// Per-property Google Ads conversion landing page: /ooty-the-earthy-nest-by-brown-tree/thank-you
export function toThankYouSlug(property: Property): string {
  return `${toPropertySlug(property)}/thank-you`;
}

export function findPropertyByThankYouSlug(properties: Property[], path: string): Property | null {
  return properties.find((p) => toThankYouSlug(p) === path) ?? null;
}
