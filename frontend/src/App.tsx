import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import Announcements from "./pages/Announcements";
import SolveQuiz from "./pages/SolveQuiz";
import { requireAuth } from "./features/hoc/requireAuth";
import Home from "./pages/Home";

function App() {
  const ProtectedDashboard = requireAuth(Dashboard);
  const ProtectedAnnouncements = requireAuth(Announcements);
  const ProtectedSolveQuiz = requireAuth(SolveQuiz);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<ProtectedDashboard />} />
        <Route path="announcements" element={<ProtectedAnnouncements />} />
        <Route path="quizzes/:id" element={<ProtectedSolveQuiz />} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
