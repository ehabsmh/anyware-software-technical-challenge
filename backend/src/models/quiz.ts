import { model, Schema } from "mongoose";
import { IQuestion, IQuiz, IQuizSubmission } from "../interfaces/quiz";

const questionSchema = new Schema<IQuestion>({
  type: {
    type: String,
    enum: ["mcq", "true_false", "short_answer"],
    default: "mcq",
  },
  question: { type: String, required: true },
  options: { type: [String], default: [] },
  answer: { type: Schema.Types.Mixed, default: null }, // indices of correct options
  points: { type: Number, default: 1 },
});

const quizSchema = new Schema<IQuiz>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    semester: { type: Schema.Types.ObjectId, ref: "Semester", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    timeLimitInMinutes: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    questions: [questionSchema],
  },
  { timestamps: true }
);

const quizSubmissionSchema = new Schema<IQuizSubmission>(
  {
    quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    answers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          required: true,
        },

        answer: {
          type: Schema.Types.Mixed,
          required: true,
        },

        isCorrect: {
          type: String,
          enum: ["true", "false", "partially"],
          default: "partially",
        },

        points: { type: Number, default: 0 },

        instructorNote: { type: String, default: "" },
      },
    ],

    score: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },

    isCorrected: { type: Boolean, default: false },

    submittedAt: { type: Date, default: Date.now },
    correctedAt: { type: Date },
  },
  { timestamps: true }
);

const Quiz = model<IQuiz>("Quiz", quizSchema);

export const QuizSubmission = model("Quiz_Submission", quizSubmissionSchema);

export default Quiz;
