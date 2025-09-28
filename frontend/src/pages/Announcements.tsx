import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getAllAnnouncements,
  loadAll,
} from "../features/announcements/announcementsSlice";
import Announcement from "../features/announcements/Announcement";
import { Stack } from "@mui/system";
import { Pagination } from "@mui/material";

export default function Announcements() {
  const dispatch = useAppDispatch();
  const { all, loading } = useAppSelector(getAllAnnouncements);
  const [page, setPage] = useState(all.page || 1);

  useEffect(() => {
    dispatch(loadAll({ page, limit: 2 }));
  }, [dispatch, page]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Announcements</h1>

      <div className="space-y-4">
        {all.items.map((a) => (
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
            count={all.totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Stack>
      </div>
    </div>
  );
}
