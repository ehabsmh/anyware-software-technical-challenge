import { Route, Routes } from "react-router";
// import requireAuth from "./requireAuth";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import Announcements from "./pages/Announcements";
import SolveQuiz from "./pages/SolveQuiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="quizzes">
          <Route path=":id" element={<SolveQuiz />} />
        </Route>
      </Route>
      <Route path="*" element={<div>404 Not Found</div>}></Route>
    </Routes>
  );
}

export default App;
