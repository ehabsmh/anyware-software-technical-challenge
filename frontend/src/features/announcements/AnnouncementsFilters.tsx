import {
  Toolbar,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { getSemesters } from "../../services/apiSemesters";
import { useCourses } from "../../hooks/useCourses";
import { useAppSelector } from "../../store/hooks";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export default function AnnouncementsFilters({
  selectedSemesterId,
  onSelectSemester,
  selectedCourseId,
  onSelectCourse,
  mineOnly,
  onToggleMineOnly,
}: {
  selectedSemesterId: string;
  onSelectSemester: (semesterId: string) => void;
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
  mineOnly: boolean;
  onToggleMineOnly: () => void;
}) {
  const { t } = useTranslation();
  const { data: semesters } = useQuery({
    queryKey: ["semesters"],
    queryFn: getSemesters,
  });

  const { role: userRole } = useAppSelector((state) => state.user);

  // Get Courses based on the chosen semester
  const { data } = useCourses(selectedSemesterId);
  const courses = data?.data.items;

  return (
    <Toolbar
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        background:
          "linear-gradient(to right, var(--color-gradient-1), var(--color-gradient-2))",
        borderRadius: "12px",
        p: 2,
      }}
    >
      <TextField
        select
        label={t("announcementsFilters.semesterLabel")}
        size="small"
        sx={{
          minWidth: 180,
          color: "white",
          borderColor: "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "#d8d8d8",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiSelect-icon": {
            color: "white",
          },
          "& .MuiOutlinedInput-input": {
            color: "white",
          },
        }}
        value={selectedSemesterId}
        onChange={(e) => onSelectSemester(e.target.value)}
      >
        <MenuItem value="">
          {t("announcementsFilters.allSemestersLabel")}
        </MenuItem>
        {semesters?.map((semester) => (
          <MenuItem key={semester._id} value={semester._id}>
            {semester.name}
          </MenuItem>
        ))}
      </TextField>

      {selectedSemesterId && (
        <TextField
          select
          label={t("announcementsFilters.courseLabel")}
          size="small"
          sx={{
            minWidth: 180,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "#d8d8d8",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
            "& .MuiSelect-icon": {
              color: "white",
            },
            "& .MuiOutlinedInput-input": {
              color: "white",
            },
          }}
          value={selectedCourseId}
          onChange={(e) => onSelectCourse(e.target.value)}
        >
          <MenuItem value="">
            {t("announcementsFilters.allCoursesLabel")}
          </MenuItem>
          {courses?.map((course) => (
            <MenuItem key={course._id} value={course._id}>
              {course.name}
            </MenuItem>
          ))}
        </TextField>
      )}

      {userRole === "instructor" && (
        <FormControlLabel
          control={<Checkbox />}
          label={t("announcementsFilters.mineOnlyLabel")}
          checked={mineOnly}
          onChange={onToggleMineOnly}
          sx={{
            color: "white",
            "& .MuiCheckbox-root": {
              color: "white",
            },
          }}
        />
      )}
    </Toolbar>
  );
}
