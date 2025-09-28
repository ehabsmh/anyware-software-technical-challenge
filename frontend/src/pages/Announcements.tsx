import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getAllAnnouncements,
  getAnnouncementsInfo,
  loadAll,
} from "../features/announcements/announcementsSlice";
import Announcement from "../features/announcements/Announcement";
import { Stack } from "@mui/system";
import { Pagination } from "@mui/material";

export default function Announcements() {
  const dispatch = useAppDispatch();
  const { items, page, totalPages } = useAppSelector(getAllAnnouncements);
  const { hasError, isLoading } = useAppSelector(getAnnouncementsInfo);
  const [currentPage, setCurrentPage] = useState(page || 1);

  useEffect(() => {
    if (!items.length || page !== currentPage) {
      dispatch(loadAll({ page: currentPage, limit: 2 }));
    }
  }, [dispatch, currentPage, items.length, page]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (hasError) {
    return <div className="p-6 text-red-500">Failed to load data.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Announcements</h1>

      <div className="space-y-4">
        {items.map((a) => (
          <Announcement
            key={a._id}
            instructor={a.author}
            content={a.content}
            course={a.course?.name}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
          />
        </Stack>
      </div>
    </div>
  );
}
