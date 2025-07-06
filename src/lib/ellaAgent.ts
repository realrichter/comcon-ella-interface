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
    'Search the list of available BAF connectors for a given system or keyword and return a helpful human-readable summary.',
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }) => {
    try {
      const { data, error } = await supabase
        .from('connectors')
        .select('name, description')
        .ilike('name', `%${query}%`);

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Supabase search error', error);
        return "I'm sorry, I'm having trouble searching our integrations right now.";
      }

      if (data && data.length > 0) {
        const list = data.map((d) => `• ${d.name}${d.description ? ` – ${d.description}` : ''}`).join('\n');
        return `Yes, we already have connectors for the following systems that match "${query}":\n${list}`;
      }

      return `We don't yet have a pre-built connector for "${query}", but we can develop a custom integration using our Best Automation Framework (BAF).`;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return 'An unexpected error occurred while searching integrations.';
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
      "Provide clear, helpful answers. Highlight com:con's strengths: our 200+ pre-built connectors, on-premise deployment for GDPR compliance, and fully customised solutions tailored to client needs (versus one-size-fits-all competitors).",
      "When relevant, suggest next steps – e.g. offer a free consultation, point to a tutorial video, or propose follow-up questions to clarify needs.",
      "Always maintain a friendly and professional tone, and focus on how our solutions can specifically benefit the user's business or industry.",
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