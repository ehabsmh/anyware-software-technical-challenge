import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { demoLogin } from "./usersSlice";

function DemoUsers() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleDemoLogin(role: "student" | "instructor") {
    // CALL API HERE
    const result = await dispatch(demoLogin(role));

    if (result.type === "auth/login/demo/:role") {
      const { role } = result.payload;

      if (role === "student") navigate("/student/dashboard");
      if (role === "instructor") navigate("/instructor/courses/my-courses");
    }
  }
  return (
    <Box display="flex" gap={2} mt={1}>
      <Button
        fullWidth
        variant="contained"
        onClick={() => handleDemoLogin("student")}
        sx={{
          fontSize: 11,
          backgroundColor: "var(--color-gradient-2)",
          "&:hover": { backgroundColor: "var(--color-gradient-2-hover)" },
        }}
      >
        Login as Student
      </Button>

      <Button
        fullWidth
        variant="contained"
        sx={{
          fontSize: 11,
          backgroundColor: "var(--color-gradient-1)",
          "&:hover": { backgroundColor: "var(--color-gradient-1-hover)" },
        }}
        onClick={() => handleDemoLogin("instructor")}
      >
        Login as Instructor
      </Button>
    </Box>
  );
}

export default DemoUsers;
