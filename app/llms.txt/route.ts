import { llmsIndex } from "@/lib/llms";

// Plain-text summary for AI assistants and crawlers (https://llmstxt.org).
export function GET() {
  return new Response(llmsIndex(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
