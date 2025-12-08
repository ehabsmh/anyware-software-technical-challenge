import Search from "./Search";
import { Avatar, Button, useMediaQuery } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import { useAppSelector } from "../store/hooks";
import { Language } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function Header() {
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
      <div className="flex items-center justify-between px-10">
        <h1 className="font-bold lg:text-2xl text-lg text-gray-500">
          {i18n.language === "en"
            ? `${t("header.welcome")}, ${firstName} ${lastName}`
            : `${firstName} ${lastName} ${t("header.welcome")}`}
        </h1>

        <div className="flex items-center gap-5 col-span-2 col-start-2 md:mr-10">
          <Button
            variant="text"
            className="text-gradient-2! font-bold!"
            onClick={toggleLanguage}
          >
            <Language className="text-gradient-2 mr-1" />
            {i18n.language}
          </Button>
          {!isMobile && <Search />}
          <NotificationsIcon
            fontSize="large"
            className="cursor-pointer text-gradient-2"
          />
          <EmailIcon
            fontSize="large"
            className="cursor-pointer text-gradient-2"
          />
          <Avatar alt={userName} src={avatar} />
        </div>
      </div>
    </header>
  );
}

export default Header;
