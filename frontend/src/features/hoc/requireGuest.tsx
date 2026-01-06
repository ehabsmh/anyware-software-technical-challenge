import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { CircularProgress } from "@mui/material";

export const requireGuest = (Component: React.ComponentType) => {
  return function PublicRoute() {
    const { isAuthenticated, isLoadingUser, role } = useAppSelector(
      (s) => s.user
    );

    if (isLoadingUser) {
      return (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress size={50} />
        </div>
      );
    }

    if (isAuthenticated) {
      if (role === "instructor") {
        return <Navigate to={`/instructor/courses/my-courses`} />;
      }
      return <Navigate to={`/${role}/dashboard`} replace />;
    }

    return <Component />;
  };
};
