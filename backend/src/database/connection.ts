import mongoose from "mongoose";
import log from "../utils/logger";

const connectDB = async (uri = "mongodb://localhost:27017/anyware") => {
  try {
    await mongoose.connect(uri);
    log.success("MongoDB connected");
  } catch (err) {
    log.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    log.success("MongoDB disconnected");
  } catch (err) {
    log.error(`MongoDB disconnection error: ${err}`);
  }
};

export { connectDB, disconnectDB };
