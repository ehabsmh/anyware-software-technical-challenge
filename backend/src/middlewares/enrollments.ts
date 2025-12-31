import { NextFunction, Response } from "express";
import { CustomRequest } from "./auth";
import { Enrollment } from "../models";
import AppError from "../utils/error";
import Lesson from "../models/lesson";

export async function isEnrolled(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const student = req.user;
  const { _id: studentId, role } = student!;

  if (role === "instructor") {
    return next();
  }

  let courseId = req.params.courseId || req.query.courseId || req.body.courseId;

  if (!courseId && req.params.lessonId) {
    const lesson = await Lesson.findById(req.params.lessonId).select("course");
    if (!lesson) {
      return next(new AppError("Lesson not found", 404));
    }

    courseId = lesson.course.toString();
    req.courseId = courseId;
  }

  if (!courseId) {
    return next(new AppError("Course ID is required", 400));
  }

  const enrollment = await Enrollment.findOne({
    studentId,
    courseId,
  });

  if (!enrollment) {
    return next(new AppError("You are not enrolled in this course", 403));
  }

  req.enrollment = enrollment;

  next();
}

export async function attachEnrollments(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const studentId = req.user?._id!;

  const enrollments = await Enrollment.find({ studentId }).select(
    "courseId semesterId"
  );

  const courseIds = enrollments.map((e) => e.courseId.toString());

  req.enrolledCourseIds = courseIds;
  next();
}
