import { useNavigate } from "react-router-dom";
import { useCourses, useDeleteCourse } from "../../hooks/useCourses";
import { showAlert } from "../../utils/helpers";
import CoursesGrid from "./CoursesGrid";
import CourseCard from "../../ui/CourseCard";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ICourse } from "../../interfaces/course";

type InstructorCoursesProps = {
  selectedSemester: string;
  searchTerm: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

function InstructorCourses({
  selectedSemester,
  searchTerm,
  currentPage,
  setCurrentPage,
}: InstructorCoursesProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading } = useCourses({
    semesterId: selectedSemester,
    name: searchTerm,
    page: currentPage,
    limit: 9,
  });

  const items = data?.data.items || [];
  const { totalPages } = data?.data || {};
  const showPagination = totalPages && totalPages > 1 && selectedSemester;

  const { mutate: deleteCourse } = useDeleteCourse();

  function handleEditCourse(courseId: string) {
    navigate(`/instructor/courses/edit/${courseId}`);
  }

  function handleDeleteCourse(courseId: string) {
    showAlert(() => deleteCourse(courseId));
  }

  function handleViewCourse(courseId: string) {
    navigate(`/instructor/courses/my-courses/${courseId}`);
  }

  return (
    <>
      {/* No Courses Found Message */}
      {!isLoading && items.length === 0 && selectedSemester && (
        <Typography component="p" variant="body1" sx={{ mt: 4 }}>
          {t("instructorCoursesPage.noCoursesFoundMessage")}
        </Typography>
      )}
      <CoursesGrid isLoading={isLoading}>
        {items?.map((course) => (
          <CourseCard
            key={course._id}
            course={course as ICourse}
            role="instructor"
            onView={handleViewCourse}
            onDelete={handleDeleteCourse}
            onEdit={handleEditCourse}
          />
        ))}
      </CoursesGrid>

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
    </>
  );
}

export default InstructorCourses;
