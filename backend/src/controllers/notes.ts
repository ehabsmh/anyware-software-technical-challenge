import { Response } from "express";
import NoteService from "../database/services/note";
import { CustomRequest } from "../middlewares/auth";
import AppError from "../utils/error";

export class NoteController {
  static async getLessonNote(req: CustomRequest, res: Response) {
    const studentId = req.user?._id.toString()!;
    const lessonId = req.params.lessonId;

    if (!lessonId) {
      throw new AppError("Lesson ID param is required", 400);
    }

    const note = await NoteService.getNote({
      studentId,
      lessonId,
    });

    res.json({ status: "success", data: note });
  }

  static async upsertLessonNote(req: CustomRequest, res: Response) {
    const studentId = req.user?._id.toString()!;
    const lessonId = req.params.lessonId;
    const { content } = req.body;

    if (!lessonId) {
      throw new AppError("Lesson ID param is required", 400);
    }

    const note = await NoteService.upsertNote({
      studentId,
      lessonId,
      content,
    });

    res.json({
      status: "success",
      data: note,
    });
  }
}

export default NoteController;
