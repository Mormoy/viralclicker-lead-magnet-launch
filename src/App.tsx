import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClickCRM from "./pages/ClickCRM";
import Gracias from "./pages/Gracias";
import AdminLeads from "./pages/AdminLeads";
import PlaybookClickCRM from "./pages/Playbook";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClickCRM />} />
          <Route path="/gracias" element={<Gracias />} />
          <Route path="/admin" element={<AdminLeads />} />
          <Route path="/playbook" element={<PlaybookClickCRM />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
