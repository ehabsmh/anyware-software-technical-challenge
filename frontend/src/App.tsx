import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";

import { useAppDispatch } from "./store/hooks";
import { me } from "./features/users/usersSlice";
import i18n from "./i18n";
import DirectionProvider from "./DirectionProvider";
import useLanguage from "./hooks/useLanguage";

// HOCs
import { requireAuth } from "./features/hoc/requireAuth";
import { requireGuest } from "./features/hoc/requireGuest";

// Guards
import RequireRole from "./guards/RequireRole";
import RootRedirect from "./guards/RootRedirect";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/student/Dashboard"));
const Announcements = lazy(() => import("./pages/Announcements"));
const SolveQuiz = lazy(() => import("./pages/SolveQuiz"));
const Courses = lazy(() => import("./pages/Courses"));
const Course = lazy(() => import("./pages/Course"));
const SubmittedQuizzes = lazy(() => import("./pages/student/SubmittedQuizzes"));
const QuizSubmissions = lazy(
  () => import("./pages/instructor/QuizSubmissions")
);

const CreateCourse = lazy(() => import("./pages/instructor/CreateCourse"));
const EditCourse = lazy(() => import("./pages/instructor/EditCourse"));
const CreateCourseLesson = lazy(
  () => import("./pages/instructor/CreateCourseLesson")
);
const CreateAnnouncement = lazy(
  () => import("./pages/instructor/CreateAnnouncement")
);
const AnnouncementsPage = lazy(() => import("./pages/Announcements"));
const CreateQuiz = lazy(() => import("./pages/instructor/CreateQuiz"));
const Quizzes = lazy(() => import("./pages/instructor/Quizzes"));
const EditQuestions = lazy(() => import("./pages/instructor/EditQuestions"));
const EditAnnouncement = lazy(
  () => import("./pages/instructor/EditAnnouncement")
);

const AppLayout = lazy(() => import("./ui/AppLayout"));
const Unauthorized = lazy(() => import("./ui/Unauthorized"));
const NotFound = lazy(() => import("./ui/NotFound"));

function App() {
  const { language } = useLanguage();
  const dispatch = useAppDispatch();

  const ProtectedAppLayout = requireAuth(AppLayout);
  const GuestLogin = requireGuest(Home);

  useEffect(() => {
    dispatch(me());
    i18n.changeLanguage(language);
  }, [dispatch, language]);

  const fallback = <div>Loading...</div>;

  return (
    <DirectionProvider language={language}>
      <Suspense fallback={fallback}>
        <Routes>
          {/* Public / Guest */}
          <Route path="/login" element={<GuestLogin />} />
          <Route path="/" element={<RootRedirect />} />

          {/* Protected Routes */}
          <Route element={<ProtectedAppLayout />}>
            {/* Students */}
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
                element={<SolveQuiz review />}
              />
              <Route
                path="/student/quizzes/solve/:id"
                element={<SolveQuiz />}
              />
              <Route path="/student/courses" element={<Courses />} />
              <Route path="/student/courses/:id" element={<Course />} />
            </Route>

            {/* Instructors */}
            <Route element={<RequireRole allowedRoles={["instructor"]} />}>
              <Route
                path="/instructor/courses/create"
                element={<CreateCourse />}
              />
              <Route
                path="/instructor/courses/edit/:id"
                element={<EditCourse />}
              />
              <Route
                path="/instructor/courses/my-courses"
                element={<Courses />}
              />
              <Route
                path="/instructor/courses/my-courses/:id"
                element={<Course />}
              />
              <Route
                path="/instructor/courses/:courseId/add-lesson"
                element={<CreateCourseLesson />}
              />
              <Route
                path="/instructor/courses/:courseId/edit-lesson/:lessonId"
                element={<CreateCourseLesson editMode />}
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
                path="/instructor/announcements/edit/:id"
                element={<EditAnnouncement />}
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
                path="/instructor/quizzes/:quizId/submissions/:id"
                element={<SolveQuiz review />}
              />
              <Route
                path="/instructor/quizzes/edit-questions/:id"
                element={<EditQuestions />}
              />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Suspense>

      <Toaster richColors />
    </DirectionProvider>
  );
}

export default App;
