import { model, Schema, Types } from "mongoose";
import { IAnnouncement } from "../interfaces/announcement";

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    semester: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
    },
  },
  { timestamps: true }
);

const Announcement = model<IAnnouncement>("Announcement", announcementSchema);

export default Announcement;
