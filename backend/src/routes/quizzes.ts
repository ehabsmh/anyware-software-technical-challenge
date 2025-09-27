import express from "express";
import QuizController from "../controllers/quizzes";
import asyncHandler from "../utils/asyncHandler";

const quizzesRouter = express.Router();

quizzesRouter.get("/", asyncHandler(QuizController.getAll));
quizzesRouter.get(
  "/current-semester",
  asyncHandler(QuizController.getByCurrentSemester)
);
quizzesRouter.get("/:id", asyncHandler(QuizController.getById));
quizzesRouter.post("/:id/submit", asyncHandler(QuizController.submitAnswers));

export default quizzesRouter;
