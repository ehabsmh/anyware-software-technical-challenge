import { model, Schema } from "mongoose";
import { ICourse } from "../interfaces/course";

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    semester: { type: Schema.Types.ObjectId, ref: "Semester" },
    image: String,
  },
  { timestamps: true }
);

const Course = model<ICourse>("Course", courseSchema);

export default Course;
