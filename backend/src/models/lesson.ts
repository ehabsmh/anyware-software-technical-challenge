import { model, Schema } from "mongoose";
import { ILesson, ILessonResource } from "../interfaces/lesson";

const ResourcesSchema = new Schema<ILessonResource>(
  {
    name: String,
    url: String,
  },
  { _id: false }
);

const LessonSchema = new Schema<ILesson>(
  {
    title: String,
    content: String,
    video: String,
    resources: [ResourcesSchema],
    order: Number,
    course: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true }
);

const Lesson = model<ILesson>("Lesson", LessonSchema);

export default Lesson;
