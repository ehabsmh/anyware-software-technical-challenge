import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div className="h-screen flex">
      <Navbar />
      <div className="flex-1">
        <Header />

        <main className="ml-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
