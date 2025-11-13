import { NextFunction, Request, Response } from "express";
import AnnouncementService from "../database/services/announcement";
import { CustomRequest } from "../middlewares/auth";

class AnnouncementController {
  static async getLatest(req: Request, res: Response) {
    const { limit } = req.query;
    const announcements = await AnnouncementService.getLatest(Number(limit));
    res.json(announcements);
  }

  static async getAll(req: CustomRequest, res: Response) {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 8;
    const mineOnly = req.query.mineOnly === "true";

    const user = req.user;

    const announcements = await AnnouncementService.getAll(user!, {
      ...req.query,
      page,
      limit,
      mineOnly,
    });

    res.json(announcements);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const announcement = await AnnouncementService.getById(id!);
    res.json(announcement);
  }

  static async create(req: CustomRequest, res: Response) {
    const { content, course, title, semester } = req.body;
    const author = req.user!._id;

    const newAnnouncement = await AnnouncementService.create({
      title,
      content,
      author,
      course,
      semester,
    });

    res.status(201).json(newAnnouncement);
  }

  static async update(req: Request, res: Response) {
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

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await AnnouncementService.delete(id!);
    res.status(204).send();
  }
}

export default AnnouncementController;
