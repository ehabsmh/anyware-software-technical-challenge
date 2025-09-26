import express from "express";
import announcementsRouter from "./announcements";
import quizzesRouter from "./quizzes";

const router = express.Router();

router.use("/announcements", announcementsRouter);
router.use("/quizzes", quizzesRouter);

export default router;
