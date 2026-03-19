import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { name, company, industry } = await req.json();

    const prompt = `
  You are a GTM engineer specializing in HealthCare.

  Analyze the lead and generate:

  1. Insight:
  - What the person likely needs or wants in HealthCare
  - Identify a HealthCare pain point or opportunity for the individual
  - Suggest a general HealthCare service they could benefit from (e.g., telehealth, wellness program, health platform, online consultation)

  2. Message:
  - Write a short, sharp outreach message
  - Invite the person to try a general HealthCare service (e.g., "Try our telehealth platform", "Sign up for our wellness program", "Book a free HealthCare consultation")
  - Make the message actionable and relevant to the recipient’s HealthCare needs
  - Avoid generic phrases like "engineering excellence" or "AI-driven"
  - Under 60 words
  - Sound friendly and helpful
  - Do NOT end the message with '[Your Name]' or '[Your Contact Information]'.

  Lead:
  Name: ${name}
  Company: ${company}
  Industry: ${industry || "HealthCare"}
  `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    // Try to extract 'Insight:' and 'Message:' from the response
    const content = response.choices[0].message.content || "";
    let insight = "";
    let message = "";
    const insightMatch = content.match(/Insight:(.*?)(Message:|$)/is);
    if (insightMatch) {
      insight = insightMatch[1].replace(/^[\s:-]+/, "").trim();
    }
    const messageMatch = content.match(/Message:(.*)/is);
    if (messageMatch) {
      message = messageMatch[1].replace(/^[\s:-]+/, "").trim();
    }
    // fallback if not found
    if (!insight)
      insight = content.split("Message:")[0]?.replace("Insight:", "").trim();
    if (!message)
      message = content.split("Message:")[1]?.trim() || content.trim();

    return Response.json({
      insight,
      message,
    });
  } catch (error: any) {
    return Response.json(
      { message: "Error: " + (error?.message || "Unknown error") },
      { status: 500 },
    );
  }
}
