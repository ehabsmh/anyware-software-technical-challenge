import { model, Schema } from "mongoose";
import { ISemester } from "../interfaces/semester";

const semesterSchema = new Schema<ISemester>(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    isCurrent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Semester = model<ISemester>("Semester", semesterSchema);

export default Semester;
