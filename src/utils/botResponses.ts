
// TODO: Replace with real AI integration in future versions
export const getBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  // Industry-specific responses
  if (message.includes('manufacturing')) {
    return "Our BAF platform excels in manufacturing environments! We can integrate your ERP systems with production management tools, enabling real-time inventory tracking and automated order processing.";
  }
  
  if (message.includes('crm') || message.includes('customer')) {
    return "CRM integration is one of our specialties! Our BAF can connect Salesforce, HubSpot, or any CRM with your existing systems to create seamless customer data flows and automated workflows.";
  }

  if (message.includes('sap')) {
    return "SAP integration is our forte! Our BAF can seamlessly connect SAP ERP with your CRM, e-commerce platforms, and other business systems for complete data synchronization.";
  }

  if (message.includes('ecommerce') || message.includes('shopify') || message.includes('online store')) {
    return "E-commerce integration made easy! We can connect Shopify, WooCommerce, or any e-commerce platform with your inventory management, accounting, and CRM systems.";
  }

  if (message.includes('automation') || message.includes('workflow')) {
    return "Business automation is at the heart of what we do! Our BAF creates intelligent workflows that eliminate manual data entry and reduce errors across your entire business ecosystem.";
  }

  if (message.includes('price') || message.includes('cost')) {
    return "Our pricing is tailored to your specific integration needs. Let's discuss your requirements in a free consultation to provide you with a customized quote that fits your budget.";
  }

  if (message.includes('demo') || message.includes('show me')) {
    return "I'd love to show you our BAF in action! You can watch our intro video or book a personalized demo where we'll show you exactly how our platform can transform your business processes.";
  }

  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm Ella, your personal integration assistant. I'm here to help you discover how com:con's Best Application Framework (BAF) can streamline your business operations. What would you like to know?";
  }

  // Default helpful response
  return "I'm here to help with all your automation and integration needs! Our BAF platform connects different business systems to eliminate manual work and improve efficiency. What specific challenge can I help you solve today?";
};
