import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PostWestphalianOrder from "./pages/PostWestphalianOrder.tsx";
import NewsIndex from "./pages/NewsIndex.tsx";
import NewsArticle from "./pages/NewsArticle.tsx";
import JuridicalSingularity from "./pages/JuridicalSingularity.tsx";
import ElectricTechnocracy from "./pages/ElectricTechnocracy.tsx";
import ResearchPage from "./pages/ResearchPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/juridical-singularity.html" element={<JuridicalSingularity />} />
          <Route path="/juridical-singularity" element={<JuridicalSingularity />} />
          <Route path="/electric-technocracy.html" element={<ElectricTechnocracy />} />
          <Route path="/electric-technocracy" element={<ElectricTechnocracy />} />
          <Route path="/research.html" element={<ResearchPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/news.html" element={<NewsIndex />} />
          <Route path="/news" element={<NewsIndex />} />
          <Route path="/news/post-westphalian-order.html" element={<PostWestphalianOrder />} />
          <Route path="/news/post-westphalian-order" element={<PostWestphalianOrder />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
