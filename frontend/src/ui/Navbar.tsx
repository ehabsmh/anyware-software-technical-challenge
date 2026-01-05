import { Drawer, useMediaQuery } from "@mui/material";
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

  const handleItemClick = () => {
    toggleDrawer(false);
  };

  const shouldRenderDrawer = isMobile;

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
        <nav className="bg-linear-to-b from-gradient-1 to-gradient-2 h-screen  text-white overflow-y-auto flex flex-col justify-between">
          <NavbarList onItemClick={handleItemClick} userRole={userRole} />
        </nav>
      )}
    </>
  );
}

export default Navbar;
