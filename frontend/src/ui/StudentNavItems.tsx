import { BiChart, BiHome } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";
import { GrAnnounce, GrSchedule } from "react-icons/gr";
import { LuLetterText } from "react-icons/lu";
import { NavLink } from "react-router-dom";

function StudentNavItems() {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: BiHome },
    { to: "schedule", label: "Schedule", icon: GrSchedule },
    { to: "courses", label: "Courses", icon: LuLetterText },
    { to: "gradebook", label: "GradeBook", icon: GiGraduateCap },
    { to: "performance", label: "Performance", icon: BiChart },
    { to: "announcements", label: "Announcement", icon: GrAnnounce },
  ];

  return (
    <>
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
    </>
  );
}

export default StudentNavItems;
