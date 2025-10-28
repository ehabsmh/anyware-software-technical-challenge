import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 },
}); // Limit file size to 3MB

export default upload;
// This configuration uses memory storage, which means files will be stored in memory as Buffer objects.
// This is suitable for small files and allows you to process them directly in your application.
