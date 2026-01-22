import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViralClicker from "./pages/ClickCRM";
import Gracias from "./pages/Gracias";
import Admin from "./pages/Admin";
import PlaybookClickCRM from "./pages/Playbook";
import Success from "./pages/Success";
import PagoFallido from "./pages/PagoFallido";
import Checkout from "./pages/Checkout";
import Terminos from "./pages/Terminos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViralClicker />} />
          <Route path="/gracias" element={<Gracias />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/playbook" element={<PlaybookClickCRM />} />
          <Route path="/success" element={<Success />} />
          <Route path="/pago-fallido" element={<PagoFallido />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
