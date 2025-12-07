import { Types } from "mongoose";
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
  static async getLatest(limit = 4) {
    return Announcement.find({}, "-semester")
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("course", "name instructor")
      .populate("author", "name avatar");
  }

  static async getAll(user: IUser, options: IAnnouncementsOptions) {
    const { semesterId, courseId, mineOnly, page = 1, limit = 8 } = options;

    const filter: any = {};

    if (!semesterId) {
      const currentSem = await SemesterService.getCurrentSemester();
      if (currentSem) filter.semester = currentSem._id;
    }

    // Student can filter by semesterId
    if (user.role === "student") {
      if (semesterId) filter.semester = semesterId;
      if (courseId) filter.course = courseId;
    }

    // Instructor can filter by mineOnly, courseId, semesterId
    if (user.role === "instructor") {
      if (semesterId) filter.semester = semesterId;
      if (courseId) filter.course = courseId;
      if (mineOnly) {
        filter.author = user._id;
      }
    }

    if (user.role === "admin") {
      if (courseId) filter.course = courseId;
      if (semesterId) filter.semester = semesterId;
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

  static async update(id: string, data: Partial<IAnnouncement>) {
    const allowedFields = (({ title, content, course, semester }) => ({
      title,
      content,
      course,
      semester,
    }))(data);
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      allowedFields,
      { new: true }
    );
    if (!announcement) throw new AppError("Announcement not found", 404);
    return announcement;
  }

  static async delete(id: string) {
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) throw new AppError("Announcement not found", 404);

    return announcement;
  }
}

export default AnnouncementService;
