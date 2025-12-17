import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SearchCourses from "../../ui/SearchCourses";
import { useTranslation } from "react-i18next";
import { useSemesters } from "../../hooks/useSemesters";

function CoursesFilters({
  onSemesterChange,
  selectedSemester,
  currSemesterLoading,
  setSearchTerm,
}: {
  onSemesterChange: (semId: string) => void;
  selectedSemester: string;
  currSemesterLoading: boolean;
  setSearchTerm: (term: string) => void;
}) {
  const { t } = useTranslation();

  const { data: semesters } = useSemesters();

  return (
    <Box className="md:flex md:items-center md:gap-8 mb-7 space-y-4! md:space-y-0!">
      {/* Semester Dropdown */}
      <FormControl
        sx={{
          minWidth: 200,
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
        size="small"
      >
        <InputLabel>
          {t("instructorCoursesPage.semesterSelectLabel")}
        </InputLabel>
        <Select
          disabled={currSemesterLoading}
          value={selectedSemester}
          label={t("instructorCoursesPage.semesterSelectLabel")}
          onChange={(e) => onSemesterChange(e.target.value)}
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
    </Box>
  );
}

export default CoursesFilters;
