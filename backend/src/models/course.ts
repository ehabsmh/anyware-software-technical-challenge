import { model, Schema } from "mongoose";
import { ICourse } from "../interfaces/course";
import { Semester } from "./index";

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

courseSchema.pre("deleteOne", { document: true }, async function () {
  const courseId = this._id;

  // Pull course from semesters
  await Semester.updateMany(
    { courses: courseId },
    { $pull: { courses: courseId } }
  );
});

const Course = model<ICourse>("Course", courseSchema);

export default Course;
