import { ZodType } from "zod";
import { IValidationError } from "../interfaces/validationError";

export function pickAllowedFields<T extends object>(
  data: Partial<T> | { success: true; data: T },
  allowedFields: (keyof T)[]
): Partial<T> {
  const result: Partial<T> = {};

  for (const key of allowedFields) {
    const actualData = "success" in data ? data.data : data;
    if (actualData[key]) result[key] = actualData[key];
  }

  return result;
}

type ErrorValidation = {
  success: false;
  errors: { field: string; message: string }[];
};

export function validateFields<T>(
  schema: ZodType<T>,
  data: any
): { success: true; data: T } | ErrorValidation {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const validationResponse: IValidationError = {
      success: false,
      errors: parsed.error.issues.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    };

    return validationResponse;
  }

  return { success: true, data: parsed.data };
}
