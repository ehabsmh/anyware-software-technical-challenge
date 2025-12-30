import { Schema } from "mongoose";

export interface IEnrollment {
  studentId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  semesterId: Schema.Types.ObjectId;
}

export interface IEnrollmentPayload {
  studentId: Schema.Types.ObjectId;
  courseId: string;
  semesterId: string;
}

export interface IEnrollments {
  _id: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  semesterId: Schema.Types.ObjectId;
}
