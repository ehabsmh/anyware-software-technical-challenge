import { Schema } from "mongoose";

export interface ICourse {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  instructor: string;
  semester: Schema.Types.ObjectId;
}
