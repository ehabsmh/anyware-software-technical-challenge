import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Pagination,
  Avatar,
  Divider,
} from "@mui/material";
import {
  useAnnouncements,
  useDeleteAnnouncement,
} from "../hooks/useAnnouncements";
import AnnouncementsFilters from "../features/announcements/AnnouncementsFilters";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Delete, EditNoteOutlined } from "@mui/icons-material";
import { showAlert } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import AnnouncementSkeleton from "../skeletons/announcementSkeleton";

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
      <AnnouncementsFilters
        selectedSemesterId={selectedSemesterId}
        onSelectSemester={onSelectSemester}
        selectedCourseId={selectedCourseId}
        onSelectCourse={onSelectCourse}
        mineOnly={mineOnly}
        onToggleMineOnly={onToggleMineOnly}
      />
      {/* Announcements list */}
      {announcementsLoading ? (
        [...Array(4)].map((_, i) => <AnnouncementSkeleton key={i} />)
      ) : (
        <Box sx={{ width: "100%" }} className="space-y-10 mt-5">
          {announcements.map((a) => (
            <Card
              key={a._id}
              sx={{ width: "100%", overflow: "visible" }}
              className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 relative"
            >
              {user._id === a.author._id && (
                <div className="flex gap-1.5 absolute -top-4 right-0">
                  <div className="h-8 w-8 rounded-full bg-main flex justify-center items-center cursor-pointer">
                    <EditNoteOutlined
                      sx={{
                        color: "#aba460",
                        transition: "color 0.3s",
                        "&:hover": { color: "#feb806" },
                      }}
                      onClick={() =>
                        navigate(`/instructor/announcements/edit/${a._id}`)
                      }
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-main flex justify-center items-center cursor-pointer">
                    <Delete
                      sx={{
                        color: "#f75555",
                        transition: "color 0.3s",
                        fontSize: "20px",
                        "&:hover": { color: "#ed1405" },
                      }}
                      onClick={() => onDeleteAnnouncement(a._id)}
                    />
                  </div>
                </div>
              )}

              <CardContent sx={{ mt: 1, "&:last-child": { pb: 1.3 } }}>
                <Typography variant="h6" className="text-gradient-1 font-bold">
                  {a.title}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="body1"
                  className="text-gray-700 mt-1"
                  sx={{ whiteSpace: "pre-wrap" }}
                >
                  {a.content}
                </Typography>
                <Box className="flex justify-between items-center mt-10 text-sm text-gray-500">
                  <Box className="flex items-center space-x-2">
                    <Avatar
                      alt={a.author.name}
                      src={a.author.avatar}
                      sx={{ width: 30, height: 30 }}
                    />
                    <span className="text-xs">{a.author.name}</span>
                  </Box>
                  <span className="text-xs">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </span>
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
