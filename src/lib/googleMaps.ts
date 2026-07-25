/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Single source of truth for Google Maps links across the app — every property
// only needs an accurate `coordinates` field, and both the embedded map and the
// "Get Directions" link derive from it. No API key required: `output=embed`
// and the `/maps/search/?api=1` deep link are both plain, key-free Google Maps
// URL formats.

export interface LatLng {
  lat: number;
  lng: number;
}

// Iframe-embeddable map centered on the coordinate, at a street-level zoom
// close enough to recognize the property without needing a Maps API key.
export function getMapEmbedUrl({ lat, lng }: LatLng, zoom = 15): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

// Opens the same coordinate in the full Google Maps app/site — used for the
// "Get Directions" / "View larger map" call to action next to an embed.
export function getMapDirectionsUrl({ lat, lng }: LatLng): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
