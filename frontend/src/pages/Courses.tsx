import { Stack, Pagination, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CourseCard from "../ui/CourseCard";
import { useCourses, useDeleteCourse } from "../hooks/useCourses";
import { useNavigate } from "react-router-dom";
import CourseSkeleton from "../skeletons/course";
import { showAlert } from "../utils/helpers";
import { useAppSelector } from "../store/hooks";
import { useTranslation } from "react-i18next";
import { useCurrentSemester } from "../hooks/useSemesters";
import CoursesFilters from "../features/courses/CoursesFilters";

function Courses() {
  const { t } = useTranslation();

  const { role: userRole } = useAppSelector((state) => state.user);

  const { data: currSemester, isLoading: semLoading } = useCurrentSemester();

  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const { data, isLoading } = useCourses(
    selectedSemester,
    searchTerm,
    currentPage
  );

  const { mutate: deleteCourse } = useDeleteCourse();

  const items = data?.data.items || [];
  const { totalPages } = data?.data || {};

  function handleEditCourse(courseId: string) {
    navigate(`/instructor/courses/edit/${courseId}`);
  }

  function handleDeleteCourse(courseId: string) {
    showAlert(() => deleteCourse(courseId));
  }

  function handleViewCourse(courseId: string) {
    if (userRole === "student") navigate(`/student/courses/${courseId}`);

    if (userRole === "instructor")
      navigate(`/instructor/courses/my-courses/${courseId}`);
  }

  function handleSemesterChange(semId: string) {
    setSelectedSemester(semId);
    setCurrentPage(1);
  }

  useEffect(() => {
    if (!semLoading) setSelectedSemester(currSemester?._id || "");
  }, [currSemester, semLoading]);

  const showPagination = totalPages && totalPages > 1 && !semLoading;

  return (
    <Box className="bg-main overflow-y-auto p-8 h-[calc(100vh-86px)]">
      {/* Header */}
      <Typography
        component="h2"
        variant="h2"
        sx={{
          mb: 7,
          textAlign: "center",
          fontSize: "1.9rem",
          fontWeight: "bold",
        }}
        className="text-zinc-500"
      >
        {userRole === "instructor"
          ? `${t("instructorCoursesPage.title")}`
          : `${t("coursesTitle")}`}
      </Typography>

      <CoursesFilters
        onSemesterChange={handleSemesterChange}
        selectedSemester={selectedSemester}
        currSemesterLoading={semLoading}
        setSearchTerm={setSearchTerm}
      />

      {/* No Courses Found Message */}
      {!isLoading && items.length === 0 && !semLoading && (
        <Typography component="p" variant="body1" sx={{ mt: 4 }}>
          {t("instructorCoursesPage.noCoursesFoundMessage")}
        </Typography>
      )}

      {/* Courses Grid */}
      {isLoading && (
        <Box className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <CourseSkeleton key={i} />
          ))}
        </Box>
      )}

      {!isLoading && items.length > 0 && (
        <Box className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              role={userRole!}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
              onView={handleViewCourse}
            />
          ))}
        </Box>
      )}

      {/* Pagination */}
      {showPagination ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              size="large"
            />
          </Stack>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default Courses;
