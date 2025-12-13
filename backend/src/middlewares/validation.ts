import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { validateFields } from "../utils/helpers";

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = validateFields(schema, req.body);
    if (validationResult.success === false) {
      return res.status(422).json(validationResult);
    }

    req.body = validationResult.data;
    next();
  };
}

export function validateFormData(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const key in req.body) {
        const value = req.body[key];

        if (typeof value === "string") {
          try {
            const parsed = JSON.parse(value);

            if (typeof parsed === "object") {
              req.body[key] = parsed;
            }
          } catch (_) {}
        }
      }

      const validationResult = validateFields(schema, req.body);

      if (validationResult.success === false) {
        return res.status(422).json(validationResult);
      }

      req.body = validationResult.data;

      next();
    } catch (err) {
      next(err);
    }
  };
}
