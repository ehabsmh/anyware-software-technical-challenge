import api from "../config/axios.config";

export async function fetchLatestAnnouncements() {
  const { data } = await api.get("/announcements/latest");
  return data;
}

export async function fetchAllAnnouncements(page = 1, limit = 10) {
  const { data } = await api.get("/announcements", {
    params: { page, limit },
  });
  return data;
}

export async function fetchAnnouncementById(id: string) {
  const { data } = await api.get(`/announcements/${id}`);
  return data;
}
