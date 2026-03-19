"use client";
import { useState } from "react";
import Logo from "./Logo";

type Lead = {
  name: string;
  company: string;
  industry?: string;
  message: string;
  insight: string;
  status: string;
};

export default function Demo() {
  const [form, setForm] = useState({ name: "", company: "", industry: "" });
  const [result, setResult] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");
    setInsight("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data.message);
      setInsight(data.insight);
      setLeads([
        ...leads,
        {
          name: form.name,
          company: form.company,
          industry: form.industry,
          message: data.message,
          insight: data.insight,
          status: "New",
        },
      ]);
    } catch (e) {
      setResult("Error generating message.");
    }
    setLoading(false);
  };

  const handleStatusChange = (i: number, newStatus: string) => {
    setLeads((prev) =>
      prev.map((lead, idx) =>
        idx === i ? { ...lead, status: newStatus } : lead
      )
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F7FA",
      }}
    >
      <Logo />
      <div
        style={{
          padding: "40px",
          maxWidth: "700px",
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
            fontSize: "32px",
            fontWeight: "bold",
            color: "#1976D2",
            textAlign: "center",
            marginBottom: "24px",
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
            style={{ marginBottom: 8, width: "100%", padding: 8, border: "2px solid #e53935", borderRadius: 6 }}
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            style={{ marginBottom: 8, width: "100%", padding: 8, border: "2px solid #e53935", borderRadius: 6 }}
            required
          />
          <input
            type="text"
            placeholder="Industry (optional)"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            style={{ marginBottom: 8, width: "100%", padding: 8, border: "2px solid #e53935", borderRadius: 6 }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              background: "#1976D2",
              color: "white",
              border: "none",
              marginTop: 8,
            }}
          >
            {loading ? "Generating..." : "Generate Outreach"}
          </button>
        </form>
        {insight && (
          <div style={{ marginTop: 16, width: "100%" }}>
            <div style={{ background: "#e3f2fd", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <strong style={{ color: '#1976D2', fontSize: 18 }}>HealthCare Insight</strong>
              <div style={{ marginTop: 8 }}>{insight}</div>
            </div>
          </div>
        )}
        {result && (
          <div style={{ marginTop: 8, width: "100%" }}>
            <div style={{ background: "#ffdbe0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <strong style={{ color: '#e53935', fontSize: 18 }}>Generated Message</strong>
              <div style={{ marginTop: 8 }}>{result}</div>
              <button style={{ background: '#e53935', color: 'white', border: 'none', borderRadius: 6, padding: '6px 16px', marginTop: 8, fontWeight: 'bold', cursor: 'pointer' }}>Copy Message</button>
            </div>
          </div>
        )}
        {leads.length > 0 && (
          <div style={{ marginTop: 32, width: "100%" }}>
            <h3 style={{ color: '#ff9800', fontWeight: 'bold', fontSize: 22 }}>Pipeline:</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {leads.map((lead, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: 16,
                    background: "#fff8e1",
                    padding: 16,
                    borderRadius: 8,
                    border: '2px solid #ff9800',
                  }}
                >
                    <div>
                      <strong>Name:</strong> {lead.name}
                      <strong>Company:</strong> {lead.company}
                      <strong>Industry:</strong> {lead.industry || "HealthCare"}
                      <strong>Message:</strong> {lead.message}
                      <strong>Insight:</strong> {lead.insight}
                      <strong>Status:</strong>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(i, e.target.value)}
                        style={{ marginLeft: 8 }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                      </select>
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
