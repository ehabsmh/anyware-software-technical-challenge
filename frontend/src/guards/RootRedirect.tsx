import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

function RootRedirect() {
  const { isAuthenticated, role } = useAppSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated) {
    if (role === "instructor") {
      return <Navigate to="/instructor/courses/my-courses" replace />;
    }
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return <Navigate to="/unauthorized" replace />;
}

export default RootRedirect;
