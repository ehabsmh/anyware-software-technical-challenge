import { v2 as cloudinary } from "cloudinary";
import AppError from "../utils/error";
import streamifier from "streamifier";
import { unlink } from "fs";

cloudinary.config({
  secure: true,
  analytics: false,
});

export const uploadStream = async (file: any, folderName: string) => {
  if (!file) throw new AppError("Upload image file is required", 400);

  const result: any = await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new AppError("Upload timeout", 422)),
      80_000
    ); // 80 sec timeout
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `coligo/${folderName}`,
        use_filename: true,
        overwrite: true,
      },
      (error, result) => {
        clearTimeout(timeout);
        if (error) return reject(error);

        resolve(result);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });

  const publicId = result.public_id;

  const url = cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { quality: "auto", fetch_format: "auto" },
      { crop: "fill", gravity: "auto" },
    ],
  });

  console.log(url);

  return url;
};

export const uploadVideo = async (filePath: string, folderName: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      filePath,
      {
        folder: `coligo/${folderName}`,
        resource_type: "video",
      },
      (error, result) => {
        if (error) {
          return reject(new AppError("Video upload failed", 500));
        }
        resolve(result?.secure_url);
      }
    );

    unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting temp video file:", err);
      }
    });
  });
};
