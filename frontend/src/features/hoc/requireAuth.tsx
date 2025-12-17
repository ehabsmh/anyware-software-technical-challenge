import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { CircularProgress } from "@mui/material";

export const requireAuth = (Component: React.ComponentType) => {
  return function ProtectedRoute() {
    const { isAuthenticated, isLoadingUser } = useAppSelector((s) => s.user);

    if (isLoadingUser) {
      return (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress size={50} />
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <Component />;
  };
};
