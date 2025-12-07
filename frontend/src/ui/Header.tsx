import Search from "./Search";
import { Avatar, useMediaQuery } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import { useAppSelector } from "../store/hooks";

function Header() {
  const userName = useAppSelector((state) => state.user.name);
  const [firstName, lastName] = [
    userName.split(" ")[0],
    userName.split(" ").at(-1),
  ];

  const isMobile = useMediaQuery("(max-width:1024px)");
  return (
    <header className="w-full bg-white/60 py-5">
      <div className="flex items-center justify-between px-10">
        <h1 className="font-bold lg:text-2xl text-lg text-gray-500">
          Welcome, {firstName} {lastName}
        </h1>

        <div className="flex items-center gap-5 col-span-2 col-start-2 md:mr-10">
          {!isMobile && <Search />}
          <NotificationsIcon
            fontSize="large"
            className="cursor-pointer text-gradient-2"
          />
          <EmailIcon
            fontSize="large"
            className="cursor-pointer text-gradient-2"
          />
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
      </div>
    </header>
  );
}

export default Header;
