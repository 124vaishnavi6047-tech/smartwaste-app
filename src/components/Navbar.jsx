import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav style={{
      backgroundColor: "#1D9E75",
      padding: "12px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(29,158,117,0.2)"
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "36px", height: "36px",
          backgroundColor: "white",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <span style={{ fontSize: "18px" }}>🗑️</span>
        </div>
        <span style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>SmartWaste</span>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "rgba(255,255,255,0.85)", fontWeight: "500" }}>Home</Link>

        {!user ? (
          <>
            <Link to="/login" style={{ textDecoration: "none", color: "rgba(255,255,255,0.85)", fontWeight: "500" }}>Login</Link>
            <Link to="/signup" style={{ textDecoration: "none", backgroundColor: "white", color: "#1D9E75", padding: "8px 18px", borderRadius: "8px", fontWeight: "600" }}>Signup</Link>
          </>
        ) : (
          <>
            {user.role === "admin" ? (
              <Link to="/dashboard" style={{ textDecoration: "none", backgroundColor: "white", color: "#1D9E75", padding: "8px 18px", borderRadius: "8px", fontWeight: "600" }}>Dashboard</Link>
            ) : (
              <>
                <Link to="/report" style={{ textDecoration: "none", backgroundColor: "white", color: "#1D9E75", padding: "8px 18px", borderRadius: "8px", fontWeight: "600" }}>Submit Report</Link>
                <Link to="/user-dashboard" style={{ textDecoration: "none", backgroundColor: "white", color: "#1D9E75", padding: "8px 18px", borderRadius: "8px", fontWeight: "600" }}>My Dashboard</Link>
              </>
            )}
            <button onClick={handleLogout} style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontWeight: "500", cursor: "pointer", fontSize: "14px",
              padding: "8px 16px", borderRadius: "8px"
            }}>
              → Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;