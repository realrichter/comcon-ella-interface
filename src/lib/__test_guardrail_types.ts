// Temporary test file to verify guardrail types work correctly
import {
    GuardrailOutput,
    GuardrailConfig,
    GUARDRAIL_CATEGORIES,
    parseGuardrailOutput,
    parseGuardrailConfig,
    isGuardrailCategory,
    isGuardrailOutput,
    isGuardrailConfig,
    isCategoryAllowed,
    getRejectionMessage,
    DEFAULT_GUARDRAIL_CONFIG
} from './guardrailTypes';

// Test GuardrailOutput
const testOutput: GuardrailOutput = {
    isRelevant: false,
    reasoning: "This is a personal question unrelated to business integration",
    category: GUARDRAIL_CATEGORIES.IRRELEVANT,
    confidence: 0.95
};

// Test GuardrailConfig
const testConfig: GuardrailConfig = {
    enabled: true,
    strictMode: false,
    confidenceThreshold: 0.8,
    allowedCategories: [GUARDRAIL_CATEGORIES.BUSINESS_INTEGRATION],
    customRejectionMessages: {
        [GUARDRAIL_CATEGORIES.IRRELEVANT]: "Custom rejection message"
    }
};

// Test parsing functions
try {
    const parsedOutput = parseGuardrailOutput(testOutput);
    const parsedConfig = parseGuardrailConfig(testConfig);
    console.log('Parsing successful:', { parsedOutput, parsedConfig });
} catch (error) {
    console.error('Parsing failed:', error);
}

// Test type guards
console.log('Type guard tests:', {
    isValidCategory: isGuardrailCategory(GUARDRAIL_CATEGORIES.BUSINESS_INTEGRATION),
    isValidOutput: isGuardrailOutput(testOutput),
    isValidConfig: isGuardrailConfig(testConfig),
});

// Test utility functions
console.log('Utility function tests:', {
    categoryAllowed: isCategoryAllowed(GUARDRAIL_CATEGORIES.BUSINESS_INTEGRATION, testConfig),
    rejectionMessage: getRejectionMessage(GUARDRAIL_CATEGORIES.IRRELEVANT, testConfig),
    defaultConfig: DEFAULT_GUARDRAIL_CONFIG,
});

console.log('All guardrail types tests passed!');