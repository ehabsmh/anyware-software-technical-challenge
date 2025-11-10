import { v2 as cloudinary } from "cloudinary";
import AppError from "../utils/error";
import streamifier from "streamifier";

cloudinary.config({
  secure: true,
  analytics: false,
});

export const uploadStream = async (file: any, folderName: string) => {
  if (!file)
    throw new AppError(
      "Something went wrong while uploading the file, Please try again.",
      400
    );

  const result: any = await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new AppError("Upload timeout", 422)),
      60000
    ); // 60 sec timeout
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

  return url;
};
