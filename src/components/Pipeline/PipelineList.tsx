"use client";
import React from "react";
import type { Lead } from "@/types/gtm";
import { PipelineItem } from "./PipelineItem";

type PipelineListProps = {
  leads: Lead[];
  onStatusChange: (index: number, status: string) => void;
  isMobile: boolean;
  gap: string;
};

export const PipelineList: React.FC<PipelineListProps> = ({
  leads,
  onStatusChange,
  isMobile,
  gap,
}) => {
  if (leads.length === 0) return null;

  return (
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
          <PipelineItem
            key={i}
            lead={lead}
            index={i}
            onStatusChange={onStatusChange}
            isMobile={isMobile}
            gap={gap}
          />
        ))}
      </ul>
    </div>
  );
};
