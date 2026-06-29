/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Suite {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  size: string; // e.g., "120 sqm / 1,290 sqft"
  amenities: string[];
}

export interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  region: string; // e.g., "Jaipur, India", "Kyoto, Japan", "Big Sur, USA"
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  suites: Suite[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Experience {
  id: string;
  title: string;
  category: string; // e.g., "Wellness", "Adventure", "Gastronomy"
  description: string;
  image: string;
  duration: string;
  pricePerPerson: number;
  details: string[];
}

export interface Review {
  id: string;
  author: string;
  role: string; // e.g., "Elite Member", "Architectural Digest Critic"
  avatar: string;
  rating: number;
  date: string;
  content: string;
  propertyId?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  propertyCount: number;
}
