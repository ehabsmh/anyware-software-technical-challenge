import { useState } from "react";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";
import { navConfig } from "../config/navConfig";

const navItems = navConfig.admin;

function AdminNavItems() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Box sx={{ bgcolor: "transparent", color: "white", width: "100%" }}>
        {navItems.map((item, index) => (
          <Box key={item.to}>
            {/* Main item */}
            {item.subLinks ? (
              <ListItemButton
                onClick={() => handleClick(index)}
                sx={{
                  py: 2,
                  "&:hover": { backgroundColor: "rgba(232, 232, 232, 0.1)" },
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: "35px" }}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                  }}
                />
                <KeyboardArrowDown
                  sx={{
                    transform:
                      openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.2s",
                  }}
                />
              </ListItemButton>
            ) : (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center py-4 duration-100 px-4
                  ${isActive ? "bg-white" : "hover:bg-white/10"}`
                }
              >
                <ListItemIcon sx={{ color: "white", minWidth: "35px" }}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                  }}
                />
              </NavLink>
            )}

            {/* ✅ Sub Links appear directly under the active item */}
            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              {item.subLinks?.map((subItem) => (
                <NavLink
                  key={subItem.to}
                  to={subItem.to}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton sx={{ pl: 3, py: 0.8 }}>
                    <ListItemIcon sx={{ color: "rgba(255,255,255,0.8)" }}>
                      <subItem.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={subItem.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "normal",
                      }}
                    />
                  </ListItemButton>
                </NavLink>
              ))}
            </Collapse>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default AdminNavItems;
