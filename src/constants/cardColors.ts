export const CARD_COLORS = {
  insight: {
    bg: "#e3f2fd",
    border: "#1976D2",
    color: "#1976D2",
    icon: "📊",
    label: "Insight",
  },
  painPoints: {
    bg: "#ffebee",
    border: "#e53935",
    color: "#e53935",
    icon: "🎯",
    label: "Pain Points",
  },
  message: {
    bg: "#ffdbe0",
    border: "#e53935",
    color: "#e53935",
    icon: "✉️",
    label: "Outreach Message",
  },
  suggestedNextAction: {
    bg: "#fff8e1",
    border: "#fbc02d",
    color: "#fbc02d",
    icon: "⚡",
    label: "Next Action",
  },
  services: {
    bg: "#f3e5f5",
    border: "#9c27b0",
    color: "#9c27b0",
    icon: "🏥",
    label: "Services",
  },
  timeline: {
    bg: "#fff3e0",
    border: "#ff9800",
    color: "#ff9800",
    icon: "⏰",
    label: "Best Timing",
  },
  nextSteps: {
    bg: "#e8f5e9",
    border: "#4caf50",
    color: "#4caf50",
    icon: "✅",
    label: "Next Steps",
  },
  strategy: {
    bg: "#e0f2f1",
    border: "#00897b",
    color: "#00897b",
    icon: "🤝",
    label: "Strategy",
  },
  kpis: {
    bg: "#fef5e7",
    border: "#f39c12",
    color: "#f39c12",
    icon: "📈",
    label: "Key Metrics",
  },
};

export const STATUS_COLORS: Record<
  string,
  { bg: string; color: string; icon: string }
> = {
  New: { bg: "#e3f2fd", color: "#1976D2", icon: "🆕" },
  Contacted: { bg: "#f3e5f5", color: "#9c27b0", icon: "📧" },
  Qualified: { bg: "#e8f5e9", color: "#4caf50", icon: "✅" },
  Converted: { bg: "#fff3e0", color: "#ff9800", icon: "🎉" },
};

export const PIPELINE_STAGES = ["New", "Contacted", "Qualified", "Converted"];
