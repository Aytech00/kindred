/** @format */
import "server-only";
import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: true, // fast, cached published content
  token: process.env.SANITY_READ_TOKEN, // enables draft access when used with preview
});
