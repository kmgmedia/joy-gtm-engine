"use client";
import React from "react";
import type { GTMStrategy } from "@/types/gtm";
import { CARD_COLORS } from "@/constants/cardColors";
import { StrategyCard } from "./Cards/StrategyCard";

type StrategyResultsProps = {
  result: GTMStrategy;
  isMobile: boolean;
  gap: string;
  gridColumns: string;
};

export const StrategyResults: React.FC<StrategyResultsProps> = ({
  result,
  isMobile,
  gap,
  gridColumns,
}) => {
  if (!result) return null;

  const handleCopyMessage = () => {
    if (result.message) {
      navigator.clipboard.writeText(result.message);
      alert("Message copied to clipboard!");
    }
  };

  const cardFontSize = isMobile ? "14px" : "16px";

  return (
    <div style={{ marginTop: 24, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridColumns,
          gap: gap,
          marginBottom: "16px",
        }}
      >
        <StrategyCard
          icon={CARD_COLORS.insight.icon}
          title={CARD_COLORS.insight.label}
          content={result.insight || ""}
          bgColor={CARD_COLORS.insight.bg}
          borderColor={CARD_COLORS.insight.border}
          textColor={CARD_COLORS.insight.color}
          isMobile={isMobile}
        />

        <StrategyCard
          icon={CARD_COLORS.painPoints.icon}
          title={CARD_COLORS.painPoints.label}
          content={result.painPoints || ""}
          bgColor={CARD_COLORS.painPoints.bg}
          borderColor={CARD_COLORS.painPoints.border}
          textColor={CARD_COLORS.painPoints.color}
          isMobile={isMobile}
        />

        <StrategyCard
          icon={CARD_COLORS.message.icon}
          title={CARD_COLORS.message.label}
          content={result.message || ""}
          bgColor={CARD_COLORS.message.bg}
          borderColor={CARD_COLORS.message.border}
          textColor={CARD_COLORS.message.color}
          isMobile={isMobile}
          isFullWidth
          onCopy={handleCopyMessage}
          showCopyButton
        />

        <StrategyCard
          icon={CARD_COLORS.services.icon}
          title={CARD_COLORS.services.label}
          content={result.recommendedServices || ""}
          bgColor={CARD_COLORS.services.bg}
          borderColor={CARD_COLORS.services.border}
          textColor={CARD_COLORS.services.color}
          isMobile={isMobile}
        />

        <StrategyCard
          icon={CARD_COLORS.timeline.icon}
          title={CARD_COLORS.timeline.label}
          content={result.timeline || ""}
          bgColor={CARD_COLORS.timeline.bg}
          borderColor={CARD_COLORS.timeline.border}
          textColor={CARD_COLORS.timeline.color}
          isMobile={isMobile}
        />

        <StrategyCard
          icon={CARD_COLORS.nextSteps.icon}
          title={CARD_COLORS.nextSteps.label}
          content={result.nextSteps || ""}
          bgColor={CARD_COLORS.nextSteps.bg}
          borderColor={CARD_COLORS.nextSteps.border}
          textColor={CARD_COLORS.nextSteps.color}
          isMobile={isMobile}
        />

        <StrategyCard
          icon={CARD_COLORS.strategy.icon}
          title={CARD_COLORS.strategy.label}
          content={result.engagementStrategy || ""}
          bgColor={CARD_COLORS.strategy.bg}
          borderColor={CARD_COLORS.strategy.border}
          textColor={CARD_COLORS.strategy.color}
          isMobile={isMobile}
        />

        <StrategyCard
          icon={CARD_COLORS.kpis.icon}
          title={CARD_COLORS.kpis.label}
          content={result.keyKPIs || ""}
          bgColor={CARD_COLORS.kpis.bg}
          borderColor={CARD_COLORS.kpis.border}
          textColor={CARD_COLORS.kpis.color}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};
