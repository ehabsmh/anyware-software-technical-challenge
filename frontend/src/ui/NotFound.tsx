import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";

function NotFoundAnimation() {
  return (
    <motion.h1
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-linear-to-b from-gradient-2 via-cyan-800 to-gradient-1 text-transparent bg-clip-text inline-block text-[120px] font-extrabold leading-none tracking-tight text-secondary sm:text-[150px]"
    >
      404
    </motion.h1>
  );
}

export default function NotFound() {
  const { t } = useTranslation();
  const { role: userRole, isAuthenticated } = useAppSelector(
    (state) => state.user
  );
  let homePath = "/";

  if (isAuthenticated) {
    switch (userRole) {
      case "admin":
        homePath = "/admin/dashboard";
        break;
      case "instructor":
        homePath = "/instructor/dashboard";
        break;
      case "student":
        homePath = "/student/dashboard";
        break;
      default:
        homePath = "/";
    }
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-nav px-6 text-center">
      {/* Logo */}
      <div className="flex flex-col justify-center items-center text-2xl font-bold mb-5">
        <Typography
          variant="h1"
          component="h2"
          className="text-gradient-2 font-bold!"
        >
          {t("logoName")}
        </Typography>
      </div>

      {/* Animated 404 */}
      <NotFoundAnimation />

      {/* Subtitle */}
      <p className="mt-4 max-w-lg text-lg">{t("notfound.text")}</p>

      {/* Back to Home */}
      <Link
        to={homePath}
        className="mt-8 inline-block rounded-2xl bg-linear-to-l from-gradient-1 to-gradient-2 px-6 py-3 text-white font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl"
      >
        {t("notfound.backToHomeButtonText")}
      </Link>
    </div>
  );
}
