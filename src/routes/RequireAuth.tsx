import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RequireAuthProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
  const { user } = useAuth();
  const location = useLocation();

  return user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    children
  ) : user ? (
    <>Você não possui autorização para acessar esta página</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
