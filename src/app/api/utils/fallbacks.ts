import type { GTMStrategy } from "@/types/gtm";

export const applyFallbacks = (
  data: Partial<GTMStrategy>,
  name: string,
  company: string,
  industryValue: string,
): GTMStrategy => {
  // Comprehensive fallbacks for ALL fields - NONE should be blank and ALL must be healthcare-focused
  const result: GTMStrategy = {
    insight: data.insight || "",
    painPoints: data.painPoints || "",
    message: data.message || "",
    recommendedServices: data.recommendedServices || "",
    timeline: data.timeline || "",
    nextSteps: data.nextSteps || "",
    engagementStrategy: data.engagementStrategy || "",
    keyKPIs: data.keyKPIs || "",
  };

  if (!result.insight || result.insight.length < 10) {
    result.insight = `${company} has a real opportunity to improve employee wellness and reduce healthcare costs. Most companies lose 5-8% of productivity annually due to poor employee health, absenteeism, and healthcare benefit gaps. By implementing comprehensive healthcare solutions, your team could see measurable improvements in staff retention, morale, and operational efficiency within 60-90 days. Companies making this move report 15-25% reduction in healthcare expenses within their first year.`;
  }

  if (!result.painPoints || result.painPoints.length < 10) {
    result.painPoints = `1) High Healthcare Costs Hurting Your Bottom Line - Your employee healthcare costs are rising faster than revenue. You're not getting preventive care, so you're paying for costly emergency/reactive care instead. This directly impacts your profit margins and ability to attract top talent. 2) Employee Absenteeism Reducing Productivity - Your team members are missing work due to untreated health issues, lack of preventive care, and wellness support. This costs ${company} real productivity and revenue every single month. 3) Talent Retention Crisis from Poor Benefits - Your benefits package isn't competitive. Your best people leave for companies with better healthcare and wellness programs. Recruiting replacements is expensive and disruptive. 4) No Preventive Healthcare Program - Without preventive care or wellness initiatives, your team gets sicker, more stressed, and less engaged. This shows in performance and morale.`;
  }

  if (!result.message || result.message.length < 10) {
    result.message = `Hey ${name} — been looking at what's happening at ${company} and I noticed something: your people are getting hit with healthcare costs and wellness gaps that are costing you real money in turnover and sick days. We've been helping companies like yours cut that down and actually keep people healthier and happier. Most see the savings pretty quick. Think it's worth a quick conversation to see if it applies to ${company}?`;
  }

  if (!result.timeline || result.timeline.length < 10) {
    result.timeline = `Your ${company} team could see quick employee wellness wins in 30-45 days—better morale, more engagement, reduced sick days. Cost benefits and retention improvements show in 60-90 days as healthier employees mean less turnover and lower healthcare claims. Measurable financial ROI (reduced healthcare spend + lower turnover costs) typically shows by month 4-5. By month 12, most companies see 15-25% improvement in total healthcare costs and retention.`;
  }

  if (!result.nextSteps || result.nextSteps.length < 10) {
    result.nextSteps = `Let's spend 30 minutes reviewing ${company}'s current healthcare spend, employee satisfaction levels, and benefits gaps. I'll show you exactly where you're losing money to preventable health issues and turnover. You'll leave with a clear picture of what's possible—concrete cost savings projections and a realistic implementation timeline. No pressure—just exploring what works for your business.`;
  }

  if (!result.engagementStrategy || result.engagementStrategy.length < 10) {
    result.engagementStrategy = `Start by focusing on what matters most to ${name} and the leadership at ${company}: costs and people. Lead with data: "Companies in your industry typically waste $2-3K per employee annually on preventable health issues." Ask about their biggest healthcare frustration—costs? retention? employee satisfaction? Position healthcare solutions as a business investment that pays back fast—lower costs AND happier, healthier staff. Show peer companies already getting results.`;
  }

  if (!result.recommendedServices || result.recommendedServices.length < 10) {
    result.recommendedServices = `1) Comprehensive Health Assessment for ${company} - Analyze current employee health status, healthcare spend gaps, and preventive care opportunities. Identify where ${company} is bleeding money. Deliver cost-saving roadmap within 2 weeks. 2) Employee Wellness Program Implementation - Deploy preventive healthcare, fitness, mental health, and wellness initiatives so your team stays healthy and engaged. Results in 60+ days. 3) Healthcare Benefit Optimization - Restructure benefits to reduce costs for ${company} while improving employee satisfaction and coverage. Lower premiums, better coverage, happier people. 4) Ongoing Health & Cost Management - Continuous improvement based on actual employee health outcomes and your cost trends. Keep compounding your savings year over year.`;
  }

  if (!result.keyKPIs || result.keyKPIs.length < 10) {
    result.keyKPIs = `1) Healthcare Cost Reduction - Percentage decrease in per-employee healthcare spend at ${company} (target: 15-25% within 12 months). Direct bottom-line impact. 2) Absenteeism & Productivity - Days missed per employee per year from health issues (target: 20-30% reduction). Each day saved = productive work. 3) Employee Retention Rate - Percentage improvement in staff retention, especially among top talent (target: 10-15% improvement). Lower turnover = lower recruitment/training costs. 4) Employee Health Score & Satisfaction - Health index improvement and benefit satisfaction scores (target: 25%+ improvement). Healthier, happier employees are more productive and engaged.`;
  }

  return result;
};
