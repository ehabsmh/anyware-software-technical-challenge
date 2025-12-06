import {
  Toolbar,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { getSemesters } from "../services/apiSemesters";
import { useCourses } from "../hooks/useCourses";
import { useAppSelector } from "../store/hooks";
import { useQuery } from "@tanstack/react-query";

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
  // const [semesters, setSemesters] = useState<ISemester[]>([]);
  const { data: semesters } = useQuery({
    queryKey: ["semesters"],
    queryFn: getSemesters,
  });

  const { role: userRole } = useAppSelector((state) => state.user);

  // Get Courses based on the chosen semester
  const { data } = useCourses(selectedSemesterId);
  const courses = data?.data.items;

  // Get Semesters on component mount
  // useEffect(() => {
  //   getSemesters().then((data) => setSemesters(data ?? []));
  // }, []);

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
        label="Semester"
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
        <MenuItem value="">All Semesters</MenuItem>
        {semesters?.map((semester) => (
          <MenuItem key={semester._id} value={semester._id}>
            {semester.name}
          </MenuItem>
        ))}
      </TextField>

      {selectedSemesterId && (
        <TextField
          select
          label="Course"
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
          <MenuItem value="">All Courses</MenuItem>
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
          label="Mine only"
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

      <Button
        variant="contained"
        sx={{
          color: "black",
          background: "white",
          borderRadius: "8px",
          transition: "background-color 0.2s",
          "&:hover": { backgroundColor: "#f3f3f3" },
        }}
      >
        Apply
      </Button>
    </Toolbar>
  );
}
