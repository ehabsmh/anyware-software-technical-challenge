import express from "express";
import asyncHandler from "../utils/asyncHandler";
import SemestersController from "../controllers/semesters";

const semestersRouter = express.Router();

semestersRouter.get("/", asyncHandler(SemestersController.getSemesters));
semestersRouter.get(
  "/current",
  asyncHandler(SemestersController.currentSemester)
);

export default semestersRouter;
