import { Request, Response } from "express";
import LessonService from "../database/services/lesson";
import { uploadVideo } from "../configs/cloudinary.config";
import CourseService from "../database/services/course";
import AppError from "../utils/error";

class LessonsController {
  static async getLessonById(req: Request, res: Response) {
    const lessonId = req.params.id;

    if (!lessonId) {
      return res.status(400).json({ error: "Lesson ID is required" });
    }

    const lesson = await LessonService.getLessonById(lessonId);

    res.json(lesson);
  }

  static async getLessonsByCourse(req: Request, res: Response) {
    const courseId = req.query.courseId as string;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    const lessons = await LessonService.getLessonsByCourse(courseId);

    res.json(lessons);
  }

  static async createLesson(req: Request, res: Response) {
    const { title, content, resources, order, course, video } = req.body;

    const videoFile = req.file;

    const courseName = (await CourseService.getCourseById(course)).name;

    let videoUrl = video;

    if (videoFile) {
      videoUrl = (await uploadVideo(
        videoFile.path,
        `courses/${courseName}/lessons/`
      )) as string;
    }

    const lesson = await LessonService.create({
      title,
      content,
      resources,
      order,
      course,
      video: videoUrl,
    });

    res.status(201).json(lesson);
  }

  static async updateLesson(req: Request, res: Response) {
    const lessonId = req.params.id;
    const payload = req.body;

    if (!lessonId) throw new AppError("Lesson ID is required", 400);

    const updatedLesson = await LessonService.updateLesson(lessonId, payload);
    res.json(updatedLesson);
  }

  static async deleteLesson(req: Request, res: Response) {
    const lessonId = req.params.id;
    if (!lessonId) {
      throw new AppError("Lesson ID is required", 400);
    }
    await LessonService.deleteLesson(lessonId);
    res.status(204).send();
  }
}

export default LessonsController;
