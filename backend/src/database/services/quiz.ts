import { Types } from "mongoose";
import { Quiz } from "../../models";
import AppError from "../../utils/error";
import SemesterService from "./semester";
import { IQuestion, IQuiz } from "../../interfaces/quiz";
import CourseService from "./course";
import UserService from "./user";
import { pickAllowedFields } from "../../utils/helpers";

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
    const { course, semester, createdBy } = data;

    const [courseExists, semesterExists, userExists] = await Promise.all([
      CourseService.courseExists(course?.toString()),
      SemesterService.semesterExists(semester?.toString()),
      UserService.userExists(createdBy?.toString()),
    ]);

    const anyMissing = [courseExists, semesterExists, userExists].some(
      (exists) => !exists
    );

    if (anyMissing) throw new AppError("One or more entities not found", 404);

    const quiz = await Quiz.create(data);

    return quiz;
  }

  static async updateQuizInfo(id: string, data: Partial<IQuiz>) {
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

    const allowedFields: (keyof IQuiz)[] = [
      "topic",
      "dueDate",
      "timeLimitInMinutes",
      "attemptsAllowed",
      "status",
    ];

    const cleanData = pickAllowedFields(data, allowedFields);

    if (cleanData.status === "published") {
      const quiz = await Quiz.findById(id);
      if (!quiz) throw new AppError("Quiz not found", 404);
      if (quiz.questions.length === 0) {
        throw new AppError("Cannot publish a quiz with no questions", 400);
      }
    }

    const quiz = await Quiz.findByIdAndUpdate(id, cleanData, { new: true });

    if (!quiz) throw new AppError("Quiz not found", 404);

    return quiz;
  }

  static async updateQuizQuestions(id: string, questions: IQuiz["questions"]) {
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new AppError("Questions must be a non-empty array", 400);
    }

    const allowedFields: (keyof IQuiz)[] = ["questions"];

    const cleanData = pickAllowedFields<IQuiz>({ questions }, allowedFields);

    const quiz = await Quiz.findByIdAndUpdate(id, cleanData, { new: true });

    if (!quiz) throw new AppError("Quiz not found", 404);

    return quiz;
  }

  // deprecated method
  // static async update(id: string, data: IQuiz) {
  //   if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

  //   const quiz = await Quiz.findByIdAndUpdate(id, data, { new: true });
  //   if (!quiz) throw new AppError("Quiz not found", 404);

  //   return quiz;
  // }

  static async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) throw new AppError("Quiz not found", 404);
    return quiz;
  }

  // static async deleteQuestion(index: number, quizId: string) {
  //   if (!Types.ObjectId.isValid(quizId)) throw new AppError("Invalid id", 400);

  //   const quiz = await this.getById(quizId);

  //   if (!quiz) throw new AppError("Quiz not found", 404);

  //   if (index < 0 || index >= quiz.questions.length) {
  //     throw new AppError("Question index out of range", 400);
  //   }

  //   quiz.questions.splice(index, 1);

  //   await quiz.save();

  //   return "Question has been deleted.";
  // }

  // static async addQuestion(quizId: string, questionData: IQuestion) {
  //   if (!Types.ObjectId.isValid(quizId)) throw new AppError("Invalid id", 400);

  //   const updatedQuiz = await Quiz.findByIdAndUpdate(
  //     quizId,
  //     {
  //       $push: { questions: questionData },
  //     },
  //     { new: true }
  //   );

  //   if (!updatedQuiz) throw new AppError("Quiz not found", 404);

  //   return updatedQuiz;
  // }

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
