import axios from "axios";
import api from "../config/axios.config";
import type {
  IAnnouncement,
  IAnnouncementPopulated,
  IAnnouncementResponse,
} from "../interfaces/announcement";
import type { AnnouncementsHookParams } from "../hooks/useAnnouncements";

export async function fetchLatestAnnouncements(limit = 4) {
  const { data } = await api.get("/announcements/latest", {
    params: { limit },
  });
  return data;
}

export async function fetchAllAnnouncements(params: AnnouncementsHookParams) {
  const { data }: { data: IAnnouncementResponse } = await api.get(
    "/announcements",
    {
      params,
    }
  );
  return data;
}

export async function fetchAnnouncementById(id: string) {
  const { data }: { data: IAnnouncementPopulated } = await api.get(
    `/announcements/${id}`
  );
  return data;
}

export async function createAnnouncement(payload: Partial<IAnnouncement>) {
  try {
    const { data }: { data: IAnnouncement } = await api.post(
      "/announcements",
      payload
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to create course.");
    }
  }
}

export async function updateAnnouncement(
  id: string,
  payload: Partial<IAnnouncement>
) {
  try {
    const { data }: { data: IAnnouncement } = await api.patch(
      `/announcements/${id}`,
      payload
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to update announcement."
      );
    }
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    await api.delete(`/announcements/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to delete announcement."
      );
    }
  }
}
