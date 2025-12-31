import { Note } from "../../models";
import Lesson from "../../models/lesson";
import AppError from "../../utils/error";

class NoteService {
  static async getNote({
    studentId,
    lessonId,
  }: {
    studentId: string;
    lessonId: string;
  }) {
    const note = await Note.findOne({
      student: studentId,
      lesson: lessonId,
    }).select("content updatedAt");

    return note || { content: "" };
  }

  /* --------------------------------------------------------------------------------------------- */

  static async upsertNote({
    studentId,
    lessonId,
    content,
  }: {
    studentId: string;
    lessonId: string;
    content: string;
  }) {
    const lesson = await Lesson.findById(lessonId).select("order course");

    if (!lesson) throw new AppError("Lesson not found", 404);

    console.log("content:", content);
    console.log("lesson-id:", lessonId);

    if (!content?.trim()) {
      return await Note.findOne({
        student: studentId,
        lesson: lessonId,
      }).select("content updatedAt");
    }

    const note = await Note.findOneAndUpdate(
      { student: studentId, lesson: lessonId },
      {
        $set: {
          content,
        },
        $setOnInsert: {
          course: lesson.course,
          order: lesson.order,
          student: studentId,
          lesson: lessonId,
        },
      },
      { new: true, upsert: true, runValidators: true }
    ).select("content updatedAt");

    console.log("note:", note);

    return note;
  }
}

export default NoteService;
