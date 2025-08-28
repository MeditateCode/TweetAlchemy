// src/app/api/optimize/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req: Request) {
  try {
    const { text, options } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // Build prompt dynamically
    const tasks: string[] = [];

    // Grammar
    if (options?.grammar) tasks.push("Fix grammar mistakes");

    // Spacing
    if (options?.spacing) {
      tasks.push(
        "Fix spacing so the tweet is readable. " +
          "Insert a blank line ONLY when necessary to separate distinct ideas. " +
          "Do not over-space. Keep it tweet-friendly. " +
          "At most 3 blank lines in total."
      );
    }

    // Tone handling
    if (options?.tone && options.tone !== "none") {
      if (options.tone === "professional")
        tasks.push("Rewrite in a professional, polished tone");
      if (options.tone === "casual")
        tasks.push("Rewrite in a casual, fun, engaging tone");
      if (options.tone === "hype")
        tasks.push("Rewrite in a hype, marketing-friendly style with urgency");
    }

    // Emojis (new option)
    if (options?.emojis) {
      tasks.push("Add 2-4 relevant emojis naturally (do not overuse)");
    } else {
      tasks.push("Do NOT add any emojis");
    }

    // Hashtags
    if (options?.hashtags) {
      tasks.push("Add 3-5 relevant trending hashtags at the end");
    } else {
      tasks.push("Do NOT add any hashtags");
    }

    // Algo optimization
    if (options?.algo) {
      tasks.push(
        "Optimize for Twitter algorithm (concise style, engaging hook, strong call-to-action)"
      );
    }

    // Final prompt
    const prompt = `
      You are a tweet optimization assistant.
      Given this tweet: "${text}"
      Apply the following transformations: ${tasks.join(", ")}.
      Only return the final optimized tweet. Do not include explanations.
    `;

    const response = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: [
        { role: "system", content: "You are an assistant that rewrites tweets." },
        { role: "user", content: prompt },
      ],
    });

    const optimized = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({
      original: text,
      optimized: optimized || text,
    });
  } catch (err: any) {
    console.error("❌ Optimization error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
