import { Request, Response } from "express";
import SemesterService from "../database/services/semester";

class SemestersController {
  static async getSemesters(req: Request, res: Response) {
    const semesters = await SemesterService.getSemesters();
    res.json(semesters);
  }

  static async currentSemester(req: Request, res: Response) {
    const currentSemester = await SemesterService.getCurrentSemester();
    res.json(currentSemester)
  }
}

export default SemestersController;
