import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import ViralClicker from "./pages/ClickCRM";
import Gracias from "./pages/Gracias";
import Admin from "./pages/Admin";
import AdminCotizaciones from "./pages/AdminCotizaciones";
import PlaybookClickCRM from "./pages/Playbook";
import Success from "./pages/Success";
import PagoFallido from "./pages/PagoFallido";
import Checkout from "./pages/Checkout";
import Terminos from "./pages/Terminos";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import RegisterCompany from "./pages/RegisterCompany";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import PipelinePage from "./pages/dashboard/PipelinePage";
import LeadsPage from "./pages/dashboard/LeadsPage";
import CustomersPage from "./pages/dashboard/CustomersPage";
import IntegrationsPage from "./pages/dashboard/IntegrationsPage";
import QuoteBuilderPage from "./pages/dashboard/QuoteBuilderPage";
import QuotesListPage from "./pages/dashboard/QuotesListPage";
import SmartQuotePage from "./pages/SmartQuotePage";
import QuoteViewPage from "./pages/QuoteViewPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public / Landing */}
            <Route path="/" element={<ViralClicker />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/playbook" element={<PlaybookClickCRM />} />
            <Route path="/success" element={<Success />} />
            <Route path="/pago-fallido" element={<PagoFallido />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/terminos" element={<Terminos />} />

            {/* Smart Quote Pages (public) */}
            <Route path="/q/:slug" element={<SmartQuotePage />} />
            <Route path="/q/view/:shortCode" element={<QuoteViewPage />} />
            <Route path="/quote/:tenantSlug/:pageSlug" element={<SmartQuotePage />} />

            {/* Auth */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/register-company" element={<RegisterCompany />} />

            {/* Legacy admin (kept for platform owner) */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/cotizaciones" element={<AdminCotizaciones />} />

            {/* Tenant Dashboard */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="pipeline" element={<PipelinePage />} />
              <Route path="leads" element={<LeadsPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="quote-builder" element={<QuoteBuilderPage />} />
              <Route path="quotes" element={<QuotesListPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
