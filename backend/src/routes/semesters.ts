import express from "express";
import asyncHandler from "../utils/asyncHandler";
import SemestersController from "../controllers/semesters";
import { auth } from "../middlewares/auth";
import { attachEnrollments } from "../middlewares/enrollments";

const semestersRouter = express.Router();

semestersRouter.get(
  "/",
  auth,
  attachEnrollments,
  asyncHandler(SemestersController.getSemesters)
);
semestersRouter.get(
  "/current",
  asyncHandler(SemestersController.currentSemester)
);

export default semestersRouter;
