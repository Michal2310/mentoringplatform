import { useContext, ReactNode } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./context/authContext";
type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  if (user?.id) return children;
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
