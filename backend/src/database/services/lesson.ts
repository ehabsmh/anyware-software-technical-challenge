import { Types } from "mongoose";
import { ILesson } from "../../interfaces/lesson";
import { Course } from "../../models";
import Lesson from "../../models/lesson";
import AppError from "../../utils/error";
import CourseService from "./course";
import { pickAllowedFields } from "../../utils/helpers";

class LessonService {
  static async create(payload: Partial<ILesson>) {
    const { order, course } = payload;
    // check if course exists
    const courseExists = await Course.exists({ _id: course });
    if (!courseExists) {
      throw new AppError("Course does not exist", 404);
    }

    if (!order) {
      // get the last lesson order in the course
      const lastLesson = await Lesson.findOne({ course }).sort({ order: -1 });
      payload.order = lastLesson ? lastLesson.order + 1 : 1;
    }

    const lesson = await Lesson.create(payload);

    return lesson;
  }

  static async getLessonsByCourse(courseId: string) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new AppError("Invalid course ID", 400);
    }

    const lessonsPromise = Lesson.find({ course: courseId }).sort({ order: 1 });

    const coursePromise = CourseService.getCourseById(courseId);

    const [lessons, course] = await Promise.all([
      lessonsPromise,
      coursePromise,
    ]);

    const lessonsObj = {
      lessons,
      courseDetails: course,
    };
    return lessonsObj;
  }

  static async getLessonById(lessonId: string, courseId: string) {
    if (!Types.ObjectId.isValid(lessonId)) {
      throw new AppError("Invalid lesson ID", 400);
    }
    const lesson = await Lesson.findOne({ _id: lessonId, course: courseId });
    if (!lesson) throw new AppError("Lesson not found", 404);
    return lesson;
  }

  static async updateLesson(lessonId: string, payload: Partial<ILesson>) {
    if (!Types.ObjectId.isValid(lessonId)) {
      throw new AppError("Invalid lesson ID", 400);
    }

    const allowedFields: (keyof ILesson)[] = ["title", "content", "resources"];

    const allowedPayload = pickAllowedFields(payload, allowedFields);

    const lesson = await Lesson.findByIdAndUpdate(lessonId, allowedPayload, {
      new: true,
    });

    if (!lesson) throw new AppError("Lesson not found", 404);

    return lesson;
  }

  static async deleteLesson(lessonId: string) {
    if (!Types.ObjectId.isValid(lessonId)) {
      throw new AppError("Invalid lesson ID", 400);
    }

    const lesson = await Lesson.findByIdAndDelete(lessonId);

    if (!lesson) throw new AppError("Lesson not found", 404);

    // find all lessons in the same course with order greater than the deleted lesson and decrement their order by 1
    await Lesson.updateMany(
      { course: lesson.course, order: { $gt: lesson.order } },
      { $inc: { order: -1 } }
    );
  }
}

export default LessonService;
