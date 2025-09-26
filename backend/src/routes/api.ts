import express from "express";

const router = express.Router();

router.use("/announcements", usersRouter);
router.use("/quizzes", categoriesRouter);

export default router;
