import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../features/users/usersSlice";
import { useTranslation } from "react-i18next";
import type { IUser } from "../interfaces/user";
import { navConfig } from "../config/navConfig";

const itemStyles = {
  main: {
    py: 1.2,
    px: 2,
    borderRadius: 1,
    gap: 1.5,
  },
  sub: {
    py: 0.6,
    pl: 4,
    gap: 1.5,
    borderRadius: 1,
  },
};

function NavbarList({
  onItemClick,
  userRole,
}: {
  onItemClick: () => void;
  userRole: IUser["role"];
}) {
  const { t } = useTranslation();

  const roleItems = navConfig[userRole] || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCollapse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  async function handleLogout() {
    await dispatch(logout());
    navigate("/");
  }

  return (
    <>
      <List className="mt-4 flex flex-col gap-6">
        <ListItem className="flex flex-col justify-center items-center text-3xl font-bold">
          <Link to={"/"} className="flex items-center gap-3">
            {t("logoName")}
          </Link>
        </ListItem>

        {roleItems.map((item, index) => (
          <div key={item.to}>
            {/* Main item */}
            {"subLinks" in item ? (
              <ListItem
                onClick={() => handleCollapse(index)}
                sx={{
                  gap: 2,
                  mb: 0,
                  backgroundColor:
                    openIndex === index ? "#ffffff2c" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(232, 232, 232, 0.1)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={t(`navbar.${item.label}.link`)} />
                <KeyboardArrowDown
                  sx={{
                    transform:
                      openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.2s",
                  }}
                />
              </ListItem>
            ) : (
              <NavLink
                role="listitem"
                to={item.to}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={onItemClick}
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      ...itemStyles.main,
                      backgroundColor: isActive ? "#ffffff" : "transparent",
                      "&:hover": {
                        backgroundColor: isActive ? "#ffffff" : "#ffffff31",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? "var(--color-gradient-1)" : "white",
                        minWidth: "auto",
                      }}
                    >
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={t(`navbar.${item.label}.link`)}
                      sx={{
                        color: isActive ? "var(--color-gradient-1)" : "white",
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                )}
              </NavLink>
            )}

            {"subLinks" in item && (
              <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ mt: 0.5 }}>
                  {item.subLinks?.map((subItem) => (
                    <NavLink
                      role="listitem"
                      key={subItem.to}
                      to={subItem.to}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={onItemClick}
                    >
                      {({ isActive }) => (
                        <ListItemButton
                          sx={{
                            ...itemStyles.sub,
                            backgroundColor: isActive
                              ? "#ffffff"
                              : "transparent",
                            "&:hover": {
                              backgroundColor: isActive
                                ? "#ffffff"
                                : "#ffffff31",
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: isActive
                                ? "var(--color-gradient-1)"
                                : "white",
                              minWidth: "auto",
                            }}
                          >
                            <subItem.icon />
                          </ListItemIcon>
                          <ListItemText
                            primary={t(`navbar.${item.label}.${subItem.label}`)}
                            sx={{
                              color: isActive
                                ? "var(--color-gradient-1)"
                                : "white",
                              fontWeight: isActive ? "bold" : "normal",
                            }}
                          />
                        </ListItemButton>
                      )}
                    </NavLink>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
      <List sx={{ alignSelf: "center", mb: 4 }} onClick={handleLogout}>
        <ListItemButton sx={{ pl: 3, py: 0.8 }}>
          <ListItemIcon sx={{ color: "rgba(255,255,255,0.8)", fontSize: 28 }}>
            <BiLogOut />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </>
  );
}

export default NavbarList;
