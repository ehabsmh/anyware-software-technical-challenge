import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { RootState } from "../../store/store";

export function requireAuth<T extends object>(
  Component: React.ComponentType<T>
) {
  return function AuthenticatedComponent(props: T) {
    const isAuthenticated = useSelector(
      (state: RootState) => state.users.isAuthenticated
    );

    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
