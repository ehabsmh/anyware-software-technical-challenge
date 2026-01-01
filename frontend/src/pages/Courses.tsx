import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useTranslation } from "react-i18next";
import { useCurrentSemester } from "../hooks/useSemesters";
import CoursesFilters from "../features/courses/CoursesFilters";
import InstructorCourses from "../features/courses/InstructorCourses";
import StudentCourses from "../features/courses/StudentCourses";

function Courses() {
  const { t } = useTranslation();

  const { role: userRole } = useAppSelector((state) => state.user);

  const { data: currSemester, isLoading: semLoading } = useCurrentSemester();
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  function handleSemesterChange(semId: string) {
    setSelectedSemester(semId);
    setCurrentPage(1);
  }

  useEffect(() => {
    if (!semLoading) setSelectedSemester(currSemester?._id || "");
  }, [currSemester, semLoading]);

  return (
    <>
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

      {userRole === "instructor" && (
        <InstructorCourses
          selectedSemester={selectedSemester}
          searchTerm={searchTerm}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {userRole === "student" && (
        <StudentCourses
          selectedSemester={selectedSemester}
          searchTerm={searchTerm}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default Courses;
