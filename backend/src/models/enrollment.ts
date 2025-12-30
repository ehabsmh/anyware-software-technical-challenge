import { model, Schema } from "mongoose";
import { IEnrollment } from "../interfaces/enrollment";

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    semesterId: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
  },
  { timestamps: true }
);

EnrollmentSchema.index(
  { studentId: 1, courseId: 1, semesterId: 1 },
  { unique: true }
);

const Enrollment = model("Enrollment", EnrollmentSchema);

export default Enrollment;
