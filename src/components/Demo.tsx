"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";

type Lead = {
  name: string;
  company: string;
  industry?: string;
  insight: string;
  painPoints: string;
  message: string;
  recommendedServices: string;
  timeline: string;
  nextSteps: string;
  engagementStrategy: string;
  keyKPIs: string;
  status: string;
};

// Hook for responsive values
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet };
};

export default function Demo() {
  const { isMobile, isTablet } = useResponsive();
  const [form, setForm] = useState({ name: "", company: "", industry: "" });
  const [result, setResult] = useState<Partial<Lead> | null>(null);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
      setLeads([
        ...leads,
        {
          name: form.name,
          company: form.company,
          industry: form.industry,
          insight: data.insight,
          painPoints: data.painPoints,
          message: data.message,
          recommendedServices: data.recommendedServices,
          timeline: data.timeline,
          nextSteps: data.nextSteps,
          engagementStrategy: data.engagementStrategy,
          keyKPIs: data.keyKPIs,
          status: "New",
        },
      ]);
    } catch (e) {
      setResult({ message: "Error generating strategy." });
    }
    setLoading(false);
  };

  const handleStatusChange = (i: number, newStatus: string) => {
    setLeads((prev) =>
      prev.map((lead, idx) =>
        idx === i ? { ...lead, status: newStatus } : lead,
      ),
    );
  };

  // Responsive styles
  const containerPadding = isMobile ? "16px" : "20px";
  const cardPadding = isMobile ? "20px" : "40px";
  const titleFontSize = isMobile ? "24px" : "32px";
  const cardFontSize = isMobile ? "14px" : "16px";
  const inputPadding = isMobile ? "10px" : "8px";
  const gridColumns = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr";
  const pipelineGridColumns = isMobile ? "1fr" : "1fr 1fr";
  const gap = isMobile ? "12px" : "16px";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "#F5F7FA",
        padding: containerPadding,
        paddingTop: "20px",
      }}
    >
      <div style={{ width: "100%", marginBottom: "20px" }}>
        <Logo />
      </div>

      <div
        style={{
          padding: cardPadding,
          maxWidth: "900px",
          width: "100%",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: titleFontSize,
            fontWeight: "bold",
            color: "#1976D2",
            textAlign: "center",
            marginBottom: "24px",
            marginTop: 0,
          }}
        >
          HealthCare GTM Engine
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ width: "100%", marginBottom: 24 }}
        >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              marginBottom: 8,
              width: "100%",
              padding: inputPadding,
              fontSize: "14px",
              border: "2px solid #e53935",
              borderRadius: 6,
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            style={{
              marginBottom: 8,
              width: "100%",
              padding: inputPadding,
              fontSize: "14px",
              border: "2px solid #e53935",
              borderRadius: 6,
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
            required
          />
          <input
            type="text"
            placeholder="Industry (optional)"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            style={{
              marginBottom: 8,
              width: "100%",
              padding: inputPadding,
              fontSize: "14px",
              border: "2px solid #e53935",
              borderRadius: 6,
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: isMobile ? "12px 20px" : "10px 24px",
              fontSize: isMobile ? "14px" : "16px",
              borderRadius: 8,
              background: "#1976D2",
              color: "white",
              border: "none",
              marginTop: 8,
              width: isMobile ? "100%" : "auto",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              fontWeight: "bold",
            }}
          >
            {loading ? "Generating..." : "Generate GTM Strategy"}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: 24, width: "100%" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: gridColumns,
                gap: gap,
                marginBottom: "16px",
              }}
            >
              {/* Insight Card */}
              <div
                style={{
                  background: "#e3f2fd",
                  borderRadius: 8,
                  padding: isMobile ? 12 : 16,
                  border: "2px solid #1976D2",
                }}
              >
                <strong style={{ color: "#1976D2", fontSize: cardFontSize }}>
                  📊 Insight
                </strong>
                <div
                  style={{
                    marginTop: 8,
                    color: "#333",
                    lineHeight: 1.6,
                    fontSize: isMobile ? "13px" : "14px",
                  }}
                >
                  {result.insight}
                </div>
              </div>

              {/* Pain Points Card */}
              <div
                style={{
                  background: "#ffebee",
                  borderRadius: 8,
                  padding: isMobile ? 12 : 16,
                  border: "2px solid #e53935",
                }}
              >
                <strong style={{ color: "#e53935", fontSize: cardFontSize }}>
                  🎯 Pain Points
                </strong>
                <div
                  style={{
                    marginTop: 8,
                    color: "#333",
                    lineHeight: 1.6,
                    fontSize: isMobile ? "13px" : "14px",
                  }}
                >
                  {result.painPoints}
                </div>
              </div>

              {/* Message Card */}
              <div
                style={{
                  background: "#ffdbe0",
                  borderRadius: 8,
                  padding: isMobile ? 12 : 16,
                  border: "2px solid #e53935",
                  gridColumn: "1 / -1",
                }}
              >
                <strong style={{ color: "#e53935", fontSize: cardFontSize }}>
                  ✉️ Outreach Message
                </strong>
                <div
                  style={{
                    marginTop: 8,
                    color: "#333",
                    lineHeight: 1.6,
                    fontSize: isMobile ? "13px" : "14px",
                  }}
                >
                  {result.message}
                </div>
                <button
                  style={{
                    background: "#e53935",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    padding: isMobile ? "8px 14px" : "6px 16px",
                    marginTop: 8,
                    fontSize: isMobile ? "13px" : "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    width: isMobile ? "100%" : "auto",
                  }}
                  onClick={() => {
                    result.message &&
                      navigator.clipboard.writeText(result.message);
                    alert("Message copied to clipboard!");
                  }}
                >
                  Copy Message
                </button>
              </div>

              {/* Recommended Services Card */}
              <div
                style={{
                  background: "#f3e5f5",
                  borderRadius: 8,
                  padding: isMobile ? 12 : 16,
                  border: "2px solid #9c27b0",
                }}
              >
                <strong style={{ color: "#9c27b0", fontSize: cardFontSize }}>
                  🏥 Services
                </strong>
                <div
                  style={{
                    marginTop: 8,
                    color: "#333",
                    lineHeight: 1.6,
                    fontSize: isMobile ? "13px" : "14px",
                  }}
                >
                  {result.recommendedServices}
                </div>
              </div>

              {/* Timeline Card */}
              <div
                style={{
                  background: "#fff3e0",
                  borderRadius: 8,
                  padding: isMobile ? 12 : 16,
                  border: "2px solid #ff9800",
                }}
              >
                <strong style={{ color: "#ff9800", fontSize: cardFontSize }}>
                  ⏰ Best Timing
                </strong>
                <div
                  style={{
                    marginTop: 8,
                    color: "#333",
                    lineHeight: 1.6,
                    fontSize: isMobile ? "13px" : "14px",
                  }}
                >
                  {result.timeline}
                </div>
              </div>

              {/* Next Steps Card */}
              <div
                style={{
                  background: "#e8f5e9",
                  borderRadius: 8,
                  padding: isMobile ? 12 : 16,
                  border: "2px solid #4caf50",
                }}
              >
                <strong style={{ color: "#4caf50", fontSize: cardFontSize }}>
                  ✅ Next Steps
                </strong>
                <div
                  style={{
                    marginTop: 8,
                    color: "#333",
                    lineHeight: 1.6,
                    fontSize: isMobile ? "13px" : "14px",
                  }}
                >
                  {result.nextSteps}
                </div>
              </div>

              {/* Engagement Strategy Card */}
              <div
                style={{
                  background: "#e0f2f1",
                  borderRadius: 8,
                  padding: isMobile ? 12 : 16,
                  border: "2px solid #00897b",
                }}
              >
                <strong style={{ color: "#00897b", fontSize: cardFontSize }}>
                  🤝 Strategy
                </strong>
                <div
                  style={{
                    marginTop: 8,
                    color: "#333",
                    lineHeight: 1.6,
                    fontSize: isMobile ? "13px" : "14px",
                  }}
                >
                  {result.engagementStrategy}
                </div>
              </div>

              {/* Key KPIs Card */}
              <div
                style={{
                  background: "#fef5e7",
                  borderRadius: 8,
                  padding: isMobile ? 12 : 16,
                  border: "2px solid #f39c12",
                }}
              >
                <strong style={{ color: "#f39c12", fontSize: cardFontSize }}>
                  📈 Key Metrics
                </strong>
                <div
                  style={{
                    marginTop: 8,
                    color: "#333",
                    lineHeight: 1.6,
                    fontSize: isMobile ? "13px" : "14px",
                  }}
                >
                  {result.keyKPIs}
                </div>
              </div>
            </div>
          </div>
        )}

        {leads.length > 0 && (
          <div style={{ marginTop: 32, width: "100%" }}>
            <h3
              style={{
                color: "#ff9800",
                fontWeight: "bold",
                fontSize: isMobile ? 18 : 22,
                marginBottom: 16,
                marginTop: 0,
              }}
            >
              Pipeline ({leads.length})
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {leads.map((lead, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: 16,
                    background: "#fff8e1",
                    padding: isMobile ? 12 : 16,
                    borderRadius: 8,
                    border: "2px solid #ff9800",
                  }}
                >
                  <div style={{ color: "#333" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: pipelineGridColumns,
                        gap: gap,
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ marginBottom: 0 }}>
                        <strong
                          style={{ fontSize: isMobile ? "13px" : "14px" }}
                        >
                          Name:
                        </strong>
                        <span style={{ fontSize: isMobile ? "13px" : "14px" }}>
                          {" "}
                          {lead.name}
                        </span>
                      </div>
                      <div style={{ marginBottom: 0 }}>
                        <strong
                          style={{ fontSize: isMobile ? "13px" : "14px" }}
                        >
                          Company:
                        </strong>
                        <span style={{ fontSize: isMobile ? "13px" : "14px" }}>
                          {" "}
                          {lead.company}
                        </span>
                      </div>
                      <div style={{ marginBottom: 0 }}>
                        <strong
                          style={{ fontSize: isMobile ? "13px" : "14px" }}
                        >
                          Industry:
                        </strong>
                        <span style={{ fontSize: isMobile ? "13px" : "14px" }}>
                          {" "}
                          {lead.industry || "HealthCare"}
                        </span>
                      </div>
                      <div>
                        <strong
                          style={{ fontSize: isMobile ? "13px" : "14px" }}
                        >
                          Status:
                        </strong>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(i, e.target.value)
                          }
                          style={{
                            marginLeft: 8,
                            padding: "4px 8px",
                            borderRadius: 4,
                            border: "1px solid #ccc",
                            fontSize: isMobile ? "13px" : "14px",
                            fontFamily: "inherit",
                            cursor: "pointer",
                          }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Converted">Converted</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
