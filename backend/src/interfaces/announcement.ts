import { Schema } from "mongoose";

export interface IAnnouncement extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  content: string;
  author: string;
  course: Schema.Types.ObjectId;
  semester: Schema.Types.ObjectId;
}

// export type IAnnouncementInput = Omit<
//   IAnnouncement,
//   "_id" | "createdAt" | "updatedAt"
// >;
