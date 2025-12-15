import Search from "./Search";
import { Avatar, Button, IconButton, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { Language } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";

function Header({
  toggleDrawer,
}: {
  toggleDrawer: (newOpen: boolean) => () => void;
}) {
  const { name: userName, avatar } = useAppSelector((state) => state.user);
  const [firstName, lastName] = [
    userName.split(" ")[0],
    userName.split(" ").at(-1),
  ];

  const isMobile = useMediaQuery("(max-width:1024px)");

  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <header className="w-full bg-white/60 py-5">
      <div className="flex items-center justify-between md:px-10 px-3">
        {isMobile && (
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        )}
        <h1 className="font-bold lg:text-2xl text-md text-gray-500">
          {i18n.language === "en"
            ? `${t("header.welcome")}, ${firstName} ${lastName}`
            : `${firstName} ${lastName} ${t("header.welcome")}`}
        </h1>

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
