import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Logout from "./components/Logout/Logout";
import AuthProvider from "./context/authContext";
import Mentor from "./pages/Mentor/Mentor";
import ProtectedRoute from "./ProtectedRoute";
import UpdateUserInfo from "./pages/ChangeInfo/UpdateUserInfo";
import AccountMentorships from "./pages/AccountMentorships/AccountMentorships";
import BecomeMentor from "./pages/BecomeMentor/BecomeMentor";
import RecoveryPassword from "./pages/RecoveryPassword/RecoveryPassword";
const queryClient = new QueryClient();
function App() {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs(AuthProvider, { children: [_jsx(Navbar, { isOpen: isOpen, setIsOpen: setIsOpen }), _jsx(QueryClientProvider, { client: queryClient, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/recovery", element: _jsx(RecoveryPassword, {}) }), _jsx(Route, { path: "/account", element: _jsx(ProtectedRoute, { children: _jsx(Account, {}) }) }), _jsx(Route, { path: "/account/update", element: _jsx(ProtectedRoute, { children: _jsx(UpdateUserInfo, {}) }) }), _jsx(Route, { path: "/account/mentorships/:mentorship", element: _jsx(ProtectedRoute, { children: _jsx(AccountMentorships, {}) }) }), _jsx(Route, { path: "/becomementor", element: _jsx(ProtectedRoute, { children: _jsx(BecomeMentor, {}) }) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/logout", element: _jsx(Logout, {}) }), _jsx(Route, { path: "/mentor/:mentorId", element: _jsx(Mentor, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) })] }));
}
export default App;
