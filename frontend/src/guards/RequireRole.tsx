import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

function RequireRole({ allowedRoles }: { allowedRoles: string[] }) {
  const { isAuthenticated, role } = useAppSelector((state) => state.user);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RequireRole;
