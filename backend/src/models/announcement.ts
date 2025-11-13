import { model, Schema, Types } from "mongoose";
import { IAnnouncement } from "../interfaces/announcement";

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    course: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    semester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Semester",
    },
  },
  { timestamps: true }
);

const Announcement = model<IAnnouncement>("Announcement", announcementSchema);

export default Announcement;
