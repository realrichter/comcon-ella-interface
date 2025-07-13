import { Agent, run, setDefaultOpenAIKey, setDefaultOpenAIClient, tool } from '@openai/agents';
import OpenAI from 'openai';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

// Configure API key from Vite environment variable. IMPORTANT: Do **NOT** commit real keys.
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

if (OPENAI_API_KEY) {
  // Provide both the key and a browser-safe client so the SDK doesn't throw.
  setDefaultOpenAIKey(OPENAI_API_KEY);

  // The OpenAI SDK normally blocks browser usage unless this flag is set. We understand the
  // risk (the key is only used in development) and explicitly enable it.
  const browserClient = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
  setDefaultOpenAIClient(browserClient);
} else {
  // eslint-disable-next-line no-console
  console.warn('⚠️  No OpenAI API key found. Set VITE_OPENAI_API_KEY to enable Ella responses.');
}

// ------------------------------
// Tool: Search BAF connector list
// ------------------------------
const searchIntegrationsTool = tool({
  name: 'search_integrations',
  description:
    'Look up com:con\'s existing BAF connectors that match a keyword. Returns a JSON array of objects with "name", "description", and "category" fields. Use this data to craft a personalised, helpful reply (do NOT expose raw JSON).',
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }) => {
    // Normalize the user query for consistent matching
    const cleanedQuery = query.trim();

    // Helper that performs a case-insensitive partial match search on name OR description
    async function queryConnectors(pattern: string) {
      return supabase
        .from('connectors')
        .select('name, description, category')
        // Search across name, description, AND category for partial matches (case-insensitive)
        .or(`name.ilike.*${pattern}*,description.ilike.*${pattern}*,category.ilike.*${pattern}*`);
    }

    try {
      // 1. Primary search – exact phrase across name & description
      let { data, error } = await queryConnectors(cleanedQuery);

      // 2. If no direct hits, broaden by individual tokens (e.g. "email marketing" → ["email", "marketing"])
      if (!error && data && data.length === 0) {
        const tokens = cleanedQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((t) => t.length > 2);

        const seen = new Map<string, { name: string; description: string | null; category: string }>();

        for (const token of tokens) {
          const { data: tokenData, error: tokenErr } = await queryConnectors(token);
          if (tokenErr) {
            // eslint-disable-next-line no-console
            console.error('Supabase search error', tokenErr);
            return '[]';
          }
          tokenData?.forEach((row) => seen.set(row.name, row));
        }
        data = Array.from(seen.values());
      }

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Supabase search error', error);
        return '[]';
      }

      // Always return JSON (possibly empty array)
      return JSON.stringify(data ?? []);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return '[]';
    }
  },
});

// ------------------------------
// Singleton Agent instance
// ------------------------------
let ellaAgent: Agent | null = null;

function createEllaAgent(): Agent {
  return new Agent({
    name: 'Ella',
    instructions: [
      "You are Ella, the AI-powered integration assistant for com:con solutions.",
      "Your role is to help users with questions about connecting business systems, automating workflows, and understanding com:con's products (the Base Application Framework, SOKRATES.ERP, CAS genesisWorld CRM, SmartWe, etc.).",
      "When you need details about available connectors, call the search_integrations tool with a relevant keyword (system name, domain, or category). The tool returns a JSON array; use that data to craft a tailored, conversational reply. If the list is large, pick the most relevant 3-5 and mention that more are available if needed.",
      "Provide clear, helpful answers. Highlight com:con's strengths: our 200+ pre-built connectors, on-premise deployment for GDPR compliance, and fully customised solutions tailored to client needs (versus one-size-fits-all competitors).",
      "When relevant, suggest next steps – e.g. offer a free consultation, point to a tutorial video, or propose follow-up questions to clarify needs.",
      "Always maintain a friendly and professional tone, focusing on how our solutions can specifically benefit the user's business or industry.",
    ].join('\n'),
    model: 'gpt-4o-mini', // Explicit model choice (adjust to your subscription / pricing plan)
    tools: [searchIntegrationsTool],
    modelSettings: {
      temperature: 0.7,
      toolChoice: 'auto',
    },
  });
}

function getEllaAgent(): Agent {
  if (!ellaAgent) {
    ellaAgent = createEllaAgent();
  }
  return ellaAgent;
}

// ----------------------------------------
// Public helper – run Ella with a question
// ----------------------------------------
export async function runEllaAgent(userQuestion: string): Promise<string> {
  const agent = getEllaAgent();
  const result = await run(agent, userQuestion);
  // `finalOutput` is the assistant's answer. Fallback to empty string if undefined.
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return result.finalOutput || '';
} 