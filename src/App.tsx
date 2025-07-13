import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLanguage } from "./hooks/useLanguage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import IntegrationsPage from "./pages/IntegrationsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import ChatFloatButton from "./components/Chat/ChatFloatButton";
import React from "react";

const queryClient = new QueryClient();

function AppLayout() {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const location = useLocation();
  // Only transparent on homepage root
  const isHome = location.pathname === "/";
  const headerVariant = isHome ? "transparent" : "solid";

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentLanguage={currentLanguage}
        onLanguageToggle={toggleLanguage}
        variant={headerVariant}
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
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
          <ChatFloatButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
