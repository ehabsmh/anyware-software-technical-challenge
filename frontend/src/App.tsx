import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import Announcements from "./pages/Announcements";
import SolveQuiz from "./pages/SolveQuiz";
import { requireAuth } from "./features/hoc/requireAuth";
import Home from "./pages/Home";
import { useEffect } from "react";
import { me } from "./features/users/usersSlice";
import { useAppDispatch } from "./store/hooks";
import { Toaster } from "sonner";
import { requireGuest } from "./features/hoc/requireGuest";
import CreateCourse from "./pages/instructor/CreateCourse";
import Courses from "./pages/Courses";
import CreateAnnouncement from "./pages/instructor/CreateAnnouncement";
import AnnouncementsPage from "./pages/Announcements";
import CreateQuiz from "./pages/instructor/CreateQuiz";
import Quizzes from "./pages/instructor/Quizzes";
import EditQuestions from "./pages/instructor/EditQuestions";

function App() {
  const dispatch = useAppDispatch();

  const ProtectedAppLayout = requireAuth(AppLayout);
  const GuestLogin = requireGuest(Home);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<GuestLogin />} />

        <Route element={<ProtectedAppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="quizzes/:id" element={<SolveQuiz />} />
          <Route path="instructor/courses/create" element={<CreateCourse />} />
          <Route path="instructor/courses/my-courses" element={<Courses />} />
          <Route
            path="instructor/courses/edit/:id"
            element={<CreateCourse editMode={true} />}
          />
          <Route
            path="/instructor/announcements/create"
            element={<CreateAnnouncement />}
          />

          <Route
            path="/instructor/announcements/"
            element={<AnnouncementsPage />}
          />

          <Route
            path="instructor/announcements/edit/:id"
            element={<CreateAnnouncement editMode={true} />}
          />

          <Route path="/instructor/quizzes/create" element={<CreateQuiz />} />

          <Route path="/instructor/quizzes/manage" element={<Quizzes />} />

          <Route
            path="/instructor/quizzes/edit-questions/:id"
            element={<EditQuestions />}
          />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      <Toaster richColors={true} />
    </>
  );
}

export default App;
