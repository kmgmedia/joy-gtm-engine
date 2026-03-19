"use client";
import React from "react";
import type { Lead } from "@/types/gtm";
import { STATUS_COLORS, PIPELINE_STAGES } from "@/constants/cardColors";

type PipelineItemProps = {
  lead: Lead;
  index: number;
  onStatusChange: (index: number, status: string) => void;
  isMobile: boolean;
  gap: string;
};

export const PipelineItem: React.FC<PipelineItemProps> = ({
  lead,
  index,
  onStatusChange,
  isMobile,
  gap,
}) => {
  const statusInfo = STATUS_COLORS[lead.status] || STATUS_COLORS.New;

  return (
    <li
      style={{
        marginBottom: 16,
        background: statusInfo.bg,
        padding: isMobile ? 12 : 16,
        borderRadius: 8,
        border: `2px solid ${statusInfo.color}`,
      }}
    >
      <div style={{ color: "#333" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <strong style={{ fontSize: isMobile ? "14px" : "16px" }}>
                {lead.name}
              </strong>
              <span style={{ fontSize: "12px", color: "#666" }}>
                @ {lead.company}
              </span>
            </div>
            <span style={{ fontSize: "12px", color: "#999" }}>
              {lead.industry || "Healthcare"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: statusInfo.color,
              color: "white",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            {statusInfo.icon} {lead.status}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: 12,
          }}
        >
          {PIPELINE_STAGES.map((stage) => (
            <div
              key={stage}
              style={{
                flex: 1,
                height: "4px",
                background:
                  PIPELINE_STAGES.indexOf(lead.status) >=
                  PIPELINE_STAGES.indexOf(stage)
                    ? statusInfo.color
                    : "#ddd",
                borderRadius: "2px",
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: gap,
          }}
        >
          <div>
            <strong style={{ fontSize: isMobile ? "13px" : "14px" }}>
              Update Status:
            </strong>
            <select
              value={lead.status}
              onChange={(e) => onStatusChange(index, e.target.value)}
              style={{
                marginLeft: 8,
                padding: "6px 10px",
                borderRadius: 4,
                border: `2px solid ${statusInfo.color}`,
                fontSize: isMobile ? "13px" : "14px",
                fontFamily: "inherit",
                cursor: "pointer",
                background: "white",
                color: statusInfo.color,
                fontWeight: "bold",
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
  );
};
