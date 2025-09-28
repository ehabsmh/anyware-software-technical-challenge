import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login, logout } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function Home() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.users.isAuthenticated
  );
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login());
    localStorage.setItem("isAuthenticated", "true");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isAuthenticated");
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

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

          <Box mt={4} display="flex" justifyContent="center" gap={2}>
            {!isAuthenticated ? (
              <Button variant="contained" color="primary" onClick={handleLogin}>
                {t("login")}
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
              >
                {t("logout")}
              </Button>
            )}
            <Button variant="text" onClick={toggleLanguage}>
              🌍 {i18n.language === "en" ? "AR" : "EN"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
