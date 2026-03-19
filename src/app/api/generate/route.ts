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
List 3-4 real, specific pain points that ${name} at a ${industry} organization definitely experiences:
- Pain Point 1: [Industry-specific challenge with real impact description]
- Pain Point 2: [Another sector-specific struggle with consequence]
- Pain Point 3: [Third challenge unique to their healthcare sector]
- Pain Point 4: [Fourth point if relevant to ${industry}]

Each pain point should be concrete and specific to ${industry} - not generic healthcare language. Show you understand exactly what keeps them up at night.

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
Suggest 2-3 healthcare solutions specifically tailored to address the pain points and challenges in ${industry}:
- Service 1: [Service name and clear description of what it does for ${industry} organizations]
- Service 2: [How this solution specifically improves outcomes in their sector]
- Service 3: [Industry-relevant healthcare solution]

For each service, explain:
- The specific healthcare benefit to ${industry} organizations
- How it reduces the pain points you identified
- Real outcomes they can expect (improved patient care, staff efficiency, compliance, etc.)
- Why this matters specifically in their healthcare sector

---

**Timeline**:
Based on ${name}'s likely role in a ${industry} organization at ${company}:
- What's their realistic schedule? When are they most open to discussing improvements?
- Consider the unique workflow of ${industry} professionals
- Suggest specific days/times that align with their sector's rhythms
- Example specific to their sector: [Time that makes sense for ${industry}]

---

**Next Steps**:
Provide 3 concrete, achievable actions tailored to the ${industry} sector:
1. [Specific healthcare conversation starter relevant to ${industry}]
2. [How to introduce the solution in a way that resonates with their sector]
3. [A pilot or trial approach that works for ${industry} organizations]

---

**Engagement Strategy**:
Explain the best approach to engage someone like ${name} in the ${industry} healthcare sector:
- What peer insights, case studies, or data points from ${industry} would resonate most?
- What outcomes matter most to ${industry} organizations?
- How do you position healthcare solutions as mission-critical (not optional) in their sector?
- What's the best way to introduce this - peer recommendation, data-driven approach, success stories?

---

**Key KPIs**:
What healthcare metrics should ${name} and their ${industry} organization track to measure success?
- KPI 1: [Specific metric relevant to ${industry}]
- KPI 2: [Outcome measurement important to their sector]
- KPI 3: [Healthcare quality or efficiency metric relevant to ${industry}]

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

    // Helper function to extract section content - improved to capture multi-line content
    const extractSection = (sectionName: string): string => {
      // Look for **Section Name**: content until next ** or end of string
      const regex = new RegExp(
        `\\*\\*${sectionName}\\*\\*:?\\s*([\\s\\S]*?)(?=\\*\\*[A-Z]|$)`,
        "i",
      );
      const match = content.match(regex);
      if (match) {
        // Clean up the extracted content
        return match[1]
          .replace(/---/g, "") // Remove separator lines
          .trim();
      }
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

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { message: "Error: " + (error?.message || "Unknown error") },
      { status: 500 },
    );
  }
}
