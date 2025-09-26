import { model, Schema } from "mongoose";
import { IQuiz } from "../interfaces/quiz";

const quizSchema = new Schema<IQuiz>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    topic: { type: String, required: true },
    dueDate: { type: Date, required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        answer: { type: Number, required: true },
      },
    ],
    semester: { type: Schema.Types.ObjectId, ref: "Semester", required: true },
  },
  { timestamps: true }
);

const Quiz = model<IQuiz>("Quiz", quizSchema);

export default Quiz;
