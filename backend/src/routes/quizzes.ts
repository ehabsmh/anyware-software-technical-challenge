import express from "express";
import QuizController from "../controllers/quizzes";
import asyncHandler from "../utils/asyncHandler";
import { auth, isInstructor, isStudent } from "../middlewares/auth";

const quizzesRouter = express.Router();

quizzesRouter.get("/", asyncHandler(QuizController.getAll));
quizzesRouter.get(
  "/current-semester",
  asyncHandler(QuizController.getByCurrentSemester)
);
quizzesRouter.get(
  "/upcoming",
  auth,
  isStudent,
  asyncHandler(QuizController.getUpcomingDue)
);
quizzesRouter.get(
  "/instructor",
  auth,
  isInstructor,
  asyncHandler(QuizController.getInstructorQuizzes)
);

quizzesRouter.get("/:id", auth, asyncHandler(QuizController.getById));

quizzesRouter.get(
  "/:id/questions",
  auth,
  asyncHandler(QuizController.getQuizQuestions)
);

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

export default quizzesRouter;
