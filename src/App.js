import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import UserDashboard from "./pages/UserDashboard";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/SignupPage";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("reports");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token && role ? { role } : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role && !user) {
      setUser({ role });
    }
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/user-dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/report" element={
          <ProtectedRoute>
            <ReportPage reports={reports} setReports={setReports} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;