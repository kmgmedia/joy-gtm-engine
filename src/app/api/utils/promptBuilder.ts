export const buildGTMPrompt = (
  name: string,
  company: string,
  industryValue: string,
): string => {
  // Determine healthcare focus angle based on company name
  const seed = company
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const healthcareAngles = [
    "telehealth-access", // Online healthcare convenience
    "preventive-care", // Health before problems happen
    "mental-wellness", // Stress, burnout, mental health
    "health-compliance", // Regulations, student/client health tracking
    "health-productivity", // How health directly improves performance
  ];
  const angle = healthcareAngles[seed % healthcareAngles.length];

  return `Generate a HEALTHCARE SERVICE pitch for ${name} at ${company} (${industryValue} industry).

YOUR ROLE: You are selling healthcare solutions/services.
${name}'s company: ${company}
Industry context: ${industryValue}
Healthcare angle: ${angle}

CRITICAL - START WITH HEALTHCARE NEED:
Generate a pitch that:
1. Identifies a HEALTHCARE ACCESS or HEALTH OUTCOME challenge for ${name}'s role/organization (burnout, mental health, preventive care gaps, compliance issues, healthcare costs, employee wellness, clinical outcomes, patient/student/client health)
2. Shows how healthcare impacts their business/mission (affects quality of work, client satisfaction, employee retention, compliance standing, bottom line costs, team morale, safety outcomes)
3. Proposes a specific healthcare solution (telehealth platform, wellness program, mental health support, preventive screening, health coaching, benefits optimization, compliance tools)
4. Connects healthcare to better outcomes for their clients/team (healthier team = better service, lower turnover = lower costs, preventive care = fewer crises, wellness = productivity, compliance = reputation protection)

SHARP INSIGHT EXAMPLES (Model This Tone):
✓ "Growth is bottlenecked by manual outreach and relationship management, which means every new prospect requires heavy lift from ${name}'s team."
✓ "${name}'s healthcare model relies heavily on compliance overhead that doesn't scale - every new client adds administrative burden."
✓ "Team productivity is hamstrung by burnout-driven turnover in ${industryValue}, which means constant rehiring costs and knowledge gaps."
✓ "Healthcare access gaps create two problems for ${name}: higher clinic no-shows AND patient outcomes that damage reputation."
✓ "Mental health challenges in ${industryValue} are quietly killing retention - ${name} loses trained staff faster than industry average."
✓ "Preventive care doesn't exist in their current model - everything is reactive crisis management, which is expensive AND ineffective."
✓ "${name}'s biggest constraint is that healthcare decisions require manual reviews, slowing response time for urgent health needs."
✓ "Compliance regulations shift every quarter in ${industryValue}, forcing ${name} to constantly retrain staff or risk penalties."

EXAMPLES OF HEALTHCARE-FOCUSED (DO THIS):
✓ "As a school owner, managing diverse health needs for students and staff is critical..."
✓ "Healthcare access for your team affects both wellbeing AND productivity..."
✓ "Preventive healthcare reduces costs and keeps your people healthy..."
✓ "Mental health challenges in ${industryValue} directly impact your team's effectiveness..."
✓ "Healthcare compliance is non-negotiable if you want to attract talent..."
✓ "When your employees have reliable healthcare, absenteeism drops significantly..."
✓ "Telehealth eliminates barriers for healthcare access your team needs..."
✓ "Burnout in ${industryValue} is costing you both retention AND service quality..."
✓ "Healthcare gaps put you at legal and financial risk..."
✓ "Preventive care investments pay back within 12 months through reduced claims..."

WRONG APPROACH (AVOID):
✗ "You have a talent shortage problem..." (unless tied to healthcare as reason)
✗ "Recruitment and retention challenges..." (reframe to healthcare-driven retention)
✗ Non-healthcare business problems (no supply chain, no operations, no marketing issues)
✗ "I noticed your company needs..." (don't use generic openers)
✗ "We help companies improve..." (don't use vague corporate speak)
✗ Healthcare as a side benefit (it must be the MAIN benefit)
✗ Talking about benefits packages instead of health outcomes
✗ Focusing on insurance instead of actual healthcare quality
✗ Generic wellness platitudes without specific healthcare anchors
✗ Anything that sounds like HR/talent management (no "attracting talent", "team culture", "engagement programs" unless directly health-focused)

---

Return valid JSON with exactly 5 fields:

{
  "insight": "<2-3 sentences. Be SHARP and SPECIFIC about the real business constraint. Not generic. Examples: 'Growth is bottlenecked by manual outreach and relationship management', 'Their healthcare model relies on compliance overhead that doesn't scale', 'Team productivity is hamstrung by burnout-driven turnover in high-pressure roles'. Identify the REAL PROBLEM, not just surface-level observation.>",
  "painPoints": ["<healthcare access or health quality gap for ${name}'s organization>", "<health-related outcome affecting their clients/students/team>", "<healthcare cost or coverage issue>"],
  "message": "<50-70 words. START with ONE of these approaches: (1) 'As a ${industryValue} professional like you...', (2) '${name}, managing healthcare for [your team/clients/students] is...', (3) 'The healthcare reality in ${industryValue} is...', (4) 'I understand that ${industryValue} professionals face...', (5) 'Healthcare is a critical factor in ${industryValue}...', (6) 'Many ${industryValue} organizations struggle with...', (7) '${name}, here's the truth about healthcare in ${industryValue}...', (8) 'What if you could solve [health challenge] in ${industryValue}?', (9) 'The biggest healthcare gap in ${industryValue} is...', (10) 'Most ${industryValue} teams don't realize that...', (11) 'Healthcare costs are impacting ${industryValue} more than ever...', (12) 'Your team deserves healthcare solutions built for ${industryValue}...'. MIDDLE: Show ONE healthcare solution benefit approach: 'This reduces healthcare costs by...', 'Our solution improves employee satisfaction and...', 'Preventive healthcare cuts absenteeism and...', 'This directly boosts productivity through...', 'Your clients/students benefit from...', 'It ensures compliance while also...', 'This creates competitive advantage by...', 'Healthier employees mean less turnover and...', 'Team morale improves when...', 'Time savings happen because...', 'Your bottom line improves when healthcare...', 'Staff engagement rises when you invest in...' END with ONE of these: 'Let's schedule a meeting', 'Can we demo this for you?', 'I'd love to discuss this consultation', 'Let me share how this works', 'Ready to get started?', 'Let's explore options together', 'When can we connect?', 'I'd like to walk you through this', 'Should we set up a quick call?', 'Let me show you what's possible', 'Interested in learning more?', 'Let's find the right solution for you'.>",
  "suggestedNextAction": "<ONE specific GTM action after this message. Choose from: 'Send personalized LinkedIn message with healthcare benchmark data for ${industryValue}', 'Wait 2 days, then follow up with case study from similar ${industryValue} company', 'Research ${name}'s recent company updates/news and reference in follow-up', 'Schedule 15-min call to discuss healthcare roadmap', 'Send healthcare ROI calculator specific to ${industryValue}', 'Connect with ${company}'s benefits/HR contact first', 'Share industry report on healthcare costs in ${industryValue}', 'Ask about their current healthcare provider's pain points', 'Reference specific compliance requirements in ${industryValue}', 'Send competitor healthcare solution comparison for ${industryValue}'.>",
  "nextSteps": "<ONE action: Schedule healthcare consultation, Review health plan options, Demo telehealth platform, Get wellness assessment, etc.>"
}

---

RULES - MANDATORY:
1. HEALTHCARE FIRST - Every sentence is about health/healthcare, not tangential HR/business issues
2. PERSONAL - Address ${name} directly about their health needs
3. INDUSTRY SPECIFIC - Show you understand healthcare challenges in ${industryValue}
4. ANGLE: ${angle} - Keep focus on this healthcare angle throughout
5. SOLUTION FOCUSED - Propose specific healthcare service/solution
6. JSON ONLY - No extra text

DO NOT GENERATE:
- Talent/HR/recruitment angles (unless directly health-related to burnout/wellness)
- Generic business productivity talk without healthcare connection
- Healthcare as a side benefit to something else (IT MUST BE THE MAIN BENEFIT)
- Vague healthcare language (be specific: mental health, preventive care, telehealth, etc.)
- Message starting with "I noticed..." or "We're helping companies..." (use the provided openings)
- Anything that reads like talent management or HR consulting
- Benefits package talk (focus on health outcomes, not insurance features)
- One-size-fits-all healthcare talk (must be industry-specific to ${industryValue})
- Clichés: "holistic wellness", "employee wellbeing journey", "health-conscious culture"
- Asking them what their biggest challenge is (YOU tell them what the healthcare challenge is)
- Vague asks like "Let's grab coffee" (be specific: consultation, demo, assessment, review)
- Ignoring the healthcare angle (${angle}) - every section must connect back to it
- Anything about recruitment, onboarding, training, culture, or engagement unless tied to healthcare`;
};
