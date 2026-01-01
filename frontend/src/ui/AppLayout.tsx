import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { Toaster } from "sonner";
import { useState } from "react";
import { Box } from "@mui/material";

function AppLayout() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => setOpen(newOpen);

  return (
    <div className="h-screen flex">
      <Navbar open={open} toggleDrawer={toggleDrawer} />
      <div className="flex-1">
        <Header toggleDrawer={toggleDrawer} />

        <main className="lg:ml-3">
          <Box className="overflow-y-auto md:p-8 p-3 h-[calc(100vh-86px)]">
            <Outlet />
          </Box>
          <Toaster richColors={true} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
