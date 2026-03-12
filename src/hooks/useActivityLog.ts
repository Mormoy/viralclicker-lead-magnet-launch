import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export function useActivityLog() {
  const { tenantId, profile } = useAuth();

  const logActivity = useCallback(async ({
    entityType,
    entityId,
    actionType,
    description,
    oldValue,
    newValue,
  }: {
    entityType: string;
    entityId: string;
    actionType: string;
    description?: string;
    oldValue?: string;
    newValue?: string;
  }) => {
    if (!tenantId) return;
    
    await supabase.from("activity_log" as any).insert({
      tenant_id: tenantId,
      entity_type: entityType,
      entity_id: entityId,
      action_type: actionType,
      description: description || '',
      old_value: oldValue || null,
      new_value: newValue || null,
      created_by: profile?.full_name || profile?.email || 'Sistema',
    });
  }, [tenantId, profile]);

  return { logActivity };
}
