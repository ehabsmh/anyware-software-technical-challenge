import Search from "./Search";
import { Avatar, Button, IconButton, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { Language } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useParams } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

function Header({
  toggleDrawer,
}: {
  toggleDrawer: (newOpen: boolean) => void;
}) {
  const { toggleLanguage } = useLanguage();
  const { name: userName, avatar } = useAppSelector((state) => state.user);
  const [firstName, lastName] = [
    userName.split(" ")[0],
    userName.split(" ").at(-1),
  ];
  const { id } = useParams();
  const { pathname } = useLocation();

  const isMobile = useMediaQuery("(max-width:1024px)");

  const { i18n, t } = useTranslation();

  return (
    <header className="w-full bg-white/60 py-5">
      <div className="flex items-center justify-between md:px-10 px-3">
        {isMobile ? (
          <div className="flex items-center gap-5">
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <h1 className="font-bold lg:text-2xl text-md text-gray-500">
              {t("header.welcome")}, {firstName} {lastName}
            </h1>
          </div>
        ) : pathname.includes(`/instructor/courses/my-courses/${id}`) ||
          pathname.includes(`/student/courses/${id}`) ? (
          <div className="flex items-center gap-5">
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <h1 className="font-bold lg:text-2xl text-md text-gray-500">
              {t("header.welcome")}, {firstName} {lastName}
            </h1>
          </div>
        ) : (
          <h1 className="font-bold lg:text-2xl text-md text-gray-500">
            {t("header.welcome")}, {firstName} {lastName}
          </h1>
        )}

        <div className="flex items-center gap-2 md:gap-5 col-span-2 col-start-2 md:mr-10">
          <Button
            variant="text"
            className="text-gradient-2! font-bold! "
            onClick={toggleLanguage}
          >
            <Language className="text-gradient-2 mr-1 text-sm! md:text-md!" />
            {i18n.language}
          </Button>
          {!isMobile && <Search />}
          {/* <NotificationsIcon
            fontSize="large"
            className="cursor-pointer text-gradient-2"
          />
          <EmailIcon
            fontSize="large"
            className="cursor-pointer text-gradient-2"
          /> */}
          <Avatar
            alt={userName}
            src={avatar}
            sx={{ width: isMobile ? 30 : 40, height: isMobile ? 30 : 40 }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
