import { Route, Routes } from "react-router";
// import requireAuth from "./requireAuth";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
