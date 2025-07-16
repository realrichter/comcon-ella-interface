# Design Document

## Overview

This design implements input guardrails for the Ella AI agent using the OpenAI Agents SDK guardrail system. The guardrails will act as a filter layer that validates user input before it reaches the main Ella agent, ensuring only business-relevant queries are processed.

The solution uses a lightweight guardrail agent to classify incoming requests and determine their relevance to com:con's business context. This approach provides cost-effective filtering while maintaining high accuracy in relevance detection.

## Architecture

### High-Level Flow

```
User Input → Input Guardrail → Relevance Check → Main Ella Agent → Response
                ↓ (if irrelevant)
            Guardrail Tripwire → Error Response
```

### Components

1. **Guardrail Agent**: A lightweight agent that classifies input relevance
2. **Input Guardrail**: The guardrail implementation that uses the guardrail agent
3. **Enhanced Ella Agent**: The main agent with guardrails configured
4. **Error Handling**: Custom error handling for guardrail violations

## Components and Interfaces

### Guardrail Agent

```typescript
const guardrailAgent = new Agent({
  name: 'Relevance Guardrail',
  instructions: string, // Classification instructions
  outputType: z.object({
    isRelevant: z.boolean(),
    reasoning: z.string(),
    category: z.enum(['business-integration', 'com-con-products', 'lead-generation', 'irrelevant'])
  }),
  model: 'gpt-4o-mini' // Lightweight model for cost efficiency
});
```

### Input Guardrail

```typescript
const relevanceGuardrail: InputGuardrail = {
  name: 'Business Relevance Guardrail',
  execute: async ({ input, context }) => {
    // Use guardrail agent to classify input
    // Return GuardrailFunctionOutput with tripwire status
  }
};
```

### Enhanced Agent Configuration

```typescript
const ellaAgent = new Agent({
  // ... existing configuration
  inputGuardrails: [relevanceGuardrail]
});
```

## Data Models

### Guardrail Output Schema

```typescript
const GuardrailOutput = z.object({
  isRelevant: z.boolean(),
  reasoning: z.string(),
  category: z.enum([
    'business-integration',
    'com-con-products', 
    'lead-generation',
    'workflow-automation',
    'irrelevant'
  ]),
  confidence: z.number().min(0).max(1).optional()
});
```

### Relevance Categories

- **business-integration**: Questions about connecting systems, APIs, data flow
- **com-con-products**: Queries about BAF, SOKRATES.ERP, CAS genesisWorld, SmartWe
- **lead-generation**: Sales inquiries, consultation requests, pricing questions
- **workflow-automation**: Process automation, business logic questions
- **irrelevant**: Personal questions, homework, unrelated topics

## Error Handling

### Guardrail Violation Handling

```typescript
try {
  const result = await run(agent, userInput);
  return result.finalOutput || '';
} catch (error) {
  if (error instanceof InputGuardrailTripwireTriggered) {
    return generateUserFriendlyRejectionMessage(error);
  }
  throw error; // Re-throw other errors
}
```

### User-Friendly Error Messages

The system will provide contextual rejection messages:

- **For personal questions**: "I'm designed to help with business integration and com:con solutions. Could you ask about connecting your business systems instead?"
- **For homework/academic**: "I focus on business solutions rather than academic work. How can I help with your company's integration needs?"
- **For general knowledge**: "I specialize in business system integration. What challenges are you facing with connecting your business applications?"

### Fallback Behavior

- If guardrail agent fails: Log error and allow request through with warning
- If OpenAI API is unavailable: Disable guardrails temporarily
- If classification is uncertain: Err on the side of allowing the request

## Testing Strategy

### Unit Tests

1. **Guardrail Agent Tests**
   - Test classification accuracy with sample inputs
   - Verify output schema compliance
   - Test edge cases and ambiguous inputs

2. **Input Guardrail Tests**
   - Test tripwire triggering for irrelevant inputs
   - Test passthrough for relevant inputs
   - Test error handling scenarios

3. **Integration Tests**
   - End-to-end flow with guardrails enabled
   - Error message generation and formatting
   - Performance impact measurement

### Test Data Categories

**Relevant Inputs:**
- "How can I integrate Salesforce with our ERP system?"
- "What connectors does com:con offer for e-commerce platforms?"
- "I need help automating our invoice processing workflow"

**Irrelevant Inputs:**
- "What's the weather like today?"
- "Help me with my math homework"
- "Tell me a joke"
- "What's the capital of France?"

### Performance Considerations

- Use gpt-4o-mini for guardrail agent to minimize latency and cost
- Implement caching for repeated similar queries
- Set reasonable timeout limits for guardrail execution
- Monitor guardrail accuracy and adjust thresholds as needed

### Configuration Management

The guardrail behavior will be configurable through:

```typescript
interface GuardrailConfig {
  enabled: boolean;
  strictMode: boolean; // More restrictive filtering
  confidenceThreshold: number; // Minimum confidence for classification
  allowedCategories: string[];
  customRejectionMessages: Record<string, string>;
}
```

This design ensures that Ella maintains focus on business-relevant interactions while providing clear feedback to users about appropriate usage patterns.