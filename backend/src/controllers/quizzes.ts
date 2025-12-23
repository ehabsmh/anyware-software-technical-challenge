import { Request, Response } from "express";
import QuizService from "../database/services/quiz";
import { CustomRequest } from "../middlewares/auth";
import AppError from "../utils/error";

class QuizController {
  static async getAll(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const quizzes = await QuizService.getAll(page, limit);

    res.json(quizzes);
  }

  static async getById(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const user = req.user;

    const quiz = await QuizService.getById(id!);

    if (user?.role === "student") {
      const quizObj = quiz.toObject();

      const safeQuestions = quizObj.questions.map(
        ({ type, question, options }) => ({
          type,
          question,
          options,
        })
      );

      return res.json({
        ...quizObj,
        questions: safeQuestions,
      });
    }
    res.json(quiz);
  }

  static async getByCurrentSemester(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const quizzes = await QuizService.getByCurrentSemester(page, limit);
    res.json(quizzes);
  }

  static async getInstructorQuizzes(req: CustomRequest, res: Response) {
    const instructorId = req.user?._id;

    const { topic, course }: { topic?: string; course?: string } = req.query;

    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const quizzes = await QuizService.getInstructorQuizzes(
      String(instructorId!),
      { page, limit, topic, course }
    );

    res.json(quizzes);
  }

  static async getUpcomingDue(req: CustomRequest, res: Response) {
    const userId = req.user?._id;
    const quizzes = await QuizService.getUpcomingDue(String(userId));
    res.json(quizzes);
  }

  static async getQuizQuestions(req: Request, res: Response) {
    const { id } = req.params;

    const questions = await QuizService.getQuizQuestions(id!);
    res.json(questions);
  }

  static async submitAnswers(req: Request, res: Response) {
    const { quizId, userId, answers } = req.body;

    const result = await QuizService.submitAnswers(quizId!, userId!, answers);

    res.json(result);
  }

  static async create(req: CustomRequest, res: Response) {
    const instructorId = req.user?._id;

    req.body.createdBy = instructorId;

    const quiz = await QuizService.create(req.body);
    res.status(201).json(quiz);
  }

  static async updateQuizInfo(req: Request, res: Response) {
    const { id } = req.params;

    const updatedQuiz = await QuizService.updateQuizInfo(id!, req.body);

    res.json(updatedQuiz);
  }

  static async updateQuizQuestions(req: Request, res: Response) {
    const { id } = req.params;

    const updatedQuiz = await QuizService.updateQuizQuestions(
      id!,
      req.body.questions
    );

    res.json(updatedQuiz);
  }

  static async deleteQuiz(req: Request, res: Response) {
    const { id } = req.params;
    await QuizService.delete(id!);
    res.status(204).send();
  }

  static async getUserSubmittedQuizzes(req: CustomRequest, res: Response) {
    const user = req.user;
    const userId = String(user?._id);
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const submissions = await QuizService.getUserSubmittedQuizzes(
      userId,
      page,
      limit
    );
    res.json(submissions);
  }

  static async getUserSubmittedQuiz(req: CustomRequest, res: Response) {
    const submission = await QuizService.getUserSubmittedQuiz(
      req.params.submissionId!
    );
    res.json(submission);
  }

  static async getQuizSubmissions(req: CustomRequest, res: Response) {
    const { id } = req.params;

    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    const submissions = await QuizService.getQuizSubmissions(id!, page, limit);

    res.json(submissions);
  }

  static async correctQuizSubmission(req: Request, res: Response) {
    const { submissionId, answers } = req.body;

    const correctedSubmission = await QuizService.correctQuizSubmission(
      submissionId!,
      answers
    );

    res.json(correctedSubmission);
  }
}

export default QuizController;
