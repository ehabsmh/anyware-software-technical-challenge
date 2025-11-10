import { Schema } from "mongoose";

export interface ICourse {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  instructor: Schema.Types.ObjectId;
  semester: Schema.Types.ObjectId;
  image: string;
}
