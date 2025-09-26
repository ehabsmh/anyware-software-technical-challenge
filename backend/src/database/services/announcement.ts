import { Types } from "mongoose";
import { IAnnouncement } from "../../interfaces/announcement";
import { Announcement } from "../../models";
import AppError from "../../utils/error";

class AnnouncementService {
  static async getLatest(limit = 4) {
    return Announcement.find({}, "-semester")
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("course", "name instructor");
  }

  static async getAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Announcement.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("course", "_id name instructor")
        .populate("semester", "_id name startDate endDate"),
      Announcement.countDocuments(),
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

  static async create(data: IAnnouncement) {
    const announcement = new Announcement(data);
    return announcement.save();
  }

  static async update(id: string, data: Partial<IAnnouncement>) {
    const allowedFields = (({ title, content, author, course, semester }) => ({
      title,
      content,
      author,
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
