import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const ReportPage = ({ reports, setReports }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  // const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [severity, setSeverity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role === "admin") {
      navigate("/dashboard");
    }
  }, [navigate, role, token]);

  const handleSubmit = async () => {
    if (!location || !wasteType) {
      alert("Please enter location and waste type");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location, waste_type: wasteType, description }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Report submit nahi hua");
        setLoading(false);
        return;
      }
      setSeverity(data.severity);
      setSubmitted(true);
    } catch (err) {
      setError("Server se connect nahi ho pa raha");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setLocation("");
    setDescription("");
    setWasteType("");
    setSeverity("");
    setSubmitted(false);
    setError("");
  };

  return (
    <div style={{ backgroundColor: "#f0fdf9", minHeight: "100vh", padding: "48px 32px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", color: "#085041" }}>
            Submit a Waste Report
          </h1>
          <p style={{ color: "#0F6E56" }}>
            Upload a waste image and fill in the details. The system will automatically analyze the severity.
          </p>
        </div>

        <div style={{ backgroundColor: "white", padding: "36px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(29,158,117,0.1)" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1.5px solid #E1F5EE" }}>
            <div style={{ width: "36px", height: "36px", backgroundColor: "#1D9E75", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🗑️</div>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: 0, color: "#085041" }}>Waste Report Form</h2>
              <p style={{ color: "#0F6E56", fontSize: "13px", margin: 0 }}>Severity will be analyzed automatically.</p>
            </div>
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "6px", color: "#085041", fontSize: "14px" }}>Waste Image (Optional)</label>
            <input type="file" accept="image/*" onChange={handleImageChange}
              style={{ width: "100%", padding: "10px", border: "1.5px solid #9FE1CB", borderRadius: "8px", boxSizing: "border-box", fontSize: "14px" }} />
            {preview && (
              <img src={preview} alt="preview" style={{ marginTop: "12px", width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px", border: "1.5px solid #9FE1CB" }} />
            )}
          </div>

          {/* Waste Type */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "6px", color: "#085041", fontSize: "14px" }}>Waste Type</label>
            <select value={wasteType} onChange={(e) => setWasteType(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #9FE1CB", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none", color: "#085041" }}>
              <option value="">Select waste type</option>
              <option value="plastic">Plastic</option>
              <option value="chemical">Chemical</option>
              <option value="medical">Medical</option>
              <option value="electronic">Electronic</option>
              <option value="metal">Metal</option>
              <option value="organic">Organic</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "6px", color: "#085041", fontSize: "14px" }}>Location</label>
            <input type="text" placeholder="Enter the location or address" value={location} onChange={(e) => setLocation(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #9FE1CB", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "6px", color: "#085041", fontSize: "14px" }}>Description</label>
            <textarea placeholder="Describe the waste issue in detail" value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #9FE1CB", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", resize: "vertical", outline: "none" }} />
          </div>

          {error && <p style={{ color: "#dc2626", marginBottom: "12px", fontSize: "14px", backgroundColor: "#fef2f2", padding: "8px 12px", borderRadius: "8px" }}>{error}</p>}

          {!submitted ? (
            <button onClick={handleSubmit} disabled={loading}
              style={{ width: "100%", padding: "14px", backgroundColor: "#1D9E75", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
              {loading ? "Submitting..." : "🌿 Analyze & Submit Report"}
            </button>
          ) : (
            <div>
              <div style={{
                padding: "24px", borderRadius: "12px", marginBottom: "16px", textAlign: "center",
                backgroundColor: severity === "high" ? "#fef2f2" : severity === "medium" ? "#fffbeb" : "#E1F5EE",
                border: `1.5px solid ${severity === "high" ? "#fca5a5" : severity === "medium" ? "#fcd34d" : "#9FE1CB"}`
              }}>
                <p style={{ fontWeight: "600", fontSize: "16px", margin: "0 0 4px", color: "#085041" }}>Analysis Result</p>
                <p style={{ margin: "0 0 8px", color: "#6b7280", fontSize: "14px" }}>Severity Level:</p>
                <p style={{
                  fontSize: "32px", fontWeight: "bold", margin: 0,
                  color: severity === "high" ? "#dc2626" : severity === "medium" ? "#d97706" : "#1D9E75"
                }}>{severity?.toUpperCase()}</p>
              </div>

              <button onClick={handleReset}
                style={{ width: "100%", padding: "12px", backgroundColor: "#E1F5EE", color: "#085041", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>
                Submit Another Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;