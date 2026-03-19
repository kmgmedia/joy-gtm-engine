"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { GTMForm } from "./GTMForm";
import { StrategyResults } from "./StrategyResults";
import { PipelineList } from "./Pipeline/PipelineList";
import { useResponsive } from "@/hooks/useResponsive";
import { LOADING_PHASES } from "@/constants/loadingPhases";
import type { Lead, FormData, GTMStrategy } from "@/types/gtm";

export default function Demo() {
  const { isMobile, isTablet } = useResponsive();
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    industry: "",
  });
  const [result, setResult] = useState<GTMStrategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Responsive style values
  const containerPadding = isMobile ? "16px" : "20px";
  const cardPadding = isMobile ? "20px" : "40px";
  const titleFontSize = isMobile ? "24px" : "32px";
  const gridColumns = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr";
  const gap = isMobile ? "12px" : "16px";

  const handleFormChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingPhase(0);
    setResult(null);

    // Animate through loading phases
    const phaseInterval = setInterval(() => {
      setLoadingPhase((prev) => {
        if (prev < LOADING_PHASES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

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
          suggestedNextAction: data.suggestedNextAction,
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
    clearInterval(phaseInterval);
    setLoading(false);
  };

  const handleStatusChange = (i: number, newStatus: string) => {
    setLeads((prev) =>
      prev.map((lead, idx) =>
        idx === i ? { ...lead, status: newStatus } : lead,
      ),
    );
  };

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
          AI GTM Workflow Prototype
        </h1>

        <GTMForm
          form={form}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          loading={loading}
          loadingText={LOADING_PHASES[loadingPhase]}
          isMobile={isMobile}
        />

        {result && (
          <StrategyResults
            result={result}
            isMobile={isMobile}
            gap={gap}
            gridColumns={gridColumns}
          />
        )}

        <PipelineList
          leads={leads}
          onStatusChange={handleStatusChange}
          isMobile={isMobile}
          gap={gap}
        />
      </div>
    </div>
  );
}
