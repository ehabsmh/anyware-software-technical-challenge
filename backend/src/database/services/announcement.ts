import { ObjectId, Types } from "mongoose";
import { IAnnouncement } from "../../interfaces/announcement";
import { Announcement } from "../../models";
import AppError from "../../utils/error";
import { IUser } from "../../interfaces/user";
import SemesterService from "./semester";

interface IAnnouncementsOptions {
  semesterId?: string;
  courseId?: string;
  mineOnly?: boolean;
  page?: number;
  limit?: number;
}

class AnnouncementService {
  static async getLatest(limit = 4, enrolledCoursesIds: string[] = []) {
    return Announcement.find(
      { course: { $in: enrolledCoursesIds } },
      "-semester"
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("course", "name instructor")
      .populate("author", "name avatar");
  }

  static async getAll(
    user: IUser,
    options: IAnnouncementsOptions & { enrolledCourseIds: string[] }
  ) {
    const {
      semesterId,
      courseId,
      mineOnly,
      enrolledCourseIds,
      page = 1,
      limit = 8,
    } = options;

    const filter: any = {};

    // if (!semesterId) {
    //   const currentSem = await SemesterService.getCurrentSemester();
    //   if (currentSem) filter.semester = currentSem._id;
    // }

    if (semesterId) filter.semester = semesterId;

    if (user.role === "student") {
      filter.course = { $in: enrolledCourseIds };
    }

    if (courseId) {
      // Ensure the student is enrolled in the course
      if (
        user.role === "student" &&
        !enrolledCourseIds.find(
          (enrolledCourseId) =>
            enrolledCourseId.toString() === courseId.toString()
        )
      ) {
        return { items: [], total: 0, page, limit, totalPages: 0 };
      }

      filter.course = courseId;
    }

    if (user.role === "instructor") {
      if (mineOnly) {
        filter.author = user._id;
      }
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Announcement.find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "_id name avatar")
        .populate("course", "_id name")
        .populate("semester", "_id name"),
      Announcement.countDocuments(filter),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  static async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid id", 400);

    const announcement = await Announcement.findById(id)
      .populate("course")
      .populate("semester");

    if (!announcement) throw new AppError("Announcement not found", 404);

    return announcement;
  }

  static async create(data: Partial<IAnnouncement>) {
    const announcement = new Announcement(data);
    return announcement.save();
  }

  static async update(
    id: string,
    data: Partial<IAnnouncement> & { userId: string }
  ) {
    const allowedFields = (({ title, content, course, semester }) => ({
      title,
      content,
      course,
      semester,
    }))(data);

    const announcement = await Announcement.findById(id);
    if (!announcement) throw new AppError("Announcement not found", 404);

    const { userId } = data;

    if (announcement.author.toString() !== userId) {
      throw new AppError(
        "You are not authorized to update this announcement",
        403
      );
    }

    Object.assign(announcement, allowedFields);

    await announcement.save();

    return announcement;
  }

  static async delete(id: string) {
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) throw new AppError("Announcement not found", 404);

    return announcement;
  }
}

export default AnnouncementService;
