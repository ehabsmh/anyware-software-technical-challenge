import { Schema } from "mongoose";

export interface IQuestion {
  _id: Schema.Types.ObjectId;
  type: "mcq" | "true_false" | "short_answer";
  question: string;
  options: string[];
  answer: Schema.Types.Mixed; // indices of correct options
  points: number;
}

export interface IQuiz extends Document {
  _id: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  semester: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  topic: string;
  dueDate: Date;
  status: "draft" | "published";
  timeLimitInMinutes: number;
  totalPoints: number;
  questions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuizSubmission extends Document {
  _id: Schema.Types.ObjectId;
  quizId: Schema.Types.ObjectId | IQuiz;
  userId: Schema.Types.ObjectId;
  answers: {
    questionId: Schema.Types.ObjectId;
    answer: Schema.Types.Mixed;
    isCorrect: "true" | "false" | "partially";
    points: number;
    instructorNote: string;
  }[];
  submittedAt: Date;
  score: number;
  totalPoints: number;
  isCorrected: boolean;
  correctedAt?: Date;
}
