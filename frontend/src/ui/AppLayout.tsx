import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { Toaster } from "sonner";
import { useState } from "react";

function AppLayout() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => setOpen(newOpen);

  return (
    <div className="h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <Navbar open={open} toggleDrawer={toggleDrawer} />

      <div className="h-screen grid grid-rows-[90px_1fr]">
        <Header toggleDrawer={toggleDrawer} />
        <main className="p-4 overflow-y-auto">
          <Outlet />
          <Toaster richColors />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
