import { Schema } from "mongoose";

export interface ILessonResource {
  name: string;
  url: string;
}

export interface ILesson {
  _id: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  title: string;
  content: string;
  video: string;
  resources: ILessonResource[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
