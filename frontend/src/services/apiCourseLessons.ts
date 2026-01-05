import axios from "axios";
import api from "../config/axios.config";
import type {
  ICourseLesson,
  ICourseLessonPopulated,
  ICreateCourseLessonPayload,
  IUpdateCourseLessonPayload,
} from "../interfaces/courseLesson";

export async function fetchCourseLessons(courseId: string) {
  try {
    const { data }: { data: ICourseLessonPopulated } = await api.get(
      `courses/lessons`,
      {
        params: { courseId },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create course.");
    }
  }
}

export async function fetchLessonById(lessonId: string, courseId: string) {
  try {
    const { data }: { data: ICourseLesson } = await api.get(
      `courses/lessons/${lessonId}`,
      { params: { courseId } }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch lesson.");
    }
  }
}

export async function createCourseLesson(payload: ICreateCourseLessonPayload) {
  try {
    let formData;

    if (payload.video instanceof File) {
      formData = new FormData();
      formData.append("course", payload.course);
      formData.append("title", payload.title);
      formData.append("content", payload.content);
      formData.append("video", payload.video);
      if (payload.resources) {
        formData.append("resources", JSON.stringify(payload.resources));
      }
    }

    const { data }: { data: ICourseLesson } = await api.post(
      `courses/lessons`,
      formData ? formData : payload
    );

    return data;
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

      throw new Error(
        error.response.data.error || "Failed to create course lesson."
      );
    }
  }
}

export async function updateCourseLesson(
  id: string,
  payload: IUpdateCourseLessonPayload
) {
  try {
    const { data }: { data: ICourseLesson } = await api.patch(
      `courses/lessons/${id}`,
      payload
    );

    return data;
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
    }
  }
}

export async function deleteCourseLesson(id: string) {
  try {
    await api.delete(`courses/lessons/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to delete course lesson."
      );
    }
  }
}
