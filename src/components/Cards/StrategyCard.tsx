"use client";
import React from "react";

type StrategyCardProps = {
  icon: string;
  title: string;
  content: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  isMobile: boolean;
  isFullWidth?: boolean;
  onCopy?: () => void;
  showCopyButton?: boolean;
};

export const StrategyCard: React.FC<StrategyCardProps> = ({
  icon,
  title,
  content,
  bgColor,
  borderColor,
  textColor,
  isMobile,
  isFullWidth,
  onCopy,
  showCopyButton,
}) => {
  return (
    <div
      style={{
        background: bgColor,
        borderRadius: 8,
        padding: isMobile ? 12 : 16,
        border: `2px solid ${borderColor}`,
        gridColumn: isFullWidth ? "1 / -1" : undefined,
      }}
    >
      <strong
        style={{ color: textColor, fontSize: isMobile ? "13px" : "14px" }}
      >
        {icon} {title}
      </strong>
      <div
        style={{
          marginTop: 8,
          color: "#333",
          lineHeight: 1.6,
          fontSize: isMobile ? "13px" : "14px",
        }}
      >
        {content}
      </div>
      {showCopyButton && (
        <button
          style={{
            background: borderColor,
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
          onClick={onCopy}
        >
          Copy Message
        </button>
      )}
    </div>
  );
};
