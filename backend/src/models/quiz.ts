import { model, Schema } from "mongoose";
import { IQuestion, IQuiz } from "../interfaces/quiz";

const questionSchema = new Schema<IQuestion>(
  {
    type: {
      type: String,
      enum: ["mcq", "true_false", "short_answer"],
      default: "mcq",
    },
    question: { type: String, required: true },
    options: { type: [String], default: [] },
    answer: { type: Schema.Types.Mixed, default: null }, // indices of correct options
    points: { type: Number, default: 1 },
  },
  { _id: false }
);

const quizSchema = new Schema<IQuiz>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    semester: { type: Schema.Types.ObjectId, ref: "Semester", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    timeLimitInMinutes: { type: Number, default: 0 },
    attemptsAllowed: { type: Number, default: 1 },
    totalPoints: { type: Number, default: 0 },
    questions: [questionSchema],
  },
  { timestamps: true }
);

const Quiz = model<IQuiz>("Quiz", quizSchema);

export default Quiz;
