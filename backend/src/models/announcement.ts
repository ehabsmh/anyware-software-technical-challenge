import { model, Schema, Types } from "mongoose";
import { IAnnouncement } from "../interfaces/announcement";

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    semester: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
  },
  { timestamps: true }
);

const Announcement = model<IAnnouncement>("Announcement", announcementSchema);

export default Announcement;
