import { Route, Routes } from "react-router";
import Dashboard from "./pages/student/Dashboard";
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
import Courses from "./pages/Courses";
import CreateAnnouncement from "./pages/instructor/CreateAnnouncement";
import AnnouncementsPage from "./pages/Announcements";
import CreateQuiz from "./pages/instructor/CreateQuiz";
import Quizzes from "./pages/instructor/Quizzes";
import EditQuestions from "./pages/instructor/EditQuestions";
import SubmittedQuizzes from "./pages/student/SubmittedQuizzes";
import QuizSubmissions from "./pages/instructor/QuizSubmissions";
import Course from "./pages/Course";
import CreateCourseLesson from "./pages/instructor/CreateCourseLesson";
import RequireRole from "./guards/RequireRole";
import Unauthorized from "./ui/Unauthorized";
import NotFound from "./ui/NotFound";
import i18n from "./i18n";
import DirectionProvider from "./DirectionProvider";
import useLanguage from "./hooks/useLanguage";
import RootRedirect from "./guards/RootRedirect";
import CreateCourse from "./pages/instructor/CreateCourse";
import EditCourse from "./pages/instructor/EditCourse";

function App() {
  const { language } = useLanguage();

  const dispatch = useAppDispatch();

  const ProtectedAppLayout = requireAuth(AppLayout);
  const GuestLogin = requireGuest(Home);

  useEffect(() => {
    dispatch(me());
    i18n.changeLanguage(language);
  }, [dispatch, language]);

  return (
    <>
      <DirectionProvider language={language}>
        <Routes>
          <Route path="/login" element={<GuestLogin />} />

          <Route path="/" element={<RootRedirect />} />

          <Route element={<ProtectedAppLayout />}>
            {/* students only */}
            <Route element={<RequireRole allowedRoles={["student"]} />}>
              <Route path="/student/dashboard" element={<Dashboard />} />
              <Route
                path="/student/announcements"
                element={<Announcements />}
              />
              <Route
                path="/student/submitted-quizzes"
                element={<SubmittedQuizzes />}
              />
              <Route
                path="/student/submitted-quizzes/:id"
                element={<SolveQuiz review={true} />}
              />
              <Route
                path="/student/quizzes/solve/:id"
                element={<SolveQuiz />}
              />
              <Route path="/student/courses/" element={<Courses />} />
              <Route path="/student/courses/:id" element={<Course />} />
            </Route>

            {/* instructors only */}
            <Route element={<RequireRole allowedRoles={["instructor"]} />}>
              <Route path="/instructor/dashboard" element={<Dashboard />} />
              <Route
                path="instructor/courses/create"
                element={<CreateCourse />}
              />
              <Route
                path="instructor/courses/edit/:id"
                element={<EditCourse />}
              />
              <Route
                path="instructor/courses/my-courses"
                element={<Courses />}
              />
              <Route
                path="instructor/courses/my-courses/:id"
                element={<Course />}
              />
              <Route
                path="/instructor/courses/:courseId/add-lesson"
                element={<CreateCourseLesson />}
              />
              <Route
                path="/instructor/courses/:courseId/edit-lesson/:lessonId"
                element={<CreateCourseLesson editMode={true} />}
              />
              <Route
                path="/instructor/announcements/create"
                element={<CreateAnnouncement />}
              />

              <Route
                path="/instructor/announcements/view"
                element={<AnnouncementsPage />}
              />

              <Route
                path="instructor/announcements/edit/:id"
                element={<CreateAnnouncement editMode={true} />}
              />

              <Route
                path="/instructor/quizzes/create"
                element={<CreateQuiz />}
              />

              <Route path="/instructor/quizzes/manage" element={<Quizzes />} />

              <Route
                path="/instructor/quizzes/:id/submissions"
                element={<QuizSubmissions />}
              />

              <Route
                path="/instructor/quizzes/edit-questions/:id"
                element={<EditQuestions />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </DirectionProvider>

      <Toaster richColors={true} />
    </>
  );
}

export default App;
