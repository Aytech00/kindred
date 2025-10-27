/** @format */

import groq from "groq";

// Singleton homepage
export const homeQuery = groq`*[_type == "home"][0]{
  hero,
  sections,
  seo
}`;

// Generic CMS page by slug
export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  sections,
  seo
}`;
