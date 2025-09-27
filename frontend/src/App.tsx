import { Route, Routes } from "react-router";
// import requireAuth from "./requireAuth";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import Announcements from "./pages/Announcements";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="announcements" element={<Announcements />} />
      </Route>
    </Routes>
  );
}

export default App;
