import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const DashboardPage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/reports/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) setError(data.error || "Reports load nahi hue");
      else setReports(data);
    } catch (err) {
      setError("Server se connect nahi ho pa raha");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "admin") {
      navigate("/report");
      return;
    }
    fetchReports();
  }, [navigate, role, token]);

  // CN Concept: HTTP PATCH - Status Update
  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/reports/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      // Update local state
      setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (err) {
      alert("Status update nahi hua");
    }
    setUpdating(null);
  };

  const total = reports.length;
  const high = reports.filter(r => r.severity === "high").length;
  const medium = reports.filter(r => r.severity === "medium").length;
  const low = reports.filter(r => r.severity === "low").length;
  const resolved = reports.filter(r => r.status === "resolved").length;

  const getStatusColor = (status) => {
    if (status === "resolved") return { bg: "#E1F5EE", color: "#1D9E75" };
    if (status === "in-progress") return { bg: "#fffbeb", color: "#d97706" };
    return { bg: "#f3f4f6", color: "#6b7280" };
  };

  return (
    <div style={{ backgroundColor: "#f0fdf9", minHeight: "100vh", padding: "32px" }}>

      {/* Header */}
      <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "4px", color: "#085041" }}>Admin Dashboard</h1>
          <p style={{ color: "#0F6E56", margin: 0 }}>Priority-based waste report management</p>
        </div>
        <button onClick={fetchReports} style={{ backgroundColor: "#1D9E75", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "500" }}>
          🔄 Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "Total Reports", value: total, color: "#1D9E75", border: "#1D9E75" },
          { label: "High Priority", value: high, color: "#dc2626", border: "#dc2626" },
          { label: "Medium Priority", value: medium, color: "#d97706", border: "#d97706" },
          { label: "Low Priority", value: low, color: "#1D9E75", border: "#9FE1CB" },
          { label: "Resolved", value: resolved, color: "#085041", border: "#085041" },
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", borderLeft: `4px solid ${card.border}`, boxShadow: "0 2px 8px rgba(29,158,117,0.08)" }}>
            <p style={{ color: "#6b7280", fontSize: "12px", margin: "0 0 4px" }}>{card.label}</p>
            <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Priority Legend */}
      <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "16px 24px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "24px", boxShadow: "0 2px 8px rgba(29,158,117,0.08)" }}>
        <span style={{ color: "#085041", fontWeight: "600", fontSize: "14px" }}>🔢 OS Priority Scheduling:</span>
        <span style={{ backgroundColor: "#fef2f2", color: "#dc2626", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>HIGH — First</span>
        <span style={{ backgroundColor: "#fffbeb", color: "#d97706", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>MEDIUM — Second</span>
        <span style={{ backgroundColor: "#E1F5EE", color: "#1D9E75", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>LOW — Last</span>
      </div>

      {/* Reports Table */}
      <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(29,158,117,0.08)" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px", color: "#085041" }}>All Reports — Priority Order</h2>
          <p style={{ color: "#0F6E56", fontSize: "14px", margin: 0 }}>High severity reports appear first</p>
        </div>

        {loading && <p style={{ color: "#0F6E56" }}>Loading...</p>}
        {error && <p style={{ color: "#dc2626", backgroundColor: "#fef2f2", padding: "8px 12px", borderRadius: "8px" }}>{error}</p>}

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#E1F5EE" }}>
              {["ID", "User", "Location", "Waste Type", "Priority", "Status", "Action"].map((h, i) => (
                <th key={i} style={{ textAlign: "left", padding: "12px 16px", color: "#085041", fontWeight: "600", fontSize: "13px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && !loading ? (
              <tr><td colSpan="7" style={{ textAlign: "center", padding: "32px", color: "#0F6E56" }}>No reports found</td></tr>
            ) : (
              reports.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #E1F5EE" }}>
                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#085041", fontWeight: "500" }}>REP-{String(r.id).padStart(3, "0")}</td>
                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>
                    <div>{r.name || "User"}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>{r.email}</div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>{r.location}</td>
                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>{r.waste_type}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                      backgroundColor: r.severity === "high" ? "#fef2f2" : r.severity === "medium" ? "#fffbeb" : "#E1F5EE",
                      color: r.severity === "high" ? "#dc2626" : r.severity === "medium" ? "#d97706" : "#1D9E75"
                    }}>
                      {r.severity?.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", backgroundColor: getStatusColor(r.status).bg, color: getStatusColor(r.status).color }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <select
                      value={r.status}
                      disabled={updating === r.id}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      style={{ padding: "6px 10px", borderRadius: "8px", border: "1.5px solid #9FE1CB", fontSize: "13px", color: "#085041", cursor: "pointer", outline: "none" }}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;