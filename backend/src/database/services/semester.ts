import { ObjectId, Types } from "mongoose";
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

  static async getSemesters(
    includeCourses = false,
    enrolledCourseIds: ObjectId[] | null
  ) {
    const filter: any = {};

    if (enrolledCourseIds && enrolledCourseIds.length > 0) {
      filter.courses = { $in: enrolledCourseIds };
    }
    const semesters = includeCourses
      ? await Semester.find(filter, "name isCurrent courses").populate({
          path: "courses",
          select: "name image",
          match:
            enrolledCourseIds && enrolledCourseIds.length > 0
              ? { _id: { $in: enrolledCourseIds } }
              : {},
        })
      : await Semester.find();

    return semesters;
  }

  static async semesterExists(id: string) {
    if (!id) throw new AppError("Semester id is required.", 400);

    if (!Types.ObjectId.isValid(id))
      throw new AppError("Invalid semester id", 400);

    const isExist = await Semester.exists({ _id: id });

    return !!isExist;
  }
}

export default SemesterService;
