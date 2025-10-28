import express from "express";
import announcementsRouter from "./announcements";
import quizzesRouter from "./quizzes";
import authRouter from "./auth";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/announcements", announcementsRouter);
router.use("/quizzes", quizzesRouter);

export default router;
