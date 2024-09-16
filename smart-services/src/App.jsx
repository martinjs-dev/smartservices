// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import StickyHeader from "./components/StickyHeader";
import UserProfile from "./pages/dashboard/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import { ContextProvider } from "./context/MusicContext";
import AuthCallback from "./components/AuthCallback";
import useAuth from "./hooks/useAuth";
import Logout from "./pages/auth/Logout";
import HomePage from "./pages/public/HomePage";
import CheckEmail from "./pages/auth/VerifyEmail";
import EmailVerification from "./pages/auth/EmailVerification";

function App() {
  const  isAuthenticated  = useAuth();

  return (
    <Router>
      {isAuthenticated && <StickyHeader />}
      <main className="pt-16">
        <ContextProvider>
        <Routes>
          <Route>
            {/* <Route element={<PrivateRoute />}> */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/verify" element={<EmailVerification />} />
        </Routes>
        </ContextProvider>
      </main>
    </Router>
  );
}

export default App;
