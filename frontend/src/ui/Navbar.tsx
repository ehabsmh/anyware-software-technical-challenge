import { BiChart, BiHome } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";
import { GrAnnounce, GrSchedule } from "react-icons/gr";
import { LuLetterText } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: BiHome },
    { to: "schedule", label: "Schedule", icon: GrSchedule },
    { to: "courses", label: "Courses", icon: LuLetterText },
    { to: "gradebook", label: "GradeBook", icon: GiGraduateCap },
    { to: "performance", label: "Performance", icon: BiChart },
    { to: "announcements", label: "Announcement", icon: GrAnnounce },
  ];

  return (
    <nav className="bg-gradient-to-b from-gradient-1 to-gradient-2 shadow-[0_20px_10px_rgba(0,0,0,0.2)] h-screen w-52 text-white">
      <ul className="space-y-7 mt-4 flex flex-col justify-center">
        <li className="flex flex-col justify-center items-center text-3xl font-bold">
          <Link to={"/"} className="flex items-center gap-3">
            Coligo
          </Link>
        </li>

        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-4 py-4 duration-100 
              ${isActive ? "bg-white" : "hover:bg-white"}`
            }
          >
            {({ isActive }) => (
              <div className="flex items-center gap-4 px-6 w-full">
                <Icon
                  className={`text-[1.6rem] ${
                    isActive ? "text-gradient-1" : "group-hover:text-gradient-1"
                  }`}
                />
                <span
                  className={`${
                    isActive ? "text-gradient-2" : "group-hover:text-gradient-2"
                  }`}
                >
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
