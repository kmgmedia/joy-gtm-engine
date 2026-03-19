"use client";
import React from "react";
import type { FormData } from "@/types/gtm";

type GTMFormProps = {
  form: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  loadingText: string;
  isMobile: boolean;
};

export const GTMForm: React.FC<GTMFormProps> = ({
  form,
  onChange,
  onSubmit,
  loading,
  loadingText,
  isMobile,
}) => {
  const inputPadding = isMobile ? "10px" : "8px";

  const inputStyle = {
    marginBottom: 8,
    width: "100%",
    padding: inputPadding,
    fontSize: "14px",
    border: "2px solid #e53935",
    borderRadius: 6,
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
  };

  return (
    <form onSubmit={onSubmit} style={{ width: "100%", marginBottom: 24 }}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => onChange("name", e.target.value)}
        style={inputStyle}
        required
      />
      <input
        type="text"
        placeholder="Company"
        value={form.company}
        onChange={(e) => onChange("company", e.target.value)}
        style={inputStyle}
        required
      />
      <input
        type="text"
        placeholder="Industry (optional)"
        value={form.industry}
        onChange={(e) => onChange("industry", e.target.value)}
        style={inputStyle}
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
        {loading ? loadingText : "Generate GTM Strategy"}
      </button>
    </form>
  );
};
