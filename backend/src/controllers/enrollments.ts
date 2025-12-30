import { Response } from "express";
import EnrollmentService from "../database/services/enrollment";
import { CustomRequest } from "../middlewares/auth";
import AppError from "../utils/error";

class EnrollmentsController {
  static async getStudentEnrollments(req: CustomRequest, res: Response) {
    const studentId = req.user?._id!;

    const semesterId = req.query.semesterId as string | undefined;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const name = req.query.name as string | undefined;

    const enrollments = await EnrollmentService.getEnrollmentsByStudent(
      studentId,
      {
        semesterId,
        name,
        page,
        limit,
      }
    );

    res.json({ status: "success", data: enrollments });
  }

  /* ------------------------------------------------------------------------ */

  static async getEnrolledCourseIds(req: CustomRequest, res: Response) {
    const studentId = req.user?._id!;
    const semesterId = req.query.semesterId as string;
    const enrolledCourseIds = await EnrollmentService.getEnrolledCourseIds({
      studentId: studentId.toString(),
      semesterId,
    });
    res.json(enrolledCourseIds);
  }

  /* ------------------------------------------------------------------------ */

  static async enrollStudent(req: CustomRequest, res: Response) {
    const studentId = req.user?._id!;
    const { courseId, semesterId } = req.body;

    const newEnrollment = await EnrollmentService.enrollStudent({
      studentId,
      courseId,
      semesterId,
    });

    res.status(201).json({ status: "success", data: newEnrollment });
  }

  /* ------------------------------------------------------------------------ */

  static async deleteEnrollment(req: CustomRequest, res: Response) {
    const { enrollmentId } = req.params;
    const studentId = req.user?._id!;

    if (!enrollmentId) {
      throw new AppError("Enrollment ID is required", 400);
    }

    await EnrollmentService.deleteEnrollment(enrollmentId, studentId);

    res.json({ status: "success", message: "Enrollment deleted successfully" });
  }
}

export default EnrollmentsController;
