import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./models/index";
import router from "./routes/api";
import { connectDB } from "./database/connection";
import log from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";
const app = express();
export const {
  JWT_SECRET_KEY,
  PORT,
  MONGO_URI,
  GMAIL_PASSWORD,
  CLOUDINARY_URL,
} = process.env;

app.use(
  cors({ origin: "https://coligo-lms-app.vercel.app", credentials: true })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/", router);

// test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT || 5000, () =>
      log.success(`Server running on port ${PORT || 5000}`)
    );
  } catch (err) {
    log.error(`Failed to start server: ${err}`);
  }
};

startServer();
