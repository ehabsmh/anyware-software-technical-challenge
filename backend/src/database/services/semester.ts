import mongoose, { ObjectId, Types } from "mongoose";
import { Course, Semester } from "../../models";
import AppError from "../../utils/error";
import { ISemesterPayload } from "../../interfaces/semester";

class SemesterService {
  static async getCurrentSemester() {
    const semester = await Semester.findOne({ isCurrent: true });
    if (!semester) throw new AppError("No active semester found", 404);
    return semester;
  }

  /* ------------------------------------------------------------------------ */

  static async getSemesterById(id?: string) {
    const semester = await Semester.findById(id);
    if (!semester) throw new AppError("Semester not found.", 404);
    return semester;
  }

  /* ------------------------------------------------------------------------ */

  static async getSemesters(
    includeCourses = false,
    enrolledCourseIds: string[] | null,
    instructorId: string | null
  ) {
    const filter: any = {};

    if (enrolledCourseIds && enrolledCourseIds.length > 0) {
      filter.courses = { $in: enrolledCourseIds };
    }
    const semesters = includeCourses
      ? await Semester.find(filter, "name isCurrent courses")
          .populate({
            path: "courses",
            select: "name image",
            match:
              enrolledCourseIds && enrolledCourseIds.length > 0
                ? { _id: { $in: enrolledCourseIds } }
                : instructorId
                ? { instructor: instructorId }
                : {},
          })
          .sort({ createdAt: -1 })
      : await Semester.find().sort({ createdAt: -1 });

    return semesters;
  }

  /* ------------------------------------------------------------------------ */

  static async semesterExists(id: string) {
    if (!id) throw new AppError("Semester id is required.", 400);

    if (!Types.ObjectId.isValid(id))
      throw new AppError("Invalid semester id", 400);

    const isExist = await Semester.exists({ _id: id });

    return !!isExist;
  }

  /* ------------------------------------------------------------------------ */

  static async create(payload: ISemesterPayload) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { name, startDate, endDate, isCurrent } = payload;

      const isExists = await Semester.exists({ name }).session(session);
      if (isExists) throw new AppError("Semester already exists", 409);

      if (isCurrent)
        await Semester.updateMany(
          { isCurrent: true },
          { isCurrent: false },
          { session }
        );

      const semester = await Semester.create({
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isCurrent,
      });

      await session.commitTransaction();
      return semester;
    } catch (error) {
      await session.abortTransaction();
      throw Error;
    } finally {
      session.endSession();
    }
  }

  /* ------------------------------------------------------------------------ */

  static async copyCoursesToSemester(semesterId: string, courseIds: string[]) {
    if (!Types.ObjectId.isValid(semesterId)) {
      throw new AppError("Invalid semester ID", 400);
    }

    if (!courseIds.length) {
      throw new AppError("No courses provided.", 400);
    }

    // Check course ids validity
    const allValid = courseIds.every((id) => Types.ObjectId.isValid(id));
    if (!allValid) {
      throw new AppError("Invalid course ID.", 400);
    }

    // Check course existence
    const coursesCount = await Course.countDocuments({
      _id: { $in: courseIds },
    });
    if (coursesCount !== courseIds.length) {
      throw new AppError("Some courses not found.", 404);
    }

    // push courses to the semester with no duplicates
    const semester = await Semester.findByIdAndUpdate(semesterId, {
      $addToSet: { courses: { $each: courseIds } },
    });
    return semester;
  }
}

export default SemesterService;
