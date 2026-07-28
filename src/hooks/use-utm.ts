import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Captura de atribución: de qué anuncio viene cada registro.
// Se guarda en sessionStorage para que sobreviva a la navegación interna
// (el visitante puede ir a /precios y volver antes de registrarse).
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const STORAGE_KEY = 'vc_utm';
const MAX_LEN = 180;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const readStored = (): UtmParams => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
};

export const useUtm = (): UtmParams => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const fromUrl = UTM_KEYS.reduce<UtmParams>((acc, key) => {
      const value = searchParams.get(key);
      return value ? { ...acc, [key]: value.slice(0, MAX_LEN) } : acc;
    }, {});

    if (Object.keys(fromUrl).length === 0) return readStored();

    // La URL manda: si el visitante vuelve por otro anuncio, se pisa la atribución vieja.
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      // sessionStorage bloqueado (modo privado / iframe): la atribución igual viaja en memoria.
    }
    return fromUrl;
  }, [searchParams]);
};

// Resumen legible para dejar rastro de la campaña también en texto plano.
export const utmSummary = (utm: UtmParams): string =>
  UTM_KEYS.filter((key) => utm[key]).map((key) => `${key}=${utm[key]}`).join(' · ');
