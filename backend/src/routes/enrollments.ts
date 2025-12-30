import express from "express";
import { auth, isStudent } from "../middlewares/auth";
import EnrollmentsController from "../controllers/enrollments";

const enrollmentsRouter = express.Router();

enrollmentsRouter.get(
  "/",
  auth,
  isStudent,
  EnrollmentsController.getStudentEnrollments
);

enrollmentsRouter.get(
  "/ids",
  auth,
  isStudent,
  EnrollmentsController.getEnrolledCourseIds
);

enrollmentsRouter.post(
  "/",
  auth,
  isStudent,
  EnrollmentsController.enrollStudent
);

enrollmentsRouter.delete(
  "/:enrollmentId",
  auth,
  isStudent,
  EnrollmentsController.deleteEnrollment
);

export default enrollmentsRouter;
