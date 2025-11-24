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
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const quizzes = await QuizService.getInstructorQuizzes(
      String(instructorId!),
      page,
      limit
    );

    res.json(quizzes);
  }

  static async getUpcomingDue(req: Request, res: Response) {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const quizzes = await QuizService.getUpcomingDue(limit);
    res.json(quizzes);
  }

  static async getQuizQuestions(req: Request, res: Response) {
    const { id } = req.params;

    const questions = await QuizService.getQuizQuestions(id!);
    res.json(questions);
  }

  static async submitAnswers(req: Request, res: Response) {
    const { id } = req.params;
    const { answers } = req.body;

    const result = await QuizService.submitAnswers(id!, answers);

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

  // static async deleteQuestions(req: Request, res: Response) {
  //   const { id } = req.params;

  //   const message = await QuizService.deleteQuestion(
  //     Number(req.body.index),
  //     id!
  //   );

  //   res.status(200).send(message);
  // }

  // static async addQuestion(req: Request, res: Response) {
  //   const { id } = req.params;

  //   const newQuestion = await QuizService.addQuestion(id!, req.body);

  //   res.json(newQuestion);
  // }
}

export default QuizController;
