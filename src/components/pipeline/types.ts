// Pipeline deal types for multi-tenant ViralClicker
export interface StageConfig {
  id: string;
  tenant_id: string;
  name: string;
  slug: string;
  color: string;
  sort_order: number;
  is_default: boolean;
  stage_type: string;
}

export interface Deal {
  id: string;
  tenant_id: string;
  stage: string;
  stage_id: string | null;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  source: string | null;
  value: number;
  priority: string;
  notes: string | null;
  next_followup: string | null;
  created_at: string;
  updated_at: string;
  assigned_to: string | null;
  loss_reason: string | null;
  loss_reason_detail: string | null;
  tags: string[] | null;
  internal_notes: string | null;
  next_action: string | null;
  next_action_at: string | null;
  first_contact_at: string | null;
  last_interaction_at: string | null;
  visit_scheduled_at: string | null;
  visit_completed_at: string | null;
  visit_address: string | null;
  visit_notes: string | null;
  final_value: number | null;
}

export interface AlertInfo {
  text: string;
  type: 'danger' | 'warning' | 'info' | 'purple';
  category: string;
}
