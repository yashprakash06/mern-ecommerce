import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute() {
  const { user } = useAuth();

  // Normalize user shape
  const currentUser = user?.user || user;

  // Allow only admin users
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default AdminRoute;