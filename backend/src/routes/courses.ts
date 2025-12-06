import express from "express";
import { auth, isInstructor } from "../middlewares/auth";
import CourseController from "../controllers/courses";
import asyncHandler from "../utils/asyncHandler";
import upload from "../configs/multer.config";
import { validate } from "../middlewares/validation";
import { CreateCourseSchema } from "../validations/course";

const coursesRouter = express.Router();

coursesRouter.post(
  "/",
  auth,
  isInstructor,
  upload.single("image"),
  validate(CreateCourseSchema),
  asyncHandler(CourseController.create)
);
coursesRouter.patch(
  "/:id",
  auth,
  isInstructor,
  upload.single("image"),
  validate(CreateCourseSchema),
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
