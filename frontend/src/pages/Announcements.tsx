import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Pagination,
  Avatar,
} from "@mui/material";
import {
  useAnnouncements,
  useDeleteAnnouncement,
} from "../hooks/useAnnouncements";
import AnnouncementsFilters from "../ui/AnnouncementsFilters";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Delete, Edit } from "@mui/icons-material";
import { showAlert } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import AnnouncementSkeleton from "../skeletons/announcementSkeleton";
import AnnouncementFilterSkeleton from "../skeletons/announcementFilterSkeleton";

function AnnouncementsPage() {
  const [selectedSemesterId, setSelectedSemesterId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [mineOnly, setMineOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { mutate: deleteAnnouncement } = useDeleteAnnouncement();

  const user = useAppSelector((state) => state.user);

  const { data, isLoading: announcementsLoading } = useAnnouncements({
    semesterId: selectedSemesterId,
    courseId: selectedCourseId,
    mineOnly: mineOnly,
    page: currentPage,
    limit: 4,
  });

  const announcements = data?.items || [];
  const { totalPages } = data || {};

  function onSelectSemester(semesterId: string) {
    setSelectedSemesterId(semesterId);
  }

  function onSelectCourse(courseId: string) {
    setSelectedCourseId(courseId);
  }

  function onToggleMineOnly() {
    setMineOnly((prev) => !prev);
  }

  function onDeleteAnnouncement(announcementId: string) {
    showAlert(() => deleteAnnouncement(announcementId));
  }

  return (
    <Box className="bg-main overflow-y-auto p-8 h-[calc(100vh-86px)]">
      {announcementsLoading ? (
        <AnnouncementFilterSkeleton />
      ) : (
        <AnnouncementsFilters
          selectedSemesterId={selectedSemesterId}
          onSelectSemester={onSelectSemester}
          selectedCourseId={selectedCourseId}
          onSelectCourse={onSelectCourse}
          mineOnly={mineOnly}
          onToggleMineOnly={onToggleMineOnly}
        />
      )}
      {/* Announcements list */}
      {announcementsLoading ? (
        [...Array(4)].map((_, i) => <AnnouncementSkeleton key={i} />)
      ) : (
        <Box className="space-y-10 mt-5">
          {announcements.map((a) => (
            <Card
              key={a._id}
              className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 relative"
            >
              {user._id === a.author._id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 8,
                    cursor: "pointer",

                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <Delete
                    sx={{ color: "#e11919" }}
                    onClick={() => onDeleteAnnouncement(a._id)}
                  />
                  <Edit
                    sx={{ color: "#cb8800" }}
                    onClick={() =>
                      navigate(`/instructor/announcements/edit/${a._id}`)
                    }
                  />
                </Box>
              )}

              <CardContent sx={{ mt: 1.2 }}>
                <Typography variant="h6" className="text-gradient-1 font-bold">
                  {a.title}
                </Typography>
                <Typography variant="body1" className="text-gray-700 mt-1">
                  {a.content}
                </Typography>
                <Box className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <Box className="flex items-center space-x-2">
                    <Avatar
                      alt={a.author.name}
                      src={a.author.avatar}
                      sx={{ width: 35, height: 35 }}
                    />
                    <span>{a.author.name}</span>
                  </Box>
                  <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Pagination */}
      {announcements.length === 0
        ? null
        : typeof totalPages === "number" &&
          totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 w-full">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, value) => setCurrentPage(value)}
                  size="large"
                />
              </Stack>
            </div>
          )}
    </Box>
  );
}

export default AnnouncementsPage;
