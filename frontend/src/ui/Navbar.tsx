import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
  ListItem,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { navConfig } from "../config/navConfig";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../features/users/usersSlice";
import { useTranslation } from "react-i18next";

function Navbar({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}) {
  const { t } = useTranslation();

  // const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width:1024px)");
  const userRole = useAppSelector((state) => state.user.role);
  const roleNavItems = navConfig[userRole] || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  const handleCollapse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      className="bg-linear-to-b from-gradient-1 to-gradient-2 text-white h-screen flex flex-col justify-between"
    >
      <List>
        <ListItem className="flex flex-col justify-center items-center text-2xl font-bold mb-5">
          <Link to={"/"} className="flex items-center gap-3">
            {t("logoName")}
          </Link>
        </ListItem>
        {roleNavItems.map((item, index) => (
          <ListItem disableGutters key={item.to}>
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
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      backgroundColor: isActive ? "#ffffff" : "transparent",
                      "&:hover": {
                        backgroundColor: isActive ? "#ffffff" : "transparent",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? "var(--color-gradient-1)" : "white",
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
          </ListItem>
        ))}
      </List>
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
          <ListItemIcon sx={{ color: "rgba(255,255,255,0.8)", fontSize: 28 }}>
            <BiLogOut />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      ) : (
        <nav className="bg-linear-to-b from-gradient-1 to-gradient-2 h-screen w-52 text-white overflow-y-auto flex flex-col justify-between">
          <List className="space-y-7 mt-4 flex flex-col justify-center">
            <ListItem className="flex flex-col justify-center items-center text-3xl font-bold">
              <Link to={"/"} className="flex items-center gap-3">
                {t("logoName")}
              </Link>
            </ListItem>

            <Box sx={{ bgcolor: "transparent", color: "white", width: "100%" }}>
              {roleNavItems.map((item, index) => (
                <List key={item.to} sx={{ mb: 2 }}>
                  {/* Main item */}
                  {"subLinks" in item ? (
                    <ListItem
                      onClick={() => handleCollapse(index)}
                      sx={{
                        py: 2,
                        "&:hover": {
                          backgroundColor: "rgba(232, 232, 232, 0.1)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
                        <item.icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={t(`navbar.${item.label}.link`)}
                        slotProps={{
                          primary: {
                            fontSize: 12,
                            fontWeight: "medium",
                          },
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
                    </ListItem>
                  ) : (
                    <NavLink
                      to={item.to}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {({ isActive }) => (
                        <ListItem
                          sx={{
                            backgroundColor: isActive
                              ? "#ffffff"
                              : "transparent",
                            "&:hover": {
                              backgroundColor: isActive
                                ? "#ffffff"
                                : "#ffffff31",
                            },
                            gap: 2,
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
                            <item.icon />
                          </ListItemIcon>
                          <ListItemText
                            primary={t(`navbar.${item.label}.link`)}
                            sx={{
                              color: isActive
                                ? "var(--color-gradient-1)"
                                : "white",
                              fontWeight: isActive ? "bold" : "normal",
                            }}
                          />
                        </ListItem>
                      )}
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
                </List>
              ))}
            </Box>
          </List>
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
