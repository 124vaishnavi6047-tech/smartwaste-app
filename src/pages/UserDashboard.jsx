import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const UserDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "user") {
      navigate("/dashboard");
      return;
    }

    const fetchReports = async () => {
      try {
        const response = await fetch(`${API_URL}/reports/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.error || "Unable to load your reports");
        } else {
          setReports(data);
        }
      } catch (err) {
        setError("Server se connect nahi ho pa raha");
      }
      setLoading(false);
    };

    fetchReports();
  }, [navigate, role, token]);

  const total = reports.length;
  const high = reports.filter((report) => report.severity === "high").length;
  const resolved = reports.filter((report) => report.status === "resolved").length;

  const getSeverityStyle = (severity) => {
    if (severity === "high") return { backgroundColor: "#fee2e2", color: "#b91c1c" };
    if (severity === "medium") return { backgroundColor: "#fef3c7", color: "#b45309" };
    return { backgroundColor: "#E1F5EE", color: "#1D9E75" };
  };

  const getStatusStyle = (status) => {
    if (status === "resolved") return { backgroundColor: "#E1F5EE", color: "#1D9E75" };
    if (status === "in-progress") return { backgroundColor: "#fffbeb", color: "#b45309" };
    return { backgroundColor: "#f3f4f6", color: "#6b7280" };
  };

  const getSubmittedDate = (report) => {
    const value = report.createdAt || report.created_at || report.submittedAt || report.submitted_at || report.date;
    if (!value) return "N/A";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div style={{ backgroundColor: "#E1F5EE", minHeight: "100vh", padding: "32px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px", color: "#085041" }}>My Dashboard</h1>
        <p style={{ color: "#0F6E56", fontSize: "16px", margin: 0 }}>Review your submitted reports and track status updates.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "Total Reports", value: total, border: "#1D9E75" },
          { label: "High Severity", value: high, border: "#dc2626" },
          { label: "Resolved", value: resolved, border: "#1D9E75" },
        ].map((card) => (
          <div key={card.label} style={{ backgroundColor: "white", padding: "20px", borderRadius: "16px", borderLeft: `4px solid ${card.border}`, boxShadow: "0 8px 24px rgba(13, 83, 62, 0.08)" }}>
            <p style={{ margin: 0, color: "#0F6E56", fontSize: "14px", fontWeight: "600" }}>{card.label}</p>
            <p style={{ margin: "12px 0 0", fontSize: "32px", fontWeight: "700", color: "#085041" }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 8px 24px rgba(13, 83, 62, 0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#085041" }}>Submitted Reports</h2>
            <p style={{ margin: "8px 0 0", color: "#0F6E56" }}>Your report history is fetched from the API.</p>
          </div>
          <div style={{ padding: "8px 14px", borderRadius: "999px", backgroundColor: "#E1F5EE", color: "#085041", fontWeight: "600" }}>
            {loading ? "Loading..." : `${reports.length} report${reports.length === 1 ? "" : "s"}`}
          </div>
        </div>

        {error && <p style={{ color: "#dc2626", backgroundColor: "#fee2e2", padding: "12px 16px", borderRadius: "12px" }}>{error}</p>}

        {loading ? (
          <p style={{ color: "#0F6E56" }}>Fetching your report history...</p>
        ) : reports.length === 0 ? (
          <div style={{ textAlign: "center", padding: "36px 24px", color: "#0F6E56", border: "1px dashed #9FE1CB", borderRadius: "16px" }}>
            <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "#085041" }}>No reports yet</p>
            <p style={{ margin: 0 }}>Submit your first report to see it listed here.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "860px" }}>
              <thead>
                <tr style={{ backgroundColor: "#E1F5EE" }}>
                  { ["ID", "Location", "Waste Type", "Severity", "Status", "Date submitted"].map((heading) => (
                    <th key={heading} style={{ textAlign: "left", padding: "16px", color: "#085041", fontWeight: "600", fontSize: "14px" }}>{heading}</th>
                  )) }
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id || `${report.location}-${report.waste_type}-${report.createdAt}`} style={{ borderBottom: "1px solid #E1F5EE" }}>
                    <td style={{ padding: "16px", color: "#085041", fontWeight: "600" }}>REP-{String(report.id || "").padStart(3, "0")}</td>
                    <td style={{ padding: "16px", color: "#374151" }}>{report.location || "N/A"}</td>
                    <td style={{ padding: "16px", color: "#374151" }}>{report.waste_type || report.wasteType || "N/A"}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", ...getSeverityStyle(report.severity) }}>
                        {report.severity ? report.severity.toUpperCase() : "UNKNOWN"}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", ...getStatusStyle(report.status) }}>
                        {report.status ? report.status.toUpperCase() : "PENDING"}
                      </span>
                    </td>
                    <td style={{ padding: "16px", color: "#374151" }}>{getSubmittedDate(report)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
