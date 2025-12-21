/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAnnouncement,
  deleteAnnouncement,
  fetchAllAnnouncements,
  fetchAnnouncementById,
  fetchLatestAnnouncements,
  updateAnnouncement,
} from "../services/apiAnnouncements";
import { toast } from "sonner";
import type { IAnnouncementResponse } from "../interfaces/announcement";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type AnnouncementsHookParams = {
  page?: number;
  limit?: number;
  semesterId?: string;
  courseId?: string;
  mineOnly?: boolean;
};

export function useAnnouncements({
  page = 1,
  limit = 8,
  semesterId,
  courseId,
  mineOnly,
}: AnnouncementsHookParams = {}) {
  return useQuery({
    queryKey: ["announcements", semesterId, courseId, mineOnly, page, limit],
    queryFn: () =>
      fetchAllAnnouncements({ page, limit, semesterId, courseId, mineOnly }),
  });
}

export function useLatestAnnouncements() {
  return useQuery({
    queryKey: ["announcements", "latest"],
    queryFn: () => fetchLatestAnnouncements(5),
  });
}

export function useAnnouncement(id: string) {
  return useQuery({
    queryKey: ["announcement", id],
    queryFn: () => fetchAnnouncementById(id),
    enabled: !!id,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (payload: Parameters<typeof createAnnouncement>[0]) =>
      createAnnouncement(payload),

    onSuccess: (newAnnouncement) => {
      queryClient.setQueriesData(
        { queryKey: ["announcements"], exact: false },
        (old: IAnnouncementResponse) => {
          if (!old) return old;

          return {
            ...old,
            items: [newAnnouncement, ...old.items],
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["announcements"] });

      toast.success(t("createAnnouncementPage.successfulCreationMessage"));
      navigate("/instructor/announcements/view");
    },

    onError: (error: any) => {
      if (error.type !== "validation") {
        toast.error(error.message);
      }
    },
  });
}

export function useEditAnnouncement() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<typeof updateAnnouncement>[1];
    }) => updateAnnouncement(id, payload),
    onSuccess: (updatedAnnouncement) => {
      queryClient.setQueriesData(
        { queryKey: ["announcements"], exact: false },
        (old: IAnnouncementResponse) => {
          if (!old) return old;

          return {
            ...old,
            items: [updatedAnnouncement, ...old.items],
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["announcements"] });

      toast.success("Announcement updated successfully!");
      navigate("/instructor/announcements/view");
    },
    onError: (error: any) => {
      if (error.type !== "validation") {
        toast.error(error.message);
      }
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAnnouncement(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },

    onError: (error) => {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || "Failed to create announcement.");
    },
  });
}
