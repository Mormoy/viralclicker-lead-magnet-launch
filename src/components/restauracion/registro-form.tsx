import { useState } from 'react';
import { z } from 'zod';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUtm, utmSummary } from '@/hooks/use-utm';
import { copy, type Lang } from './copy';

const schema = z.object({
  nombre: z.string().trim().min(2).max(120),
  telefono: z.string().trim().regex(/^[\d\s+()-]{8,20}$/),
  negocio: z.string().trim().min(1),
});

type FieldErrors = Partial<Record<'nombre' | 'telefono' | 'negocio' | 'submit', string>>;

// Postgres/PostgREST cuando la columna todavía no existe en la tabla o en el schema cache.
const isUnknownColumn = (error: { code?: string; message?: string }) =>
  error.code === '42703' ||
  error.code === 'PGRST204' ||
  /column .* does not exist|schema cache/i.test(error.message ?? '');

type Props = { lang: Lang; variant?: 'default' | 'compact' };

const RegistroForm = ({ lang, variant = 'default' }: Props) => {
  const c = copy(lang).form;
  const utm = useUtm();

  const [values, setValues] = useState({ nombre: '', telefono: '', negocio: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const setField = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, submit: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({
        nombre: flat.nombre ? c.errors.name : undefined,
        telefono: flat.telefono ? c.errors.phone : undefined,
        negocio: flat.negocio ? c.errors.business : undefined,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const attribution = utmSummary(utm);
      // `leads` exige correo/empresa/ciudad: el formulario del nicho pide solo 3 datos,
      // así que el resto va con marcadores y la campaña queda además en texto plano.
      const baseLead = {
        nombre: parsed.data.nombre,
        whatsapp: parsed.data.telefono,
        rubro: parsed.data.negocio,
        correo: `${Date.now()}@restauracion.viralclicker.com`,
        empresa: 'N/A',
        ciudad: 'N/A',
        mensaje: `Landing /restauracion (${lang.toUpperCase()}) · ${attribution || 'sin UTM'}`,
      };

      // Columnas de atribución (migración 20260727_add_utm_columns_to_leads).
      const payload = { ...baseLead, ...utm, landing_page: '/restauracion' };

      const { error } = await supabase.from('leads').insert([payload as never]);

      if (error) {
        // Si la migración de UTM aún no está aplicada, el lead NO se pierde:
        // se guarda con los campos base y la campaña queda en `mensaje`.
        if (!isUnknownColumn(error)) throw error;
        const { error: fallbackError } = await supabase.from('leads').insert([baseLead]);
        if (fallbackError) throw fallbackError;
      }

      setIsDone(true);
    } catch (error) {
      console.error('Error al guardar el registro de /restauracion:', error);
      setErrors({ submit: c.errors.submit });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
          <CheckCircle2 className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{c.successTitle}</h3>
        <p className="mt-2 text-slate-600">{c.successBody}</p>
      </div>
    );
  }

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
      hasError ? 'border-red-400' : 'border-slate-200'
    }`;

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(16,24,40,.08)] ${
        variant === 'compact' ? 'p-6' : 'p-7 md:p-9'
      }`}
    >
      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">{c.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{c.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="rf-nombre" className="mb-1.5 block text-sm font-semibold text-slate-700">{c.name}</label>
          <input
            id="rf-nombre"
            name="name"
            autoComplete="name"
            value={values.nombre}
            onChange={(e) => setField('nombre', e.target.value)}
            placeholder={c.namePlaceholder}
            disabled={isSubmitting}
            className={inputClass(errors.nombre)}
          />
          {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
        </div>

        <div>
          <label htmlFor="rf-telefono" className="mb-1.5 block text-sm font-semibold text-slate-700">{c.phone}</label>
          <input
            id="rf-telefono"
            name="tel"
            type="tel"
            autoComplete="tel"
            value={values.telefono}
            onChange={(e) => setField('telefono', e.target.value)}
            placeholder={c.phonePlaceholder}
            disabled={isSubmitting}
            className={inputClass(errors.telefono)}
          />
          {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
        </div>

        <div>
          <label htmlFor="rf-negocio" className="mb-1.5 block text-sm font-semibold text-slate-700">{c.business}</label>
          <select
            id="rf-negocio"
            name="business"
            value={values.negocio}
            onChange={(e) => setField('negocio', e.target.value)}
            disabled={isSubmitting}
            className={inputClass(errors.negocio)}
          >
            <option value="">{c.businessPlaceholder}</option>
            {c.businessOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.negocio && <p className="mt-1 text-sm text-red-600">{errors.negocio}</p>}
        </div>

        {errors.submit && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errors.submit}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          data-cta="registro-restauracion"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? c.submitting : c.submit}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5" /> {c.privacy}
        </p>
      </form>
    </div>
  );
};

export default RegistroForm;
