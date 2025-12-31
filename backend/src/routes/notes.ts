import express from "express";
import NoteController from "../controllers/notes";
import { auth, isStudent } from "../middlewares/auth";
const notesRouter = express.Router();

notesRouter.get("/:lessonId", auth, isStudent, NoteController.getLessonNote);
notesRouter.patch(
  "/:lessonId",
  auth,
  isStudent,
  NoteController.upsertLessonNote
);

export default notesRouter;
