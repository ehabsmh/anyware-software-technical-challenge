import { model, Schema } from "mongoose";
import { ICourse } from "../interfaces/course";

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  semester: { type: Schema.Types.ObjectId, ref: "Semester" },
});

const Course = model<ICourse>("Course", courseSchema);

export default Course;
