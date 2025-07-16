import { z } from 'zod';

// ------------------------------
// Guardrail Categories
// ------------------------------

/**
 * Categories for classifying user input relevance
 */
export const GUARDRAIL_CATEGORIES = {
  BUSINESS_INTEGRATION: 'business-integration',
  COM_CON_PRODUCTS: 'com-con-products',
  LEAD_GENERATION: 'lead-generation',
  WORKFLOW_AUTOMATION: 'workflow-automation',
  IRRELEVANT: 'irrelevant',
} as const;

export type GuardrailCategory = typeof GUARDRAIL_CATEGORIES[keyof typeof GUARDRAIL_CATEGORIES];

// ------------------------------
// Zod Schemas
// ------------------------------

/**
 * Schema for guardrail category validation
 */
export const GuardrailCategorySchema = z.enum([
  'business-integration',
  'com-con-products',
  'lead-generation',
  'workflow-automation',
  'irrelevant',
]);

/**
 * Schema for confidence level validation (0-1 range)
 */
export const ConfidenceLevelSchema = z.number().min(0).max(1);

/**
 * Schema for guardrail agent output
 */
export const GuardrailOutputSchema = z.object({
  isRelevant: z.boolean().describe('Whether the input is relevant to com:con business context'),
  reasoning: z.string().describe('Explanation for the relevance classification'),
  category: GuardrailCategorySchema.describe('The category that best describes the input'),
  confidence: ConfidenceLevelSchema.optional().describe('Confidence level of the classification (0-1)'),
});

/**
 * Schema for guardrail configuration
 */
export const GuardrailConfigSchema = z.object({
  enabled: z.boolean().describe('Whether guardrails are enabled'),
  strictMode: z.boolean().describe('Whether to use more restrictive filtering'),
  confidenceThreshold: ConfidenceLevelSchema.describe('Minimum confidence required for classification'),
  allowedCategories: z.array(GuardrailCategorySchema).describe('Categories that should be allowed through'),
  customRejectionMessages: z.record(z.string(), z.string()).describe('Custom rejection messages for specific categories'),
});

// ------------------------------
// TypeScript Interfaces
// ------------------------------

/**
 * Output from the guardrail agent classification
 */
export interface GuardrailOutput {
  /** Whether the input is relevant to com:con business context */
  isRelevant: boolean;
  /** Explanation for the relevance classification */
  reasoning: string;
  /** The category that best describes the input */
  category: GuardrailCategory;
  /** Confidence level of the classification (0-1) */
  confidence?: number;
}

/**
 * Configuration options for the guardrail system
 */
export interface GuardrailConfig {
  /** Whether guardrails are enabled */
  enabled: boolean;
  /** Whether to use more restrictive filtering */
  strictMode: boolean;
  /** Minimum confidence required for classification */
  confidenceThreshold: number;
  /** Categories that should be allowed through */
  allowedCategories: GuardrailCategory[];
  /** Custom rejection messages for specific categories */
  customRejectionMessages: Record<string, string>;
}

/**
 * Default guardrail configuration
 */
export const DEFAULT_GUARDRAIL_CONFIG: GuardrailConfig = {
  enabled: true,
  strictMode: false,
  confidenceThreshold: 0.7,
  allowedCategories: [
    GUARDRAIL_CATEGORIES.BUSINESS_INTEGRATION,
    GUARDRAIL_CATEGORIES.COM_CON_PRODUCTS,
    GUARDRAIL_CATEGORIES.LEAD_GENERATION,
    GUARDRAIL_CATEGORIES.WORKFLOW_AUTOMATION,
  ],
  customRejectionMessages: {
    [GUARDRAIL_CATEGORIES.IRRELEVANT]: "I'm designed to help with business integration and com:con solutions. Could you ask about connecting your business systems instead?",
  },
};

// ------------------------------
// Type Guards
// ------------------------------

/**
 * Type guard to check if a value is a valid GuardrailCategory
 */
export function isGuardrailCategory(value: unknown): value is GuardrailCategory {
  return typeof value === 'string' && Object.values(GUARDRAIL_CATEGORIES).includes(value as GuardrailCategory);
}

/**
 * Type guard to check if a value is a valid GuardrailOutput
 */
export function isGuardrailOutput(value: unknown): value is GuardrailOutput {
  try {
    GuardrailOutputSchema.parse(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Type guard to check if a value is a valid GuardrailConfig
 */
export function isGuardrailConfig(value: unknown): value is GuardrailConfig {
  try {
    GuardrailConfigSchema.parse(value);
    return true;
  } catch {
    return false;
  }
}

// ------------------------------
// Utility Functions
// ------------------------------

/**
 * Validates and parses guardrail output using Zod schema
 */
export function parseGuardrailOutput(data: unknown): GuardrailOutput {
  return GuardrailOutputSchema.parse(data) as GuardrailOutput;
}

/**
 * Validates and parses guardrail configuration using Zod schema
 */
export function parseGuardrailConfig(data: unknown): GuardrailConfig {
  return GuardrailConfigSchema.parse(data) as GuardrailConfig;
}

/**
 * Checks if a category is allowed based on configuration
 */
export function isCategoryAllowed(category: GuardrailCategory, config: GuardrailConfig): boolean {
  return config.allowedCategories.includes(category);
}

/**
 * Gets the appropriate rejection message for a category
 */
export function getRejectionMessage(category: GuardrailCategory, config: GuardrailConfig): string {
  // Check for custom message first
  if (config.customRejectionMessages[category]) {
    return config.customRejectionMessages[category];
  }

  // Fallback to default messages based on category
  switch (category) {
    case GUARDRAIL_CATEGORIES.IRRELEVANT:
      return "I'm designed to help with business integration and com:con solutions. Could you ask about connecting your business systems instead?";
    default:
      return "I focus on business solutions and system integration. How can I help with your company's integration needs?";
  }
}