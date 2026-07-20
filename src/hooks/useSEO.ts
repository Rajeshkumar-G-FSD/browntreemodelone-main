/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { SEOData, SITE_URL, DEFAULT_ROBOTS } from "../seo";

const DYNAMIC_JSONLD_ATTR = "data-dynamic-seo";

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Keeps <title>, meta description/OG/Twitter tags, canonical link and JSON-LD in sync with the active route. */
export function useSEO(seo: SEOData) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${seo.path === "/" ? "" : seo.path}${seo.path === "/" ? "/" : ""}`;

    document.title = seo.title;

    upsertMeta('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    }, seo.description);

    upsertMeta('meta[name="robots"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "robots");
      return m;
    }, seo.robots ?? DEFAULT_ROBOTS);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    upsertMeta('meta[property="og:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    }, seo.title);
    upsertMeta('meta[property="og:description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      return m;
    }, seo.description);
    upsertMeta('meta[property="og:url"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:url");
      return m;
    }, canonicalUrl);
    upsertMeta('meta[property="og:image"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:image");
      return m;
    }, seo.image);
    upsertMeta('meta[property="og:image:alt"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:image:alt");
      return m;
    }, seo.imageAlt);

    upsertMeta('meta[name="twitter:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:title");
      return m;
    }, seo.title);
    upsertMeta('meta[name="twitter:description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:description");
      return m;
    }, seo.description);
    upsertMeta('meta[name="twitter:image"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:image");
      return m;
    }, seo.image);
    upsertMeta('meta[name="twitter:image:alt"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:image:alt");
      return m;
    }, seo.imageAlt);

    // Replace route-specific JSON-LD; the static Organization/LodgingBusiness
    // tags shipped in index.html stay in place and cover the homepage.
    document.head.querySelectorAll(`script[${DYNAMIC_JSONLD_ATTR}]`).forEach((el) => el.remove());
    (seo.jsonLd ?? []).forEach((entry) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(DYNAMIC_JSONLD_ATTR, "true");
      script.textContent = JSON.stringify(entry);
      document.head.appendChild(script);
    });

    return () => {
      document.head.querySelectorAll(`script[${DYNAMIC_JSONLD_ATTR}]`).forEach((el) => el.remove());
    };
  }, [seo]);
}
