import { Types } from "mongoose";
import { ICourse } from "../../interfaces/course";
import { Course, Semester } from "../../models";
import AppError from "../../utils/error";
import SemesterService from "./semester";

class CourseService {
  static async createCourse({
    name,
    description,
    instructor,
    semester,
    image,
  }: Partial<ICourse>): Promise<ICourse> {
    if (!name) throw new AppError("name is required.", 400);

    const course = await Course.create({
      name,
      description,
      instructor,
      semester,
      image,
    });

    await Semester.findByIdAndUpdate(semester, {
      $push: { courses: course._id },
    });

    return course;
  }

  static async getCoursesBySemester(
    semesterId: string,
    options: {
      page?: number | undefined;
      limit?: number | undefined;
      name?: string | undefined;
      instructorId?: string | undefined;
    } = {}
  ) {
    const { page = 1, limit = 10, name, instructorId } = options;
    const semester = await SemesterService.getSemesterById(semesterId);

    const filter: any = { semester: semester._id };

    if (name) filter.name = { $regex: name, $options: "i" };
    if (instructorId) filter.instructor = instructorId;

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Course.find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .populate("instructor", "_id name avatar"),
      Course.countDocuments(filter),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  static async getCourseById(id: string) {
    const course = await Course.findById(id)
      .populate("instructor", "name avatar")
      .populate("semester", "name startDate endDate");
    if (!course) throw new AppError("Course not found.", 404);
    return course;
  }

  static async getInstructorCoursesWithQuizzes(instructorId: string) {
    const coursesWithQuizzes = await Course.aggregate([
      {
        $lookup: {
          from: "quizzes",
          localField: "_id",
          foreignField: "course",
          as: "quizzes",
        },
      },
      {
        $match: {
          quizzes: { $ne: [] },
          instructor: new Types.ObjectId(instructorId),
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          quizzesCount: { $size: "$quizzes" },
        },
      },
    ]);

    return coursesWithQuizzes;
  }

  static async updateCourse(id: string, data: Partial<ICourse>) {
    const course = await Course.findById(id);
    if (!course) throw new AppError("Course not found.", 404);

    const allowedFields = (({
      name,
      description,
      instructor,
      semester,
      image,
    }) => {
      if (!image)
        return {
          name,
          description,
          instructor,
          semester,
        };

      return {
        name,
        description,
        instructor,
        semester,
        image,
      };
    })(data);

    Object.assign(course, allowedFields);
    await course.save();

    return course;
  }

  static async deleteCourse(id: string) {
    const course = await Course.findByIdAndDelete(id);
    if (!course) throw new AppError("Course not found.", 404);

    return { message: "Course deleted successfully", course };
  }

  static async courseExists(id: string) {
    if (!id) throw new AppError("Course id is required.", 400);

    if (!Types.ObjectId.isValid(id))
      throw new AppError("Invalid course id", 400);

    const isExist = await Course.exists({ _id: id });

    return !!isExist;
  }
}

export default CourseService;
