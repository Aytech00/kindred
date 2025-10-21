/** @format */

import { z } from "zod";

export const CATEGORIES = [
  "account",
  "staking",
  "wallet",
  "bug",
  "feedback",
  "other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  category: z.enum(CATEGORIES, { message: "Please select a valid category" }),
});


export type ContactFormData = z.infer<typeof contactSchema>
