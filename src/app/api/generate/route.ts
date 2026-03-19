import OpenAI from "openai";
import { buildGTMPrompt } from "../utils/promptBuilder";
import { applyFallbacks } from "../utils/fallbacks";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { name, company, industry } = await req.json();
    const industryValue = industry || "Healthcare";

    const prompt = buildGTMPrompt(name, company, industryValue);

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content || "";

    // Parse the JSON response from the new simplified prompt
    let data = {};
    try {
      const parsed = JSON.parse(content);
      data = {
        insight: parsed.insight || "",
        painPoints: Array.isArray(parsed.painPoints)
          ? parsed.painPoints.join("\n")
          : parsed.painPoints || "",
        message: parsed.message || "",
        suggestedNextAction: parsed.suggestedNextAction || "",
        nextSteps: parsed.nextSteps || "",
      };
    } catch (e) {
      // If JSON parsing fails, return error message
      return Response.json(
        { message: "API returned invalid JSON format" },
        { status: 500 },
      );
    }

    // Apply fallbacks for robustness
    data = applyFallbacks(data, name, company, industryValue);

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { message: "Error: " + (error?.message || "Unknown error") },
      { status: 500 },
    );
  }
}
