import { Types } from "mongoose";
import { Quiz, QuizSubmission, User } from "../../models";
import AppError from "../../utils/error";
import SemesterService from "./semester";
import { IQuestion, IQuiz, IQuizSubmission } from "../../interfaces/quiz";
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

  static async getUpcomingDue(userId: string) {
    const today = new Date();

    const quizzes = await Quiz.find({
      dueDate: { $gte: today },
      status: "published",
    })
      .sort({ dueDate: 1 })
      .populate("course", "_id name instructor")
      .populate("semester", "_id name startDate endDate");

    // Fetch submissions by the user for these quizzes
    const submissions = await QuizSubmission.find({
      userId,
      quizId: { $in: quizzes.map((q) => q._id) },
    }).select("quizId");

    // Create a set of quiz IDs that the user has already solved
    const solvedQuizIds = new Set(submissions.map((s) => s.quizId.toString()));

    // Filter out quizzes that the user has already solved
    const unsolvedQuizzes = quizzes.filter(
      (quiz) => !solvedQuizIds.has(quiz._id.toString())
    );

    return unsolvedQuizzes;
  }

  static async getInstructorQuizzes(
    instructorId: string,
    options: {
      page?: number | undefined;
      limit?: number | undefined;
      topic?: string | undefined;
      course?: string | undefined;
    } = {}
  ) {
    const { page = 1, limit = 10, topic, course } = options;

    const skip = (page - 1) * limit;
    const filter: any = { createdBy: new Types.ObjectId(instructorId) };

    if (topic) filter.topic = { $regex: topic, $options: "i" };
    if (course) filter.course = { $regex: course, $options: "i" };

    const pipeline = [
      {
        $match: { createdBy: filter.createdBy },
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
          pipeline: [{ $project: { name: 1 } }],
        },
      },
      {
        $match: {
          ...(topic ? { topic: filter.topic } : {}),
          ...(course ? { "course.name": filter.course } : {}),
        },
      },
      {
        $project: {
          topic: 1,
          course: { $arrayElemAt: ["$course", 0] },
          dueDate: 1,
          status: 1,
          semester: 1,
          timeLimitInMinutes: 1,
          totalPoints: 1,
          numQuestions: { $size: "$questions" },
        },
      },
      {
        $skip: skip,
      },
      { $limit: limit },
    ];

    const [items, total] = await Promise.all([
      Quiz.aggregate(pipeline),
      Quiz.countDocuments({ createdBy: instructorId }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  static async getQuizQuestions(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

    const quiz = await Quiz.findById(id).select("questions");
    if (!quiz) throw new AppError("Quiz not found", 404);

    return quiz.questions;
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

  static async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) throw new AppError("Quiz not found", 404);
    return quiz;
  }

  static async submitAnswers(
    quizId: string,
    userId: string,
    answers: IQuizSubmission["answers"]
  ) {
    // Validate Ids
    if (!Types.ObjectId.isValid(quizId))
      throw new AppError("Invalid id for quiz", 400);
    if (!Types.ObjectId.isValid(userId))
      throw new AppError("Invalid id for user", 400);

    // Check user existence and role
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    if (user.role !== "student") {
      throw new AppError("Only students can submit quiz answers", 403);
    }

    // Check user has not already submitted
    const existingSubmission = await QuizSubmission.findOne({
      quizId: new Types.ObjectId(quizId),
      userId: new Types.ObjectId(userId),
    });

    if (existingSubmission) {
      throw new AppError(
        "User has already submitted answers for this quiz",
        400
      );
    }

    // Get actual quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new AppError("Quiz not found", 404);

    // Check if quiz is still within due date
    if (quiz.dueDate && quiz.dueDate < new Date()) {
      throw new AppError("Quiz submission deadline has passed", 400);
    }

    // Check if quiz is published
    if (quiz.status !== "published") {
      throw new AppError("Quiz is not published", 400);
    }

    // Create a map for quick question lookup
    const questionMap = new Map(
      quiz.questions.map((q) => [q._id.toString(), q])
    );

    // Create score calculation and prepare answers for storage
    let totalScore = 0;
    const finalAnswers: IQuizSubmission["answers"] = [];

    // Process each submitted answer
    for (const submitted of answers) {
      // Find corresponding question
      const questionId = submitted.questionId.toString();
      const question = questionMap.get(questionId);

      if (!question) {
        throw new AppError(
          `Question with id ${questionId} not found in quiz`,
          400
        );
      }

      // Create variables for evaluation
      let isCorrect: IQuizSubmission["answers"][number]["isCorrect"] = "false";
      let questionPoints = 0;

      // Extract correct answer and user answer
      const correctAnswer = question.answer;
      const userAnswer = submitted.answer;

      // Evaluate based on question type
      switch (question.type) {
        case "mcq":
          if (!Array.isArray(userAnswer)) {
            throw new AppError(
              `Answer for question ${questionId} must be an array`,
              400
            );
          }

          if (!Array.isArray(correctAnswer)) {
            throw new AppError(
              `Correct answer for question ${questionId} is malformed`,
              500
            );
          }

          const correctAnswerStr = [...new Set(correctAnswer)]
            .sort()
            .toString();
          const userAnswerStr = [...new Set(userAnswer)].sort().toString();

          isCorrect = correctAnswerStr === userAnswerStr ? "true" : "false";
          questionPoints = isCorrect === "true" ? question.points : 0;
          break;

        case "true_false":
          isCorrect = correctAnswer === userAnswer ? "true" : "false";
          questionPoints = isCorrect === "true" ? question.points : 0;
          break;

        case "short_answer":
          isCorrect = "false";
          questionPoints = 0;
          break;

        default:
          throw new AppError(
            `Unknown question type for question ${questionId}`,
            500
          );
      }

      totalScore += questionPoints;

      finalAnswers.push({
        questionId: new Types.ObjectId(questionId) as any,
        answer: userAnswer,
        isCorrect,
        points: questionPoints,
        instructorNote: "",
      });
    }

    const submission = await QuizSubmission.create({
      quizId: new Types.ObjectId(quizId),
      userId: new Types.ObjectId(userId),
      answers: finalAnswers,
      submittedAt: new Date(),
      score: totalScore,
      totalPoints: quiz.totalPoints,
    });

    return submission;
  }

  static async getUserSubmittedQuizzes(userId: string, page = 1, limit = 10) {
    if (!Types.ObjectId.isValid(userId))
      throw new AppError("Invalid id for user", 400);

    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      QuizSubmission.find({
        userId: new Types.ObjectId(userId),
      })
        .sort({ createdAt: -1 })
        .populate({
          path: "quizId",
          select: "_id topic course",
          populate: [{ path: "course", select: "_id name" }],
        })
        .skip(skip)
        .limit(limit),
      QuizSubmission.countDocuments({
        userId: new Types.ObjectId(userId),
      }),
    ]);

    return {
      items: submissions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getUserSubmittedQuiz(quizSubmissionId: string) {
    if (!Types.ObjectId.isValid(quizSubmissionId))
      throw new AppError("Invalid id for quiz submission", 400);

    const submission = await QuizSubmission.findById(quizSubmissionId).populate(
      {
        path: "quizId",
        select: "_id topic course questions",
        populate: [{ path: "course", select: "_id name instructor" }],
      }
    );

    if (!submission) throw new AppError("Quiz submission not found", 404);
    const quiz = submission.quizId as IQuiz;

    const questions = quiz.questions;

    const submissionObj = submission.toObject() as any;
    submissionObj.questions = questions;
    return submissionObj;
  }

  static async getQuizSubmissions(quizId: string, page = 1, limit = 10) {
    if (!Types.ObjectId.isValid(quizId))
      throw new AppError("Invalid id for quiz", 400);

    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      QuizSubmission.find({
        quizId: new Types.ObjectId(quizId),
      })
        .sort({ createdAt: -1 })
        .populate({ path: "userId", select: "_id name avatar" })
        .skip(skip)
        .limit(limit),
      QuizSubmission.countDocuments({
        quizId: new Types.ObjectId(quizId),
      }),
    ]);

    return {
      items: submissions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async correctQuizSubmission(
    submissionId: string,
    corrections: {
      questionId: string;
      isCorrect: "true" | "false" | "partially";
      points: number;
      questionScore: number;
      instructorNote: string;
    }[]
  ) {
    if (!Types.ObjectId.isValid(submissionId))
      throw new AppError("Invalid id for quiz submission", 400);

    const submission = await QuizSubmission.findById(submissionId);
    if (!submission) throw new AppError("Quiz submission not found", 404);

    let score = 0;

    const answerCorrections = corrections.map((correction) => {
      const questionIdStr = correction.questionId.toString();
      const answer = submission.answers.find(
        (ans) => ans.questionId.toString() === questionIdStr
      );

      if (!answer) {
        throw new AppError(
          `Answer for question ${questionIdStr} not found in submission`,
          400
        );
      }

      answer.isCorrect =
        correction.points === 0
          ? "false"
          : correction.points < correction.questionScore
          ? "partially"
          : "true";

      answer.points = correction.points;

      score += correction.points;

      answer.instructorNote = correction.instructorNote;

      return answer;
    });
    submission.score = score;
    submission.isCorrected = true;
    submission.correctedAt = new Date();
    submission.answers = answerCorrections;
    await submission.save();

    return submission;
  }
}

export default QuizService;
