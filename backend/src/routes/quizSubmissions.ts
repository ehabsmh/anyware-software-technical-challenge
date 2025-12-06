import express from "express";
import QuizController from "../controllers/quizzes";
import { auth, isInstructor } from "../middlewares/auth";
import asyncHandler from "../utils/asyncHandler";

const quizSubmissionsRouter = express.Router();

quizSubmissionsRouter.post(
  "/submissions",
  asyncHandler(QuizController.submitAnswers)
);

quizSubmissionsRouter.get(
  "/submissions/student",
  auth,
  asyncHandler(QuizController.getUserSubmittedQuizzes)
);

quizSubmissionsRouter.get(
  "/submissions/:submissionId",
  auth,
  asyncHandler(QuizController.getUserSubmittedQuiz)
);

quizSubmissionsRouter.get(
  "/:id/submissions",
  auth,
  isInstructor,
  asyncHandler(QuizController.getQuizSubmissions)
);

quizSubmissionsRouter.patch(
  "/submissions/corrections",
  auth,
  isInstructor,
  asyncHandler(QuizController.correctQuizSubmission)
);

export default quizSubmissionsRouter;
