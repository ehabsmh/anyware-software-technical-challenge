import express from "express";
import QuizController from "../controllers/quizzes";
import asyncHandler from "../utils/asyncHandler";
import { auth, isInstructor } from "../middlewares/auth";

const quizzesRouter = express.Router();

quizzesRouter.get("/", asyncHandler(QuizController.getAll));
quizzesRouter.get(
  "/current-semester",
  asyncHandler(QuizController.getByCurrentSemester)
);
quizzesRouter.get("/upcoming", asyncHandler(QuizController.getUpcomingDue));
quizzesRouter.get("/:id", asyncHandler(QuizController.getById));

quizzesRouter.post(
  "/",
  auth,
  isInstructor,
  asyncHandler(QuizController.create)
);

quizzesRouter.patch(
  "/:id",
  auth,
  isInstructor,
  asyncHandler(QuizController.updateQuizInfo)
);

quizzesRouter.patch(
  "/:id/questions",
  auth,
  isInstructor,
  asyncHandler(QuizController.updateQuizQuestions)
);

quizzesRouter.delete(
  "/:id",
  auth,
  isInstructor,
  asyncHandler(QuizController.deleteQuiz)
);

// quizzesRouter.delete(
//   "/:id/questions",
//   auth,
//   isInstructor,
//   asyncHandler(QuizController.deleteQuestions)
// );

// quizzesRouter.post(
//   "/:id/questions",
//   auth,
//   isInstructor,
//   asyncHandler(QuizController.addQuestion)
// );

quizzesRouter.post("/:id/submit", asyncHandler(QuizController.submitAnswers));

export default quizzesRouter;
