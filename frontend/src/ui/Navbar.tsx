import { useState } from "react";
import { BiChart, BiHome } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";
import { GrAnnounce, GrSchedule } from "react-icons/gr";
import { LuLetterText } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:1024px)");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: BiHome },
    { to: "schedule", label: "Schedule", icon: GrSchedule },
    { to: "courses", label: "Courses", icon: LuLetterText },
    { to: "gradebook", label: "GradeBook", icon: GiGraduateCap },
    { to: "performance", label: "Performance", icon: BiChart },
    { to: "announcements", label: "Announcement", icon: GrAnnounce },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className="bg-gradient-to-b from-gradient-1 to-gradient-2 shadow-[0_20px_10px_rgba(0,0,0,0.2)] h-screen"
    >
      <List>
        {navItems.map(({ to, label, icon: Icon }) => (
          <ListItem key={to} disablePadding>
            <NavLink
              to={to}
              style={{
                width: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    backgroundColor: isActive ? "#f0f0f0" : "transparent",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <ListItemIcon>
                    <Icon
                      size={22}
                      className={
                        isActive
                          ? "text-gradient-1"
                          : "group-hover:text-gradient-1 text-white"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{
                      color: isActive ? "primary.main" : "white",
                      fontWeight: isActive ? "bold" : "normal",
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{ position: "absolute", top: 15, left: 0, color: "black" }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </>
      ) : (
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
                        isActive
                          ? "text-gradient-1"
                          : "group-hover:text-gradient-1"
                      }`}
                    />
                    <span
                      className={`${
                        isActive
                          ? "text-gradient-2"
                          : "group-hover:text-gradient-2"
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
      )}
    </>
  );
}

export default Navbar;
