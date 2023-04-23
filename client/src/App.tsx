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
  return (
    <AuthProvider>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recovery" element={<RecoveryPassword />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/update"
            element={
              <ProtectedRoute>
                <UpdateUserInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/mentorships/:mentorship"
            element={
              <ProtectedRoute>
                <AccountMentorships />
              </ProtectedRoute>
            }
          />
          <Route
            path="/becomementor"
            element={
              <ProtectedRoute>
                <BecomeMentor />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/mentor/:mentorId" element={<Mentor />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
