import { Schema } from "mongoose";

export interface IQuestion {
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
  attemptsAllowed: number;
  totalPoints: number;
  questions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
}
