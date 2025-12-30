import { ObjectId, Schema, Types } from "mongoose";
import { IEnrollmentPayload } from "../../interfaces/enrollment";
import { Course, Enrollment } from "../../models";

class EnrollmentService {
  static async enrollStudent(payload: IEnrollmentPayload) {
    const { studentId, courseId, semesterId } = payload;

    // Check for valid ObjectId format
    if (
      !Types.ObjectId.isValid(studentId.toString()) ||
      !Types.ObjectId.isValid(courseId) ||
      !Types.ObjectId.isValid(semesterId)
    ) {
      throw new Error("Invalid studentId, courseId, or semesterId");
    }

    // Check if the student is already enrolled in the course for the semester
    const existingEnrollment = await EnrollmentService.findEnrollment({
      studentId,
      courseId,
      semesterId,
    });

    if (existingEnrollment) {
      throw new Error(
        "Student is already enrolled in this course for the semester"
      );
    }

    // Create new enrollment
    const newEnrollment = await Enrollment.create({
      studentId,
      courseId,
      semesterId,
    });

    return newEnrollment;
  }

  /* ------------------------------------------------------------------------ */

  static async findEnrollment(payload: IEnrollmentPayload) {
    const { studentId, courseId, semesterId } = payload;

    return Enrollment.findOne({
      studentId,
      courseId,
      semesterId,
    });
  }

  /* ------------------------------------------------------------------------ */

  static async getEnrollmentsByStudent(
    studentId: Schema.Types.ObjectId,
    options: {
      semesterId: string | undefined;
      name: string | undefined;
      page: number;
      limit: number;
    }
  ) {
    const { semesterId, name, page = 1, limit = 9 } = options;
    const skip = (page - 1) * limit;

    let courseIds: ObjectId[] | undefined;

    // If name filter is provided, find matching course IDs
    if (name) {
      const courses = await Course.find({
        name: { $regex: name, $options: "i" },
      }).select("_id");
      courseIds = courses.map((c) => c._id);
    }

    const filter: any = { studentId };

    if (semesterId && Types.ObjectId.isValid(semesterId)) {
      filter.semesterId = semesterId;
    }

    if (courseIds) {
      filter.courseId = { $in: courseIds };
    }

    const enrollment = Enrollment.find(filter, "-studentId")
      .populate("courseId", "name description image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const [items, total] = await Promise.all([
      enrollment,
      Enrollment.countDocuments(filter),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  /* ------------------------------------------------------------------------ */

  static async getEnrolledCourseIds({
    studentId,
    semesterId,
  }: {
    studentId: string;
    semesterId?: string;
  }) {
    const filter: any = { studentId };

    if (semesterId) {
      filter.semesterId = semesterId;
    }

    const enrollmentIds = await Enrollment.find(filter).distinct("courseId");

    const courseIds = enrollmentIds.map((id) => id.toString());

    return courseIds;
  }

  /* ------------------------------------------------------------------------ */

  static async deleteEnrollment(enrollmentId: string, studentId: ObjectId) {
    if (!Types.ObjectId.isValid(enrollmentId)) {
      throw new Error("Invalid enrollment ID");
    }

    const enrollment = await Enrollment.findOneAndDelete({
      _id: enrollmentId,
      studentId,
    });

    if (!enrollment) {
      throw new Error("Enrollment not found or unauthorized");
    }

    return enrollment;
  }

  /* ------------------------------------------------------------------------ */
}

export default EnrollmentService;
