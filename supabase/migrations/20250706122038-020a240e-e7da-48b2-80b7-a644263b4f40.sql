
-- Create connectors/integrations table for the catalog
CREATE TABLE public.connectors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert sample connector data
INSERT INTO public.connectors (name, category, description) VALUES
('SAP ERP', 'ERP', 'Complete enterprise resource planning integration with real-time data synchronization'),
('Salesforce CRM', 'CRM', 'Customer relationship management platform with advanced lead tracking'),
('Microsoft Dynamics', 'ERP', 'Business applications suite for financial and operational management'),
('HubSpot', 'CRM', 'Inbound marketing and sales platform with automation tools'),
('Oracle NetSuite', 'ERP', 'Cloud-based business management suite for growing companies'),
('Shopify', 'E-Commerce', 'E-commerce platform integration for online store management'),
('WooCommerce', 'E-Commerce', 'WordPress-based e-commerce solution with flexible customization'),
('QuickBooks', 'Accounting', 'Small business accounting and financial management software'),
('Xero', 'Accounting', 'Cloud-based accounting platform for small to medium businesses'),
('Mailchimp', 'Marketing', 'Email marketing and automation platform integration'),
('Slack', 'Communication', 'Team collaboration and communication platform'),
('Microsoft Teams', 'Communication', 'Unified communication and collaboration platform'),
('Zoom', 'Communication', 'Video conferencing and webinar platform integration'),
('DocuSign', 'Document', 'Electronic signature and document management solution'),
('Dropbox Business', 'Storage', 'Cloud storage and file sharing platform for businesses');

-- Create consultation requests table for lead capture
CREATE TABLE public.consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security (RLS) for both tables
ALTER TABLE public.connectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to connectors
CREATE POLICY "Anyone can view connectors" 
  ON public.connectors 
  FOR SELECT 
  USING (true);

-- Create policy for public insert access to consultation requests
CREATE POLICY "Anyone can create consultation requests" 
  ON public.consultation_requests 
  FOR INSERT 
  WITH CHECK (true);
