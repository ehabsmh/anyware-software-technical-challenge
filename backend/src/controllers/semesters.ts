import { Request, Response } from "express";
import SemesterService from "../database/services/semester";
import { CustomRequest } from "../middlewares/auth";

class SemestersController {
  static async getSemesters(req: CustomRequest, res: Response) {
    const includeCourses = req.query.includeCourses === "true";
    const enrolledCourseIds =
      req.user?.role === "student" ? req.enrolledCourseIds || [] : null;

    const semesters = await SemesterService.getSemesters(
      includeCourses,
      enrolledCourseIds
    );

    res.json(semesters);
  }

  static async currentSemester(req: Request, res: Response) {
    const currentSemester = await SemesterService.getCurrentSemester();
    res.json(currentSemester);
  }
}

export default SemestersController;
