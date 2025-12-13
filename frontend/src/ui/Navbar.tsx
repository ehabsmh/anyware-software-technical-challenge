import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { navConfig } from "../config/navConfig";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../features/users/usersSlice";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width:1024px)");
  const userRole = useAppSelector((state) => state.user.role);
  const roleNavItems = navConfig[userRole] || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  const handleCollapse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      className="bg-gradient-to-b from-gradient-1 to-gradient-2 text-white h-screen"
    >
      <List>
        {roleNavItems.map((item, index) => (
          <Box key={item.to}>
            {"subLinks" in item ? (
              <>
                <ListItemButton onClick={() => handleCollapse(index)}>
                  <ListItemIcon sx={{ color: "white" }}>
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
                </ListItemButton>

                <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                  {item.subLinks?.map((subItem) => (
                    <NavLink
                      key={subItem.to}
                      to={subItem.to}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItemButton sx={{ pl: 4, py: 0.8 }}>
                        <ListItemIcon sx={{ color: "rgba(255,255,255,0.8)" }}>
                          <subItem.icon />
                        </ListItemIcon>
                        <ListItemText
                          primary={t(`navbar.${item.label}.${subItem.label}`)}
                        />
                      </ListItemButton>
                    </NavLink>
                  ))}
                </Collapse>
              </>
            ) : (
              <NavLink
                to={item.to}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      backgroundColor: isActive ? "#f0f0f0" : "transparent",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={t(`navbar.${item.label}`)}
                      sx={{
                        color: isActive ? "primary.main" : "white",
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                )}
              </NavLink>
            )}
          </Box>
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
        <nav className="bg-gradient-to-b from-gradient-1 to-gradient-2 h-screen w-52 text-white overflow-y-auto flex flex-col justify-between">
          <ul className="space-y-7 mt-4 flex flex-col justify-center">
            <li className="flex flex-col justify-center items-center text-3xl font-bold">
              <Link to={"/"} className="flex items-center gap-3">
                {t("logoName")}
              </Link>
            </li>

            <Box sx={{ bgcolor: "transparent", color: "white", width: "100%" }}>
              {roleNavItems.map((item, index) => (
                <Box key={item.to}>
                  {/* Main item */}
                  {"subLinks" in item ? (
                    <ListItemButton
                      onClick={() => handleCollapse(index)}
                      sx={{
                        py: 2,
                        "&:hover": {
                          backgroundColor: "rgba(232, 232, 232, 0.1)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "white", minWidth: "35px" }}>
                        <item.icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={t(`navbar.${item.label}.link`)}
                        primaryTypographyProps={{
                          fontSize: 15,
                          fontWeight: "medium",
                        }}
                      />
                      <KeyboardArrowDown
                        sx={{
                          transform:
                            openIndex === index
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          transition: "0.2s",
                        }}
                      />
                    </ListItemButton>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `group flex items-center py-4 duration-100 px-4
                  ${isActive ? "bg-white/30" : "hover:bg-white/15"}`
                      }
                    >
                      <ListItemIcon sx={{ color: "white", minWidth: "35px" }}>
                        <item.icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={t(`navbar.${item.label}.link`)}
                        primaryTypographyProps={{
                          fontSize: 15,
                          fontWeight: "medium",
                        }}
                      />
                    </NavLink>
                  )}

                  {"subLinks" in item && (
                    <Collapse
                      in={openIndex === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      {item.subLinks?.map((subItem) => (
                        <NavLink
                          key={subItem.to}
                          to={subItem.to}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <ListItemButton sx={{ pl: 3, py: 0.8 }}>
                            <ListItemIcon
                              sx={{ color: "rgba(255,255,255,0.8)" }}
                            >
                              <subItem.icon />
                            </ListItemIcon>
                            <ListItemText
                              primary={t(
                                `navbar.${item.label}.${subItem.label}`
                              )}
                              primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: "normal",
                              }}
                            />
                          </ListItemButton>
                        </NavLink>
                      ))}
                    </Collapse>
                  )}
                </Box>
              ))}
            </Box>
          </ul>
          <List
            sx={{ alignSelf: "center", mb: 4 }}
            onClick={async () => {
              // call logout
              await dispatch(logout());
              // navigate to login page
              navigate("/");
            }}
          >
            <ListItemButton sx={{ pl: 3, py: 0.8 }}>
              <ListItemIcon
                sx={{ color: "rgba(255,255,255,0.8)", fontSize: 28 }}
              >
                <BiLogOut />
              </ListItemIcon>
            </ListItemButton>
          </List>
        </nav>
      )}
    </>
  );
}

export default Navbar;
