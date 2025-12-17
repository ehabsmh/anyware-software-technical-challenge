import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { Toaster } from "sonner";
import { useState } from "react";

function AppLayout() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => setOpen(newOpen);

  return (
    <div className="h-screen flex">
      <Navbar open={open} toggleDrawer={toggleDrawer} />
      <div className="flex-1">
        <Header toggleDrawer={toggleDrawer} />

        <main className="lg:ml-3">
          <Outlet />
          <Toaster richColors={true} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
