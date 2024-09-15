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

function App() {
  return (
    <Router>
      <StickyHeader />
      <main className="pt-16">
        <ContextProvider>
          <Routes>
            {/* <Route element={<PrivateRoute />}> */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* </Route> */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Ajoute d'autres routes ici */}
          </Routes>
        </ContextProvider>
      </main>
    </Router>
  );
}

export default App;
