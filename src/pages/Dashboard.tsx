import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
    if (!loading && user && profile && !profile.tenant_id) {
      navigate("/register-company");
    }
  }, [loading, user, profile, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile?.tenant_id) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
