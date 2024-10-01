import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Layout } from "../components/Layout/Layout";
import { useAuth } from "../hooks/useAuth";
import { Auth } from "../pages/Auth/Auth";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="/login" element={<Auth />} />
      ) : (
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      )}

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
};
