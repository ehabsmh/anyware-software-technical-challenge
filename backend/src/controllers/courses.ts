import { Request, Response } from "express";
import CourseService from "../database/services/course";
import AppError from "../utils/error";
import { uploadStream } from "../configs/cloudinary.config";
import { CustomRequest } from "../middlewares/auth";
import { IValidationError } from "../interfaces/validationError";

class CourseController {
  static async getCoursesBySemester(req: CustomRequest, res: Response) {
    const { semesterId } = req.params;
    const { page, limit, name } = req.query;
    const user = req.user;

    if (!semesterId) {
      throw new AppError("semester ID is required", 400);
    }

    const parsedPage = Number(page);

    if (page && isNaN(parsedPage)) {
      throw new AppError("Page must be a valid number", 400);
    }

    const parsedLimit = Number(limit);
    if (limit && isNaN(parsedLimit)) {
      throw new AppError("Limit must be a valid number", 400);
    }

    const result = await CourseService.getCoursesBySemester(semesterId, {
      page: parsedPage || 1,
      limit: parsedLimit || 10,
      name: typeof name === "string" ? name : undefined,
      instructorId:
        user?.role === "instructor" ? user._id.toString() : undefined,
    });

    res.json({ status: "success", data: result });
  }

  static async getCourseById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new AppError("id is required", 400);
    }

    const course = await CourseService.getCourseById(id);

    res.status(200).json({ status: "success", data: course });
  }

  static async getInstructorCoursesWithQuizzes(
    req: CustomRequest,
    res: Response
  ) {
    const instructorId = req.user?._id;
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    const courses = await CourseService.getInstructorCoursesWithQuizzes(
      String(instructorId!)
    );

    res.json(courses);
  }

  static async create(req: CustomRequest, res: Response) {
    const { name, description, semester } = req.body;
    const userId = req.user?._id;

    if (!userId) throw new AppError("user id is required", 400);

    const image = req.file;

    const imageUrl = await uploadStream(image, "courses");

    const course = await CourseService.createCourse({
      name,
      description,
      instructor: userId,
      semester,
      image: imageUrl,
    });

    res.status(201).json({ success: true, course });
  }

  static async update(req: CustomRequest, res: Response) {
    const { name, description, semester } = req.body;
    const { id } = req.params;
    const image = req.file;
    const user = req.user;

    // const course = await Course.findById(id);
    let imageUrl = "";

    if (image) imageUrl = await uploadStream(image, "courses");
    console.log(imageUrl);

    if (!id) {
      throw new AppError("id is required", 400);
    }

    const updated = await CourseService.updateCourse(id, {
      name,
      description,
      semester,
      instructor: user?._id!,
      image: imageUrl,
    });

    res.status(200).json({ status: "success", data: updated });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new AppError("id is required", 400);
    }

    const course = await CourseService.deleteCourse(id);

    res.status(200).json({ status: "success", course });
  }
}

export default CourseController;
