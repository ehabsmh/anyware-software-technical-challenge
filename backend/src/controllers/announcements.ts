import { NextFunction, Request, Response } from "express";
import AnnouncementService from "../database/services/announcement";

class AnnouncementController {
  static async getLatest(req: Request, res: Response, next: NextFunction) {
    const { limit } = req.query;
    const announcements = await AnnouncementService.getLatest(Number(limit));
    res.json(announcements);
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const announcements = await AnnouncementService.getAll(page, limit);

    res.json(announcements);
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const announcement = await AnnouncementService.getById(id!);
    res.json(announcement);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { content, author, course, title, semester } = req.body;
    const newAnnouncement = await AnnouncementService.create({
      title,
      content,
      author,
      course,
      semester,
    });
    res.status(201).json(newAnnouncement);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, content, author, course, semester } = req.body;

    const updatedAnnouncement = await AnnouncementService.update(id!, {
      title,
      content,
      author,
      course,
      semester,
    });

    res.json(updatedAnnouncement);
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await AnnouncementService.delete(id!);
    res.status(204).send();
  }
}

export default AnnouncementController;
