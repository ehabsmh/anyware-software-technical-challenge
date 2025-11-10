import { Semester } from "../../models";
import AppError from "../../utils/error";

class SemesterService {
  static async getCurrentSemester() {
    const semester = await Semester.findOne({ isCurrent: true });
    if (!semester) throw new AppError("No active semester found", 404);
    return semester;
  }

  static async getSemesterById(id?: string) {
    const semester = await Semester.findById(id);
    if (!semester) throw new AppError("Semester not found.", 404);
    return semester;
  }

  static async getSemesters() {
    const semesters = await Semester.find();
    return semesters;
  }
}

export default SemesterService;
