import mongoose, { Schema } from "mongoose";
import { INote } from "../interfaces/note";

const NoteSchema = new Schema<INote>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// One note per student per lesson
NoteSchema.index({ student: 1, lesson: 1 }, { unique: true });

const Note = mongoose.model<INote>("lesson_note", NoteSchema);

export default Note;
