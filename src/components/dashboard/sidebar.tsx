import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  Calculator,
  Settings,
  LogOut,
  Zap,
  Kanban,
  Megaphone,
  Plug,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Pipeline", icon: Kanban, href: "/dashboard/pipeline" },
  { label: "Leads", icon: Users, href: "/dashboard/leads" },
  { label: "Clientes", icon: UserCheck, href: "/dashboard/customers" },
  { label: "Quote Builder", icon: Calculator, href: "/dashboard/quote-builder" },
  { label: "Cotizaciones", icon: FileText, href: "/dashboard/quotes" },
  { label: "Campañas", icon: Megaphone, href: "/dashboard/campaigns" },
  { label: "Integraciones", icon: Plug, href: "/dashboard/integrations" },
  { label: "Configuración", icon: Settings, href: "/dashboard/settings" },
];

export function DashboardSidebar() {
  const { profile, signOut } = useAuth();
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground">ViralClicker</span>
        </div>
        {profile && (
          <p className="text-xs text-muted-foreground mt-2 truncate">
            {profile.full_name}
          </p>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  );
}
