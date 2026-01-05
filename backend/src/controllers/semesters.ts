import { Request, Response } from "express";
import SemesterService from "../database/services/semester";
import { CustomRequest } from "../middlewares/auth";
import { ISemesterPayload } from "../interfaces/semester";

class SemestersController {
  static async getSemesters(req: CustomRequest, res: Response) {
    const user = req.user;

    const includeCourses = req.query.includeCourses === "true";

    const enrolledCourseIds =
      user?.role === "student" ? req.enrolledCourseIds || [] : null;

    const instructorId =
      user?.role === "instructor" ? user._id.toString() : null;

    const semesters = await SemesterService.getSemesters(
      includeCourses,
      enrolledCourseIds,
      instructorId
    );

    res.json(semesters);
  }

  static async currentSemester(req: Request, res: Response) {
    const currentSemester = await SemesterService.getCurrentSemester();
    res.json(currentSemester);
  }

  static async createSemester(req: Request, res: Response) {
    const {
      name,
      startDate,
      endDate,
      isCurrent = false,
    } = <ISemesterPayload>req.body;

    const newSemester = await SemesterService.create({
      name,
      startDate,
      endDate,
      isCurrent,
    });

    res.status(201).json({ success: true, data: newSemester });
  }
}

export default SemestersController;
