import { differenceInHours, differenceInDays, isToday } from "date-fns";
import type { Deal, StageConfig, AlertInfo } from "./types";

export const getDealAlerts = (deal: Deal, stage: StageConfig | undefined): AlertInfo[] => {
  const alerts: AlertInfo[] = [];
  if (!stage) return alerts;
  const now = new Date();
  const changedAt = new Date(deal.updated_at);
  const hoursSinceChange = differenceInHours(now, changedAt);
  const daysSinceChange = differenceInDays(now, changedAt);
  const stageType = stage.stage_type || 'normal';

  if (stageType === 'won' || stageType === 'lost') return alerts;

  if (stage.sort_order === 0 && hoursSinceChange >= 4) {
    alerts.push({ text: `${hoursSinceChange}h sin contactar`, type: 'danger', category: 'sin_contactar' });
  }
  if (['web', 'ads'].includes(deal.source || '') && stage.sort_order <= 1 && hoursSinceChange >= 24) {
    alerts.push({ text: 'Sin respuesta', type: 'warning', category: 'sin_respuesta' });
  }
  if (daysSinceChange >= 3 && stage.sort_order >= 1 && stage.sort_order <= 4) {
    alerts.push({ text: `${daysSinceChange}d sin movimiento`, type: 'warning', category: 'sin_movimiento' });
  }
  if (deal.visit_scheduled_at && isToday(new Date(deal.visit_scheduled_at))) {
    alerts.push({ text: 'Visita hoy', type: 'info', category: 'visita_hoy' });
  }
  if (stage.sort_order >= 5 && daysSinceChange >= 5) {
    alerts.push({ text: `${daysSinceChange}d post-visita`, type: 'purple', category: 'seguimiento_estancado' });
  }

  return alerts;
};
