import { Request, Response } from "express";
import QuizService from "../database/services/quiz";

class QuizController {
  static async getAll(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const quizzes = await QuizService.getAll(page, limit);

    res.json(quizzes);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const quiz = await QuizService.getById(id!);

    // Hide correct answers in the response
    quiz.questions = quiz.questions.map(({ question, options, _id }) => ({
      question,
      options,
      _id,
    }));

    res.json(quiz);
  }

  static async getByCurrentSemester(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const quizzes = await QuizService.getByCurrentSemester(page, limit);
    res.json(quizzes);
  }

  static async submitAnswers(req: Request, res: Response) {
    const { id } = req.params;
    const { answers } = req.body;

    const result = await QuizService.submitAnswers(id!, answers);

    res.json(result);
  }
}

export default QuizController;
