/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property } from "../types";

export const WHATSAPP_NUMBER = "919095487848"; // +91 90954 87848

export function buildPropertyInquiryMessage(property: Property): string {
  return `New Concierge Inquiry — Brown Tree Resorts\n\n*Property:* ${property.name}\n*Location:* ${property.location}\n\nHi, I'm interested in booking a stay at ${property.name}. Please share availability and rates.`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
