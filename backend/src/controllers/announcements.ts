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
}

export default AnnouncementController;
