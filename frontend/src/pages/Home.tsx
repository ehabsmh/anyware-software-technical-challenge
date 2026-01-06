import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  styled,
  Divider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { login } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import DemoUsers from "../features/users/Demo";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#408391",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#408391",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#408391",
    },
    "&:hover fieldset": {
      borderColor: "#408391",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#408391",
    },
  },
});

function Home() {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  async function onSubmit(data: { email: string; password: string }) {
    const result = await dispatch(login(data));

    if (result.type === "auth/login/fulfilled") {
      const { role } = result.payload;

      if (role === "student") navigate("/student/dashboard");
      if (role === "instructor") navigate("/instructor/courses/my-courses");
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          textAlign: "center",
          p: 1.5,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {t("welcome")}{" "}
            <span className="text-gradient-2 font-bold text-5xl">
              {t("logoName")}
            </span>
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {isAuthenticated
              ? t("loggedinMessage")
              : "Login with your account or use a demo account"}
          </Typography>

          {/* Normal Login */}
          <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <CssTextField
              label="Email"
              variant="standard"
              fullWidth
              sx={{ mb: 2 }}
              {...register("email")}
            />

            <CssTextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              sx={{ mb: 3 }}
              {...register("password")}
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                color: "#408391",
                borderColor: "#408391",
                "&:hover": {
                  borderColor: "#1c5660",
                  color: "#1c5660",
                },
              }}
            >
              Login
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>OR</Divider>

          {/* Demo Section */}
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Demo Access (No signup required)
          </Typography>

          <DemoUsers />
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
