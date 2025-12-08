import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import CourseCard from "../ui/CourseCard";
import { useCourses, useDeleteCourse } from "../hooks/useCourses";
import { useNavigate } from "react-router-dom";
import { getSemesters } from "../services/apiSemesters";
import SearchCourses from "../ui/SearchCourses";
import CourseSkeleton from "../skeletons/course";
import { showAlert } from "../utils/helpers";
import { useAppSelector } from "../store/hooks";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

function Courses() {
  const { t } = useTranslation();

  const { role: userRole } = useAppSelector((state) => state.user);

  const { data: semesters } = useQuery({
    queryKey: ["semesters"],
    queryFn: () => getSemesters(),
  });
  const [selectedSemester, setSelectedSemester] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const { data, isLoading, error } = useCourses(
    selectedSemester,
    searchTerm,
    currentPage
  );
  const { mutate: deleteCourse } = useDeleteCourse(selectedSemester);

  const items = data?.data.items || [];
  const { totalPages } = data?.data || {};

  function onEdit(courseId: string) {
    navigate(`/instructor/courses/edit/${courseId}`);
  }

  function onDelete(courseId: string) {
    showAlert(() => deleteCourse(courseId));
  }

  useEffect(() => {
    setSelectedSemester(semesters?.find((s) => s.isCurrent)?._id || "");
  }, [semesters]);

  if (error) return <div>Error loading</div>;
  if (!items) return <div>No courses found.</div>;

  return (
    <div className="bg-main overflow-y-auto p-8 h-[calc(100vh-86px)]">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-[--color-gradient-1] mb-10">
        {userRole === "instructor"
          ? `${t("instructorCoursesPage.title")}`
          : `${t("coursesTitle")}`}
      </h1>

      <div className="md:flex md:gap-8 mb-7">
        {/* Semester Dropdown */}
        <FormControl
          sx={{
            minWidth: 200,
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            mb: 3,
          }}
          size="small"
          className=""
        >
          <InputLabel>
            {t("instructorCoursesPage.semesterSelectLabel")}
          </InputLabel>
          <Select
            value={selectedSemester}
            label={t("instructorCoursesPage.semesterSelectLabel")}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {semesters?.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}{" "}
                {s.isCurrent && (
                  <span style={{ color: "#12557b", fontWeight: "bold" }}>
                    {" "}
                    (Current)
                  </span>
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SearchCourses onSearch={setSearchTerm} />
      </div>

      {/* Courses Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {!isLoading
          ? items.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                role={userRole!}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          : [...Array(6)].map((_, i) => <CourseSkeleton key={i} />)}
      </div>

      {/* Pagination */}
      {items.length === 0
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
    </div>
  );
}

export default Courses;
