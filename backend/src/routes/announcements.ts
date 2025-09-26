import express from "express";
import AnnouncementController from "../controllers/announcements";
import asyncHandler from "../utils/asyncHandler";

const announcementsRouter = express.Router();

announcementsRouter.get(
  "/latest",
  asyncHandler(AnnouncementController.getLatest)
);
announcementsRouter.get("/", asyncHandler(AnnouncementController.getAll));
announcementsRouter.get("/:id", asyncHandler(AnnouncementController.getById));

export default announcementsRouter;
