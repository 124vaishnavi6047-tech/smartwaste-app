import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        backgroundColor: "#1D9E75",
        padding: "80px 32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "-40px", left: "-40px",
          width: "200px", height: "200px",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "50%"
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", right: "-40px",
          width: "250px", height: "250px",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "50%"
        }} />

        <span style={{
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: "6px 16px",
          borderRadius: "20px", fontSize: "13px", marginBottom: "20px",
          display: "inline-block"
        }}>Waste Severity Detection</span>

        <h1 style={{ color: "white", fontSize: "48px", fontWeight: "bold", margin: "16px 0", lineHeight: "1.2" }}>
          Smart Waste Severity<br />Analysis Platform
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "18px", marginBottom: "32px" }}>
          Upload waste images and get instant severity analysis<br />for faster and cleaner community action.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link to="/report" style={{
            backgroundColor: "white", color: "#1D9E75",
            padding: "12px 28px", borderRadius: "8px",
            textDecoration: "none", fontWeight: "700", fontSize: "16px",
            display: "flex", alignItems: "center", gap: "8px"
          }}>🌿 Submit Report →</Link>
          <Link to="/dashboard" style={{
            backgroundColor: "transparent", color: "white",
            padding: "12px 28px", borderRadius: "8px",
            textDecoration: "none", fontWeight: "600", fontSize: "16px",
            border: "1.5px solid rgba(255,255,255,0.6)",
            display: "flex", alignItems: "center", gap: "8px"
          }}>📊 View Dashboard</Link>
        </div>
      </div>

      {/* Why Section */}
      <div style={{ backgroundColor: "#f9fafb", padding: "64px 32px", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px", color: "#085041" }}>Why SmartWaste?</h2>
        <p style={{ color: "#6b7280", marginBottom: "40px" }}>A smarter way to detect and manage waste severity efficiently.</p>

        <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { icon: "📷", title: "Upload Image Easily", desc: "Citizens can quickly upload waste images without visiting any office." },
            { icon: "⚡", title: "Instant AI Analysis", desc: "The system instantly analyzes waste severity from uploaded images." },
            { icon: "⚖️", title: "Fair Priority System", desc: "High severity reports are automatically prioritized for faster action." }
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: "white",
              border: "1px solid #E1F5EE",
              padding: "32px 24px",
              borderRadius: "12px", width: "280px",
              boxShadow: "0 2px 8px rgba(29,158,117,0.08)"
            }}>
              <div style={{
                width: "48px", height: "48px",
                backgroundColor: "#E1F5EE",
                borderRadius: "10px", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 16px",
                fontSize: "22px"
              }}>{item.icon}</div>
              <h3 style={{ fontWeight: "bold", marginBottom: "8px", color: "#085041" }}>{item.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ backgroundColor: "#E1F5EE", padding: "64px 32px", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px", color: "#085041" }}>How It Works</h2>
        <p style={{ color: "#0F6E56", marginBottom: "48px" }}>Three simple steps from upload to resolution.</p>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0", flexWrap: "wrap" }}>
          {[
            { num: "01", icon: "📤", title: "Upload Image", desc: "Take a photo of the waste and upload it to the platform." },
            { num: "02", icon: "🤖", title: "AI Analyzes", desc: "Our system analyzes the severity of the waste automatically." },
            { num: "03", icon: "👁️", title: "Track Status", desc: "Monitor the severity result and track action taken." }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", width: "220px", padding: "16px", position: "relative" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <div style={{
                  width: "64px", height: "64px",
                  backgroundColor: "white",
                  border: "1px solid #9FE1CB",
                  borderRadius: "12px", display: "flex", alignItems: "center",
                  justifyContent: "center", margin: "0 auto 16px", fontSize: "28px"
                }}>{item.icon}</div>
                <span style={{
                  position: "absolute", top: "-8px", right: "-8px",
                  backgroundColor: "#1D9E75", color: "white",
                  borderRadius: "50%", width: "22px", height: "22px",
                  fontSize: "11px", fontWeight: "bold",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{item.num}</span>
              </div>
              <h3 style={{ fontWeight: "bold", marginBottom: "8px", color: "#085041" }}>{item.title}</h3>
              <p style={{ color: "#0F6E56", fontSize: "13px" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#085041",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "32px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px",
            backgroundColor: "white",
            borderRadius: "8px", display: "flex",
            alignItems: "center", justifyContent: "center"
          }}>
            <span>🗑️</span>
          </div>
          <span style={{ fontWeight: "bold", fontSize: "18px", color: "white" }}>SmartWaste</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "rgba(255,255,255,0.7)" }}>Home</Link>
          <Link to="/report" style={{ textDecoration: "none", color: "rgba(255,255,255,0.7)" }}>Submit Report</Link>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "rgba(255,255,255,0.7)" }}>Dashboard</Link>
        </div>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>SmartWaste. Smart Waste Severity Detection.</p>
      </footer>
    </div>
  );
};

export default HomePage;