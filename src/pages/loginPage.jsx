import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const LoginPage = ({ setUser }) => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setUser({ name: email, role: data.role });
      if (data.role === "admin") navigate("/dashboard");
      else navigate("/report");
    } catch (err) {
      setError("Server se connect nahi ho pa raha");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "440px", boxShadow: "0 4px 20px rgba(29,158,117,0.15)" }}>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#1D9E75", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "22px" }}>🗑️</div>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "4px", color: "#085041" }}>Welcome Back</h2>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>Login to SmartWaste AI</p>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", backgroundColor: "#E1F5EE", borderRadius: "8px", marginBottom: "24px", padding: "4px" }}>
          <button onClick={() => setRole("user")} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: role === "user" ? "#1D9E75" : "transparent", color: role === "user" ? "white" : "#0F6E56", fontWeight: "500" }}>User</button>
          <button onClick={() => setRole("admin")} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: role === "admin" ? "#1D9E75" : "transparent", color: role === "admin" ? "white" : "#0F6E56", fontWeight: "500" }}>Admin</button>
        </div>

        {/* Email */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", color: "#085041", fontSize: "14px" }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #9FE1CB", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", color: "#085041", fontSize: "14px" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"
            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #9FE1CB", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
        </div>

        {error && <p style={{ color: "#dc2626", marginBottom: "12px", fontSize: "14px", backgroundColor: "#fef2f2", padding: "8px 12px", borderRadius: "8px" }}>{error}</p>}

        <button onClick={handleLogin} disabled={loading}
          style={{ width: "100%", padding: "12px", backgroundColor: "#1D9E75", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", fontWeight: "600" }}>
          {loading ? "Loading..." : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "16px", color: "#6b7280", fontSize: "14px" }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#1D9E75", fontWeight: "600", textDecoration: "none" }}>Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;