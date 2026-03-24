import { NextRequest } from "next/server";
import OpenAI from "openai";

// ── In-memory rate limiter (5 req / 24h per IP) ──────
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

function getRealIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

// ── OpenAI client ─────────────────────────────────────
// Instantiated lazily inside the POST handler to prevent build errors.

// ── Prompt builders ───────────────────────────────────
function buildPrompt(text: string, tone: string): string {
  const base = text.trim();
  switch (tone) {
    case "beginner":
      return `Explain the following for a beginner with no prior knowledge. Be clear, friendly, and use helpful analogies:\n\n${base}`;
    case "intermediate":
      return `Explain the following for someone with an intermediate level of understanding. Include important concepts and some technical detail, but keep it accessible:\n\n${base}`;
    default: // eli5
      return `Explain the following in very simple terms so that a 5-year-old can understand. Use fun, everyday examples and avoid any jargon:\n\n${base}`;
  }
}

// ── POST /api/explain ─────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = getRealIP(req);
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return Response.json(
      { error: "You've reached your daily limit of 5 free explanations. Upgrade to Pro for unlimited access!" },
      { status: 429 }
    );
  }

  // Parse body
  let text: string;
  let tone: string;

  try {
    const body = await req.json();
    text = (body.text ?? "").trim();
    tone = (body.tone ?? "eli5").trim();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Validation
  if (!text) {
    return Response.json({ error: "Please provide some text to explain." }, { status: 400 });
  }


  // AI call
  try {
    const model = process.env.OPENAI_MODEL ?? "nvidia/nemotron-3-super-120b-a12b";
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "", // Provide fallback to avoid constructor throw if undefined
      baseURL: process.env.OPENAI_BASE_URL ?? "https://integrate.api.nvidia.com/v1",
    });

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a friendly, patient teacher who specialises in making complex information simple and relatable. Always respond in plain text (no markdown). Keep explanations between 200–400 words.",
        },
        { role: "user", content: buildPrompt(text, tone) },
      ],
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.95,
    });

    const output = completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate an explanation. Please try again.";

    return Response.json(
      { output, remaining },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[explain] API error:", message);
    // Surface real error in development so it's easy to diagnose
    const isDev = process.env.NODE_ENV === "development";
    return Response.json(
      { error: isDev ? `API error: ${message}` : "AI service is temporarily unavailable. Please try again in a moment." },
      { status: 503 }
    );
  }
}
