import express from "express";
import LessonsController from "../controllers/lessons";
import { auth, isInstructor } from "../middlewares/auth";
import { validate, validateFormData } from "../middlewares/validation";
import { CreateLessonSchema, UpdateLessonSchema } from "../validations/lesson";
import { uploadVideos } from "../configs/multer.config";
import { handleCreateLesson } from "../middlewares/detectRequestType";

const lessonsRouter = express.Router();

lessonsRouter.get("/", LessonsController.getLessonsByCourse);
lessonsRouter.get("/:id", LessonsController.getLessonById);

lessonsRouter.post(
  "/",
  auth,
  isInstructor,
  handleCreateLesson,
  uploadVideos.single("video"),
  validateFormData(CreateLessonSchema),
  LessonsController.createLesson
);

lessonsRouter.patch(
  "/:id",
  auth,
  isInstructor,
  validate(UpdateLessonSchema),
  LessonsController.updateLesson
);

lessonsRouter.delete(
  "/:id",
  auth,
  isInstructor,
  LessonsController.deleteLesson
);

export default lessonsRouter;
