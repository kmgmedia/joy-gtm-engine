import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { name, company, industry } = await req.json();

    const prompt = `
You are a trusted healthcare strategist working exclusively in the ${industry} sector. You deeply understand the unique challenges, workflows, and pain points specific to ${industry} organizations. Your expertise is in introducing transformative healthcare solutions that directly impact patient outcomes, operational efficiency, and healthcare quality.

Create a highly personalized, industry-specific healthcare engagement strategy for ${name} at ${company}:

---

**Insight**: 
Based on ${name}'s work in ${industry} at ${company}, provide a specific, insightful analysis that demonstrates you truly understand their world:
- What are the 2-3 most pressing healthcare challenges unique to ${industry} organizations like theirs?
- How do these challenges specifically impact their patients, clinical teams, and bottom line?
- What transformation could healthcare solutions bring to their specific situation?
Write with genuine understanding and empathy - like a peer who has worked in their sector and understands their pain. 2-3 sentences, conversational and warm.

---

**Pain Points**:
IMPORTANT: Provide 3-4 DETAILED pain points that ${name} at a ${industry} organization definitely experiences. Each must have substantial content:
- Pain Point 1: Name the challenge clearly. Describe the specific impact with 1-2 sentences on how it affects patient care, staff, or operations.
- Pain Point 2: Another sector-specific struggle with concrete consequences. Include real-world impact.
- Pain Point 3: Third challenge unique to the ${industry} sector. Be specific about why it matters.
- Pain Point 4: Additional relevant pain point if applicable to ${industry}.

CRITICAL: Each pain point must be 2-3 sentences minimum. Be specific to ${industry}, not generic. Show understanding of what keeps them up at night.

---

**Message**: 
Write a warm, genuine introduction that shows ${name} you understand their specific ${industry} healthcare world:
- Start by acknowledging a specific challenge unique to their sector
- Explain how healthcare solutions directly solve THEIR specific problems
- Make it personal - why does this matter for THEIR patients and THEIR team?
- Include a specific benefit relevant to ${industry}
- Keep it under 60 words
- Sound like a healthcare peer reaching out, not a vendor
- Use language appropriate to ${industry} professionals
- No signature, no corporate jargon

---

**Recommended Services**:
IMPORTANT: Suggest 2-3 DETAILED healthcare solutions. This section MUST have substantial, concrete content with full descriptions:
- Service 1: [Service name]. Describe 2-3 sentences about what it does, how it solves pain points, and specific benefits to ${industry} organizations.
- Service 2: [Another service]. Explain 2-3 sentences on how this solution improves outcomes in their sector with healthcare-specific metrics.
- Service 3: [Third solution if applicable]. Detail 2-3 sentences on why this healthcare solution matters in the ${industry} context.

For each service provide: Clear name, implementation benefit, healthcare outcomes, industry-specific impact. MINIMUM 2-3 sentences per service.

---

**Key KPIs**:
IMPORTANT: Provide 3 DETAILED healthcare metrics with full descriptions. Service MUST have substantial content:
- KPI 1: [Metric name]. Full description: explain what it measures, why it matters for ${industry}, measurement approach (e.g., "Patient Satisfaction Scores: Track percentage of patients rating care quality 4-5 stars, measuring improvement in healthcare experience...")
- KPI 2: [Another metric]. Full description: Include how it impacts operations and patient care in ${industry} context with measurement details.
- KPI 3: [Third metric]. Full description: Describe the measurement approach and why it indicates success in their healthcare sector.

CRITICAL: Each KPI must have 2+ sentences with specific measurement units. Not just names - full healthcare context and measurement methodology.

---

---

CRITICAL INSTRUCTIONS FOR BEAUTIFUL, SMART RESPONSES:
1. INDUSTRY-SPECIFIC: Every response must be tailored to ${industry}. Avoid generic healthcare language.
2. PERSONALIZED: Write as if you know ${name}$, their role, and their exact challenges in ${industry}.
3. SPECIFIC EXAMPLES: Use concrete examples, metrics, and challenges specific to the ${industry} sector.
4. SMART TONE: Sound intelligent and experienced in ${industry} - like you've worked in their world.
5. BEAUTIFUL LANGUAGE: Use warm, genuine, professional language that's specific to healthcare professionals.
6. NO GENERIC CONTENT: If it could apply to any industry, rewrite it to be specific to ${industry}.
7. SHOW EXPERTISE: Demonstrate deep knowledge of ${industry} challenges, workflows, and solutions.
8. WARM & HUMAN: Sound like a trusted colleague, not a salesperson. Use conversational language.
9. IMPACT-FOCUSED: Everything should emphasize real healthcare outcomes, patient care, and operational excellence.
10. AUTHENTIC: Avoid corporate buzzwords. Be genuine and honest about how solutions help in their sector.

Format each section clearly with the section name in bold followed by a colon. Ensure Pain Points and Recommended Services have real, substantial content specific to ${industry}.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content || "";

    // Enhanced extraction function with better regex and fallbacks
    const extractSection = (sectionName: string): string => {
      // Try multiple regex patterns to ensure capture
      
      // Pattern 1: **Section Name**: content until next ** or end
      let regex = new RegExp(
        `\\*\\*${sectionName}\\*\\*:?\\s*([\\s\\S]*?)(?=\\*\\*|$)`,
        "i",
      );
      let match = content.match(regex);
      
      if (match && match[1]) {
        let extracted = match[1]
          .replace(/---/g, "")
          .replace(/^\s*\n/, "")
          .trim();
        
        // Only return if there's actual content
        if (extracted && extracted.length > 5) {
          return extracted;
        }
      }

      // Pattern 2: Section Name (with or without bold) followed by content
      regex = new RegExp(
        `${sectionName}[:\s]+([\\s\\S]*?)(?=^[A-Z][a-zA-Z\\s]+:|$)`,
        "im",
      );
      match = content.match(regex);
      
      if (match && match[1]) {
        let extracted = match[1]
          .replace(/---/g, "")
          .replace(/^\*\*/g, "")
          .trim();
        
        if (extracted && extracted.length > 5) {
          return extracted;
        }
      }

      // Fallback: return empty string if nothing found
      return "";
    };

    const data = {
      insight: extractSection("Insight"),
      painPoints: extractSection("Pain Points"),
      message: extractSection("Message"),
      recommendedServices: extractSection("Recommended Services"),
      timeline: extractSection("Timeline"),
      nextSteps: extractSection("Next Steps"),
      engagementStrategy: extractSection("Engagement Strategy"),
      keyKPIs: extractSection("Key KPIs"),
    };

    // Fallback: if any critical field is empty, provide a default response
    if (!data.painPoints) {
      data.painPoints = `Based on ${name}'s work in the ${industry} sector at ${company}, key pain points typically include: 1) Clinical workflow inefficiencies requiring manual processes, 2) Data management and patient information accessibility challenges, 3) Staff retention and burnout concerns, 4) Regulatory compliance and documentation burdens.`;
    }
    
    if (!data.recommendedServices) {
      data.recommendedServices = `For a ${industry} organization like ${company}, we recommend: 1) Digital Health Platform - streamlines patient engagement and clinical workflows specific to your organization's needs. 2) Analytics & Intelligence Solution - provides real-time insights into operational efficiency and patient outcomes. 3) Compliance Management System - automates regulatory requirements and documentation specific to healthcare standards.`;
    }
    
    if (!data.keyKPIs) {
      data.keyKPIs = `Track these healthcare metrics for success: 1) Patient Satisfaction Score - measure improvement in care experience and outcomes. 2) Operational Efficiency - monitor time saved on clinical tasks and administrative work. 3) Clinical Quality Metrics - track improvements in care quality, readmissions, and compliance scores.`;
    }

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { message: "Error: " + (error?.message || "Unknown error") },
      { status: 500 },
    );
  }
}
