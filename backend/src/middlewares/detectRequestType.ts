import { NextFunction, Request, Response } from "express";
import AppError from "../utils/error";
import { validateFields } from "../utils/helpers";
import { CreateLessonSchema } from "../validations/lesson";
import LessonsController from "../controllers/lessons";

export function handleCreateLesson(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const contentType = req.headers["content-type"] || "";
  const isJson = contentType.includes("application/json");
  const isFormData = contentType.includes("multipart/form-data");

  if (!isJson && !isFormData) {
    throw new AppError(
      "Invalid content type. Must be application/json or multipart/form-data",
      415
    );
  }

  if (isFormData) return next();

  const validationResult = validateFields(CreateLessonSchema, req.body);
  if (validationResult.success === false) {
    return res.status(422).json(validationResult);
  }

  req.body = validationResult.data;

  return LessonsController.createLesson(req, res);
}
