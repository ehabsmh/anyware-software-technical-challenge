import axios from "axios";
import api from "../config/axios.config";
import type {
  CourseFormValues,
  ICourse,
  ICoursePopulated,
  ICourseResponse,
} from "../interfaces/course";

export async function getCourses(
  semesterId: string,
  name?: string,
  page = 1,
  limit = 8
) {
  try {
    const { data }: { data: ICourseResponse } = await api.get(
      `/courses/semester/${semesterId}`,
      {
        params: { page, limit, name },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create course.");
    }
  }
}

export const getCourseById = async (id: string) => {
  try {
    const { data }: { data: { status: string; data: ICoursePopulated } } =
      await api.get(`/courses/${id}`);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create course.");
    }
  }
};

export async function createCourse(payload: CourseFormValues) {
  try {
    console.log("xx", payload);
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("semester", payload.semester);

    if (payload.image && payload.image instanceof File) {
      formData.append("image", payload.image, payload.image.name);
    }

    const { data }: { data: { success: boolean; course: ICourse } } =
      await api.post("/courses", formData);

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      const response = error.response.data;

      if (response.success === false && response.errors) {
        throw {
          type: "validation",
          success: response.success,
          errors: response.errors,
        };
      }

      throw new Error(error.response.data.error || "Failed to create course.");
    }
  }
}

export const updateCourse = async (id: string, payload: CourseFormValues) => {
  try {
    const form = new FormData();
    if (payload.name) form.append("name", payload.name);
    if (payload.description) form.append("description", payload.description);
    if (payload.semester) form.append("semester", payload.semester);
    console.log(payload.image);
    if (payload.image) form.append("image", payload.image);

    const { data }: { data: { status: string; data: ICourse } } =
      await api.patch(`/courses/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const response = error.response.data;

      if (response.success === false && response.errors) {
        throw {
          type: "validation",
          success: response.success,
          errors: response.errors,
        };
      }

      throw new Error(error.response.data.error || "Failed to edit course.");
    }
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const { data }: { data: { success: boolean; course: ICourse } } =
      await api.delete(`/courses/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to delete course.");
    }
  }
};
