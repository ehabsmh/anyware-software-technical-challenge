import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { Toaster } from "sonner";

function AppLayout() {
  return (
    <div className="h-screen flex">
      <Navbar />
      <div className="flex-1">
        <Header />

        <main className="lg:ml-3">
          <Outlet />
          <Toaster richColors={true} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
