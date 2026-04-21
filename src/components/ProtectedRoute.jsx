import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

function ProtectedRoute({ children }) {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) return null;

  if (!user) return <Navigate to="/auth" replace />;

  return children;
}

export default ProtectedRoute;
