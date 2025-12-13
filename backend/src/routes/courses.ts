import express from "express";
import { auth, isInstructor } from "../middlewares/auth";
import CourseController from "../controllers/courses";
import asyncHandler from "../utils/asyncHandler";
import { validateFormData } from "../middlewares/validation";
import { CreateCourseSchema } from "../validations/course";
import { uploadImages } from "../configs/multer.config";

const coursesRouter = express.Router();

coursesRouter.post(
  "/",
  auth,
  isInstructor,
  uploadImages.single("image"),
  validateFormData(CreateCourseSchema),
  asyncHandler(CourseController.create)
);
coursesRouter.patch(
  "/:id",
  auth,
  isInstructor,
  uploadImages.single("image"),
  validateFormData(CreateCourseSchema),
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

coursesRouter.get(
  "/quizzes-count",
  auth,
  isInstructor,
  asyncHandler(CourseController.getInstructorCoursesWithQuizzes)
);

coursesRouter.get("/:id", auth, asyncHandler(CourseController.getCourseById));

export default coursesRouter;
