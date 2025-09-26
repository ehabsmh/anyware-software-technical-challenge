import { Schema } from "mongoose";

export interface IQuiz extends Document {
  _id: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  topic: string;
  dueDate: Date;
  questions: {
    question: string;
    options: string[];
    answer: number;
  }[];
  semester: Schema.Types.ObjectId;
}
