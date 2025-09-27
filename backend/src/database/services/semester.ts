import { Semester } from "../../models";
import AppError from "../../utils/error";

class SemesterService {
  static async getCurrentSemester() {
    const semester = await Semester.findOne({ isCurrent: true });
    if (!semester) throw new AppError("No active semester found", 404);
    return semester;
  }
}

export default SemesterService;
