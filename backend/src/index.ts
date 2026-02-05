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
  NODE_ENV,
} = process.env;

app.use(
  cors({
    origin:
      NODE_ENV === "production"
        ? "https://coligo-lms-app.vercel.app"
        : "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/", router);

// test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

function startServer() {
  app.listen(PORT || 5000, () => {
    log.success(`Server running on port ${PORT || 5000}`);
  });

  connectDB(MONGO_URI)
    .then(() => log.success("DB connected"))
    .catch((err) => log.error(`DB connection failed: ${err}`));
}

startServer();
