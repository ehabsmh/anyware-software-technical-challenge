import { useState } from "react";
import {
  useCourses,
  useEnrollInCourse,
  useGetEnrolledCoursesIds,
} from "../../hooks/useCourses";
import { useNavigate } from "react-router-dom";
import CoursesGrid from "./CoursesGrid";
import CourseCard from "../../ui/CourseCard";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { IEnrollment } from "../../interfaces/enrollment";
import type { ICourse } from "../../interfaces/course";

type StudentCoursesProps = {
  selectedSemester: string;
  searchTerm: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

function StudentCourses({
  selectedSemester,
  searchTerm,
  currentPage,
  setCurrentPage,
}: StudentCoursesProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showEnrolled, setShowEnrolled] = useState(true);

  const { data, isLoading } = useCourses({
    semesterId: selectedSemester,
    name: searchTerm,
    page: currentPage,
    limit: 9,
    enrolledOnly: showEnrolled,
  });

  const items = data?.data.items || [];
  const { totalPages } = data?.data || {};

  const { data: enrolledCoursesIds } =
    useGetEnrolledCoursesIds(selectedSemester);

  const { mutate: enrollInCourse } = useEnrollInCourse();

  const showPagination = totalPages && totalPages > 1 && selectedSemester;

  function handleViewCourse(courseId: string) {
    if (enrolledCoursesIds?.includes(courseId))
      navigate(`/student/courses/${courseId}`);
  }

  function handleEnrollChange(enrolled: boolean) {
    setShowEnrolled(enrolled);
    setCurrentPage(1);
  }

  function handleEnrollInCourse(courseId: string) {
    enrollInCourse({ courseId, semesterId: selectedSemester });
  }

  return (
    <>
      {/* Toggle buttons */}
      <div className="flex gap-2 mb-4">
        <Button onClick={() => handleEnrollChange(true)} variant="contained">
          Enrolled
        </Button>
        <Button onClick={() => handleEnrollChange(false)} variant="outlined">
          All Courses
        </Button>
      </div>

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
            course={
              showEnrolled
                ? (course as IEnrollment).courseId
                : (course as ICourse)
            }
            role="student"
            onView={handleViewCourse}
            onEnroll={handleEnrollInCourse}
            enrolledIds={enrolledCoursesIds}
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

export default StudentCourses;
