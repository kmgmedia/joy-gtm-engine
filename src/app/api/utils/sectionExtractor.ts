import type { GTMStrategy } from "@/types/gtm";

export const extractSection = (
  content: string,
  sectionName: string,
): string => {
  // Simple extraction: look for **Section Name**: and get content until next **
  const pattern = new RegExp(
    `\\*\\*${sectionName}\\*\\*:?\\s*([\\s\\S]*?)(?=\\*\\*|$)`,
    "i",
  );
  const match = content.match(pattern);

  if (match && match[1]) {
    let extracted = match[1]
      .replace(/---/g, "")
      .replace(/^\s*\n/, "")
      .trim();

    if (extracted && extracted.length > 5) {
      return extracted;
    }
  }

  return "";
};

export const extractAllSections = (content: string): Partial<GTMStrategy> => {
  return {
    insight: extractSection(content, "Insight"),
    painPoints: extractSection(content, "Pain Points"),
    message: extractSection(content, "Message"),
    recommendedServices: extractSection(content, "Recommended Services"),
    timeline: extractSection(content, "Timeline"),
    nextSteps: extractSection(content, "Next Steps"),
    engagementStrategy: extractSection(content, "Engagement Strategy"),
    keyKPIs: extractSection(content, "Key KPIs"),
  };
};
