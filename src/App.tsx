
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLanguage } from "./hooks/useLanguage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import IntegrationsPage from "./pages/IntegrationsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header 
              currentLanguage={currentLanguage}
              onLanguageToggle={toggleLanguage}
            />
            
            <main className="flex-1">
              <Routes>
                <Route 
                  path="/" 
                  element={<HomePage currentLanguage={currentLanguage} />} 
                />
                <Route 
                  path="/integrations" 
                  element={<IntegrationsPage currentLanguage={currentLanguage} />} 
                />
                <Route 
                  path="/contact" 
                  element={<ContactPage currentLanguage={currentLanguage} />} 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            <Footer currentLanguage={currentLanguage} />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
