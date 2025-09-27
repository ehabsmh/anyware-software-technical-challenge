import { PiBellSimpleLight, PiInfoThin } from "react-icons/pi";
import Search from "./Search";
import { Avatar } from "@mui/material";

function Header() {
  return (
    <header className="w-full bg-white/60 py-5">
      <div className="flex items-center justify-between px-10">
        <h1 className="font-bold text-2xl text-gray-500">Welcome Talia,</h1>

        <div className="flex items-center gap-5 col-span-2 col-start-2 mr-10">
          <Search />
          <PiBellSimpleLight className="cursor-pointer text-[1.8rem]" />
          <PiInfoThin className="cursor-pointer text-[1.8rem]" />
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
      </div>
    </header>
  );
}

export default Header;
