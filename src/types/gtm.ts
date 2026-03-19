export type Lead = {
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

export type GTMStrategy = Partial<Lead>;

export type FormData = {
  name: string;
  company: string;
  industry: string;
};

export type ResponsiveBreakpoints = {
  isMobile: boolean;
  isTablet: boolean;
};
