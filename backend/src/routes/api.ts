import express from "express";
import announcementsRouter from "./announcements";
import quizzesRouter from "./quizzes";
import authRouter from "./auth";
import coursesRouter from "./courses";
import semestersRouter from "./semesters";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/announcements", announcementsRouter);
router.use("/quizzes", quizzesRouter);
router.use("/courses", coursesRouter);
router.use("/semesters", semestersRouter);
export default router;
