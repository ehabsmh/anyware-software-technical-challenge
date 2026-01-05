import { Schema } from "mongoose";

export interface ISemester extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  courses: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isCurrent: boolean;
}

export interface ISemesterPayload {
  name: string;
  startDate: Date;
  endDate: Date;
  isCurrent?: boolean;
}
