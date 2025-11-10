import express from "express";
import { auth, isInstructor } from "../middlewares/auth";
import CourseController from "../controllers/courses";
import asyncHandler from "../utils/asyncHandler";
import upload from "../configs/multer.config";

const coursesRouter = express.Router();

coursesRouter.post(
  "/",
  auth,
  isInstructor,
  upload.single("image"),
  asyncHandler(CourseController.create)
);
coursesRouter.patch(
  "/:id",
  auth,
  isInstructor,
  upload.single("image"),
  asyncHandler(CourseController.update)
);
coursesRouter.delete(
  "/:id",
  auth,
  isInstructor,
  asyncHandler(CourseController.delete)
);

coursesRouter.get(
  "/semester/:semesterId",
  auth,
  asyncHandler(CourseController.getCoursesBySemester)
);
coursesRouter.get("/:id", auth, asyncHandler(CourseController.getCourseById));

export default coursesRouter;
