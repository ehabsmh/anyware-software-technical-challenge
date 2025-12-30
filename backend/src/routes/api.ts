import express from "express";
import announcementsRouter from "./announcements";
import quizzesRouter from "./quizzes";
import authRouter from "./auth";
import coursesRouter from "./courses";
import semestersRouter from "./semesters";
import quizSubmissionsRouter from "./quizSubmissions";
import lessonsRouter from "./lessons";
import enrollmentsRouter from "./enrollments";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/announcements", announcementsRouter);
router.use("/quizzes", quizzesRouter);
router.use("/quizzes/", quizSubmissionsRouter);
router.use("/courses/lessons", lessonsRouter);
router.use("/courses", coursesRouter);
router.use("/semesters", semestersRouter);
router.use("/enrollments", enrollmentsRouter);
export default router;
