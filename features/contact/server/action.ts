/** @format */

"use server";

import { ZodError } from "zod";
import { sendEmail } from "./mail";
import { ContactFormData, contactSchema } from "./schema";

type FormResponse =
  | { success: true; message: string }
  | {
      success: false;
      message: string;
      errors?: Array<{ message: string; path: (string | number)[] }>;
    };

export const submitContactForm = async (
  formdata: FormData
): Promise<FormResponse> => {
  const d = {
    name: formdata.get("name"),
    email: formdata.get("email"),
    category: formdata.get("category"),
    message: formdata.get("message"),
  };

  const result = contactSchema.safeParse(d);

  if (!result.success) {
    const errs = result.error.issues.map((i) => ({
      message: i.message,
      path: i.path,
    }));
    return { success: false, message: "Validation failed" };
  }

  const parsedData = result.data as ContactFormData;

  try {
    await sendEmail(parsedData);
    return { success: true, message: "Thank you for contacting Kindred!" };
  } catch {
    return { success: false, message: "Something went wrong!" };
  }
};
