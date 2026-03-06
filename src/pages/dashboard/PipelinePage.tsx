import { useAuth } from "@/hooks/use-auth";

export default function PipelinePage() {
  const { tenantId } = useAuth();
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-4">Pipeline CRM</h1>
      <p className="text-muted-foreground">Tu pipeline de ventas — próximamente disponible con drag & drop.</p>
    </div>
  );
}
