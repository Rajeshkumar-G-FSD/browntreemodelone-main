import { CHATBOT_SYSTEM_INSTRUCTION } from "./chatbotPrompt";

// Calls Gemini directly from the browser — no backend required, so the site
// can run as a plain static deploy (no cPanel Node.js App). This trades away
// key secrecy: VITE_GEMINI_API_KEY gets baked into the public JS bundle, so
// the key MUST be restricted to this domain via HTTP referrer restriction in
// Google Cloud Console / AI Studio, or anyone can extract and reuse it.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const MODEL = "gemini-3.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

export class GeminiConfigError extends Error {}
export class GeminiRequestError extends Error {}

export async function getChatReply(messages: ChatMessage[]): Promise<string> {
  if (!API_KEY) {
    throw new GeminiConfigError(
      "The concierge isn't configured yet — VITE_GEMINI_API_KEY is missing from the build."
    );
  }

  const contents = messages.map((msg) => ({
    role: msg.sender === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  let response: Response;
  try {
    response = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: CHATBOT_SYSTEM_INSTRUCTION }] },
        generationConfig: { temperature: 0.7 },
      }),
    });
  } catch {
    throw new GeminiRequestError("Unable to reach the concierge service. Please check your connection and try again.");
  }

  if (!response.ok) {
    let detail = "";
    try {
      const errBody = await response.json();
      detail = errBody?.error?.message || "";
    } catch {
      /* body wasn't JSON — ignore, fall through to generic message */
    }
    throw new GeminiRequestError(
      detail || `The concierge service returned an error (${response.status}). Please try again shortly.`
    );
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
  if (!text) {
    throw new GeminiRequestError("I couldn't formulate a response just now. Please try rephrasing your question.");
  }
  return text;
}
