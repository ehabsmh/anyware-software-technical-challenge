import { Types } from "mongoose";

export interface INote {
  student: Types.ObjectId;
  course: Types.ObjectId;
  lesson: Types.ObjectId;
  content: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
