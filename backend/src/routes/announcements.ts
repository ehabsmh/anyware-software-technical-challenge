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
announcementsRouter.post("/", asyncHandler(AnnouncementController.create));
announcementsRouter.put("/:id", asyncHandler(AnnouncementController.update));
announcementsRouter.delete("/:id", asyncHandler(AnnouncementController.delete));
export default announcementsRouter;
