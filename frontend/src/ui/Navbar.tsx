import { Drawer, useMediaQuery } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import NavbarList from "./NavbarList";

function Navbar({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}) {
  const isMobile = useMediaQuery("(max-width:1024px)");
  const userRole = useAppSelector((state) => state.user.role);

  const { id } = useParams();
  const { pathname } = useLocation();

  const handleItemClick = () => {
    toggleDrawer(false);
  };

  const shouldRenderDrawer =
    isMobile ||
    pathname.includes(`/instructor/courses/my-courses/${id}`) ||
    pathname.includes(`/student/courses/${id}`);

  return (
    <>
      {shouldRenderDrawer ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={() => toggleDrawer(false)}
          variant="temporary"
        >
          <nav className="bg-linear-to-b from-gradient-1 to-gradient-2 h-screen w-64 text-white overflow-y-auto flex flex-col justify-between">
            <NavbarList onItemClick={handleItemClick} userRole={userRole} />
          </nav>
        </Drawer>
      ) : (
        <nav className="bg-linear-to-b from-gradient-1 to-gradient-2 h-screen w-52 text-white overflow-y-auto flex flex-col justify-between">
          <NavbarList onItemClick={handleItemClick} userRole={userRole} />
        </nav>
      )}
    </>
  );
}

export default Navbar;
