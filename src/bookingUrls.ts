/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Shared external booking-engine links, used by both the Hero search widget
// and the chatbot's reservation flow so they never drift out of sync.
export const PROPERTY_URLS: Record<string, string> = {
  "THE ABODE BY BROWN TREE":                    "https://bookings.asiatech.in/?page=4160&type=website",
  "THE EARTHY NEST BY BROWN TREE":               "https://bookings.asiatech.in/?page=11117&type=website",
  "TEA LEAF STAYS BY BROWN TREE":                "https://bookings.asiatech.in/?page=5303&type=website",
  "SHOLAS RESIDENCY BY BROWN TREE":               "https://bookings.asiatech.in/?page=10425&type=website",
  "HUMMING BIRD BY BROWN TREE":                  "https://bookings.asiatech.in/?page=9542&type=website",
  "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE":  "https://bookings.asiatech.in/?page=6541&type=website",
};

export const DEFAULT_BOOKING_URL = "https://bookings.asiatech.in/?page=4160&type=website";

export function getBookingUrl(propertyName: string, checkIn: string, checkOut: string): string {
  const base = PROPERTY_URLS[propertyName] ?? DEFAULT_BOOKING_URL;
  return `${base}&checkin=${checkIn}&checkout=${checkOut}`;
}
