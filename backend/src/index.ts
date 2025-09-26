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
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/anyware";

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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
    app.listen(PORT, () => log.success(`Server running on port ${PORT}`));
  } catch (err) {
    log.error(`Failed to start server: ${err}`);
  }
};

startServer();
