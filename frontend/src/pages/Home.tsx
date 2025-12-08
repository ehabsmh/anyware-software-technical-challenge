import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  styled,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { login } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

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
    ".MuiInputBase-root:before": {
      borderBottomColor: "#408391",
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
  const { isAuthenticated, role } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  async function onSubmit(data: { email: string; password: string }) {
    const result = await dispatch(login(data));
    if (result.type === "auth/login/fulfilled") {
      // navigate to dashboard on successful login
      if (role === "student") navigate("/student/dashboard");
      if (role === "instructor") navigate("/instructor/dashboard");
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
          p: 3,
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
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {isAuthenticated ? t("loggedinMessage") : t("loginMessage")}
          </Typography>

          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="">
              <CssTextField
                id="custom-css-outlined-input1"
                label="Email"
                variant="standard"
                {...register("email")}
              />
            </div>
            <div>
              <CssTextField
                id="custom-css-outlined-input2"
                label="Password"
                variant="standard"
                type="password"
                {...register("password")}
              />
            </div>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                marginTop: "1rem",
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
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
