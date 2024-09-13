import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import StickyHeader from "./components/StickyHeader";
import UserProfile from "./pages/dashboard/UserProfile";

function App() {
  return (
    <Router>
      <StickyHeader />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Ajoute d'autres routes ici */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
