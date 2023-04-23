import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./context/authContext";
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user?.id)
        return children;
    return _jsx(Navigate, { to: "/", replace: true });
};
export default ProtectedRoute;
