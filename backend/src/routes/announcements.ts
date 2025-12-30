import express from "express";
import AnnouncementController from "../controllers/announcements";
import asyncHandler from "../utils/asyncHandler";
import { auth, isInstructor, isStudent } from "../middlewares/auth";
import { validate } from "../middlewares/validation";
import { CreateAnnouncementSchema } from "../validations/announcement";
import { attachEnrollments } from "../middlewares/enrollments";

const announcementsRouter = express.Router();

announcementsRouter.get(
  "/latest",
  auth,
  isStudent,
  attachEnrollments,
  asyncHandler(AnnouncementController.getLatest)
);
announcementsRouter.get(
  "/",
  auth,
  attachEnrollments,
  asyncHandler(AnnouncementController.getAll)
);
announcementsRouter.get(
  "/:id",
  auth,
  asyncHandler(AnnouncementController.getById)
);

announcementsRouter.post(
  "/",
  auth,
  isInstructor,
  validate(CreateAnnouncementSchema),
  asyncHandler(AnnouncementController.create)
);
announcementsRouter.patch(
  "/:id",
  auth,
  isInstructor,
  validate(CreateAnnouncementSchema),
  asyncHandler(AnnouncementController.update)
);
announcementsRouter.delete(
  "/:id",
  auth,
  isInstructor,
  asyncHandler(AnnouncementController.delete)
);
export default announcementsRouter;
