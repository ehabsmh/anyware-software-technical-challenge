import multer from "multer";

const videoStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "tmp/videos/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadImages = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 },
});

export const uploadVideos = multer({
  storage: videoStorage,
  limits: { fileSize: 100 * 1024 * 1024 },
});
