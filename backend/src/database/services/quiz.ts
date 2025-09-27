import { Types } from "mongoose";
import { Quiz } from "../../models";
import AppError from "../../utils/error";
import SemesterService from "./semester";
import { IQuiz } from "../../interfaces/quiz";

class QuizService {
  static async getAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Quiz.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("course", "_id name instructor")
        .populate("semester", "_id name startDate endDate"),
      Quiz.countDocuments(),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  static async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

    const quiz = await Quiz.findById(id)
      .populate("course", "_id name instructor")
      .populate("semester", "_id name startDate endDate");
    if (!quiz) throw new AppError("Quiz not found", 404);

    return quiz;
  }

  static async getByCurrentSemester(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const currentSemester = await SemesterService.getCurrentSemester();

    const [items, total] = await Promise.all([
      Quiz.find({ semester: currentSemester._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("course", "_id name instructor")
        .populate("semester", "_id name startDate endDate"),
      Quiz.countDocuments({ semester: currentSemester._id }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  static async getUpcomingDue(limit = 2) {
    const today = new Date();

    const quizzes = await Quiz.find({ dueDate: { $gte: today } })
      .sort({ dueDate: 1 })
      .limit(limit)
      .populate("course", "_id name instructor")
      .populate("semester", "_id name startDate endDate");

    return quizzes;
  }

  static async create(data: IQuiz) {
    const quiz = new Quiz(data);
    return quiz.save();
  }

  static async update(id: string, data: IQuiz) {
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

    const quiz = await Quiz.findByIdAndUpdate(id, data, { new: true });
    if (!quiz) throw new AppError("Quiz not found", 404);

    return quiz;
  }

  static async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) throw new AppError("Quiz not found", 404);
    return quiz;
  }

  static async submitAnswers(quizId: string, answers: number[]) {
    if (!Types.ObjectId.isValid(quizId)) throw new AppError("Invalid id", 400);

    // Handle case where answers is not an array of numbers
    if (
      !Array.isArray(answers) ||
      answers.some((ans) => typeof ans !== "number")
    )
      throw new AppError("Invalid answers", 400);

    const quiz = await this.getById(quizId);
    if (!quiz) throw new AppError("Quiz not found", 404);

    const total = quiz.questions.length;

    if (total !== answers.length)
      throw new AppError(
        "Number of answers does not match number of questions",
        400
      );

    let score = 0;

    const details = quiz.questions.map((question, index) => {
      const userAnswer = answers[index];

      // Handle case where answer is out of range
      if (
        userAnswer &&
        (userAnswer < 0 || userAnswer >= question.options.length)
      ) {
        throw new AppError(
          `Answer for question ${index + 1} is out of range`,
          400
        );
      }

      const isCorrect = question.answer === userAnswer;
      if (isCorrect) score += 1;

      return {
        question: question.question,
        correctAnswer: question.answer,
        userAnswer,
        correct: isCorrect,
      };
    });

    return { score, total, details };
  }
}

export default QuizService;
