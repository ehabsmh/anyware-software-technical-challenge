import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export const requireGuest = (Component: React.ComponentType) => {
  return function PublicRoute() {
    const { isAuthenticated, isLoadingUser } = useAppSelector((s) => s.user);

    if (isLoadingUser) {
      return (
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      );
    }

    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

    return <Component />;
  };
};
