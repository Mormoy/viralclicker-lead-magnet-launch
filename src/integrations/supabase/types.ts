export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          calendly_event_date: string | null
          calendly_event_url: string | null
          ciudad: string | null
          contrato_aceptado: boolean | null
          contrato_timestamp: string | null
          correo: string
          created_at: string
          empresa: string
          estado: string
          id: string
          monto: number
          nombre: string
          notas: string | null
          plan: string
          setup_type: string | null
          stripe_customer_id: string | null
          stripe_payment_intent_id: string | null
          stripe_subscription_id: string | null
          tenant_id: string | null
          updated_at: string
          webhook_n8n_url: string | null
          whatsapp: string
        }
        Insert: {
          calendly_event_date?: string | null
          calendly_event_url?: string | null
          ciudad?: string | null
          contrato_aceptado?: boolean | null
          contrato_timestamp?: string | null
          correo: string
          created_at?: string
          empresa: string
          estado?: string
          id?: string
          monto: number
          nombre: string
          notas?: string | null
          plan: string
          setup_type?: string | null
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string | null
          updated_at?: string
          webhook_n8n_url?: string | null
          whatsapp: string
        }
        Update: {
          calendly_event_date?: string | null
          calendly_event_url?: string | null
          ciudad?: string | null
          contrato_aceptado?: boolean | null
          contrato_timestamp?: string | null
          correo?: string
          created_at?: string
          empresa?: string
          estado?: string
          id?: string
          monto?: number
          nombre?: string
          notas?: string | null
          plan?: string
          setup_type?: string | null
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string | null
          updated_at?: string
          webhook_n8n_url?: string | null
          whatsapp?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cotizaciones: {
        Row: {
          accion_recomendada: string | null
          adset: string | null
          ajuste_necesario: boolean | null
          campana: string | null
          ciudad: string | null
          comprobante_pago: string | null
          correo: string | null
          created_at: string
          direccion: string | null
          direccion_visita: string | null
          empresa: string | null
          estado: Database["public"]["Enums"]["cotizacion_estado"]
          estado_anterior:
            | Database["public"]["Enums"]["cotizacion_estado"]
            | null
          fecha_cambio_estado: string | null
          fecha_envio_cotizacion: string | null
          fecha_estimada_entrega: string | null
          fecha_inicio_fabricacion: string | null
          fecha_instalacion: string | null
          fecha_primer_contacto: string | null
          fecha_visita: string | null
          fotos_entrega: string[] | null
          fuente: Database["public"]["Enums"]["cotizacion_fuente"]
          id: string
          lead_id: string | null
          metodo_pago: string | null
          monto_anticipo: number | null
          motivo_perdida: Database["public"]["Enums"]["motivo_perdida"] | null
          motivo_perdida_texto: string | null
          nombre: string
          notas_internas: string | null
          prioridad: Database["public"]["Enums"]["cotizacion_prioridad"]
          proximo_seguimiento: string | null
          resultado_visita: string | null
          satisfaccion: number | null
          tags: string[] | null
          tenant_id: string | null
          ultima_interaccion: string | null
          updated_at: string
          valor_estimado: number | null
          valor_final: number | null
          whatsapp: string
        }
        Insert: {
          accion_recomendada?: string | null
          adset?: string | null
          ajuste_necesario?: boolean | null
          campana?: string | null
          ciudad?: string | null
          comprobante_pago?: string | null
          correo?: string | null
          created_at?: string
          direccion?: string | null
          direccion_visita?: string | null
          empresa?: string | null
          estado?: Database["public"]["Enums"]["cotizacion_estado"]
          estado_anterior?:
            | Database["public"]["Enums"]["cotizacion_estado"]
            | null
          fecha_cambio_estado?: string | null
          fecha_envio_cotizacion?: string | null
          fecha_estimada_entrega?: string | null
          fecha_inicio_fabricacion?: string | null
          fecha_instalacion?: string | null
          fecha_primer_contacto?: string | null
          fecha_visita?: string | null
          fotos_entrega?: string[] | null
          fuente?: Database["public"]["Enums"]["cotizacion_fuente"]
          id?: string
          lead_id?: string | null
          metodo_pago?: string | null
          monto_anticipo?: number | null
          motivo_perdida?: Database["public"]["Enums"]["motivo_perdida"] | null
          motivo_perdida_texto?: string | null
          nombre: string
          notas_internas?: string | null
          prioridad?: Database["public"]["Enums"]["cotizacion_prioridad"]
          proximo_seguimiento?: string | null
          resultado_visita?: string | null
          satisfaccion?: number | null
          tags?: string[] | null
          tenant_id?: string | null
          ultima_interaccion?: string | null
          updated_at?: string
          valor_estimado?: number | null
          valor_final?: number | null
          whatsapp: string
        }
        Update: {
          accion_recomendada?: string | null
          adset?: string | null
          ajuste_necesario?: boolean | null
          campana?: string | null
          ciudad?: string | null
          comprobante_pago?: string | null
          correo?: string | null
          created_at?: string
          direccion?: string | null
          direccion_visita?: string | null
          empresa?: string | null
          estado?: Database["public"]["Enums"]["cotizacion_estado"]
          estado_anterior?:
            | Database["public"]["Enums"]["cotizacion_estado"]
            | null
          fecha_cambio_estado?: string | null
          fecha_envio_cotizacion?: string | null
          fecha_estimada_entrega?: string | null
          fecha_inicio_fabricacion?: string | null
          fecha_instalacion?: string | null
          fecha_primer_contacto?: string | null
          fecha_visita?: string | null
          fotos_entrega?: string[] | null
          fuente?: Database["public"]["Enums"]["cotizacion_fuente"]
          id?: string
          lead_id?: string | null
          metodo_pago?: string | null
          monto_anticipo?: number | null
          motivo_perdida?: Database["public"]["Enums"]["motivo_perdida"] | null
          motivo_perdida_texto?: string | null
          nombre?: string
          notas_internas?: string | null
          prioridad?: Database["public"]["Enums"]["cotizacion_prioridad"]
          proximo_seguimiento?: string | null
          resultado_visita?: string | null
          satisfaccion?: number | null
          tags?: string[] | null
          tenant_id?: string | null
          ultima_interaccion?: string | null
          updated_at?: string
          valor_estimado?: number | null
          valor_final?: number | null
          whatsapp?: string
        }
        Relationships: [
          {
            foreignKeyName: "cotizaciones_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cotizaciones_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cotizaciones_actividad: {
        Row: {
          cotizacion_id: string
          created_at: string
          descripcion: string
          estado_anterior:
            | Database["public"]["Enums"]["cotizacion_estado"]
            | null
          estado_nuevo: Database["public"]["Enums"]["cotizacion_estado"] | null
          id: string
          tipo: string
          usuario: string | null
        }
        Insert: {
          cotizacion_id: string
          created_at?: string
          descripcion: string
          estado_anterior?:
            | Database["public"]["Enums"]["cotizacion_estado"]
            | null
          estado_nuevo?: Database["public"]["Enums"]["cotizacion_estado"] | null
          id?: string
          tipo: string
          usuario?: string | null
        }
        Update: {
          cotizacion_id?: string
          created_at?: string
          descripcion?: string
          estado_anterior?:
            | Database["public"]["Enums"]["cotizacion_estado"]
            | null
          estado_nuevo?: Database["public"]["Enums"]["cotizacion_estado"] | null
          id?: string
          tipo?: string
          usuario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cotizaciones_actividad_cotizacion_id_fkey"
            columns: ["cotizacion_id"]
            isOneToOne: false
            referencedRelation: "cotizaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations_settings: {
        Row: {
          calendly_url: string | null
          contract_url: string | null
          created_at: string
          id: string
          updated_at: string
          webhook_n8n_url: string | null
        }
        Insert: {
          calendly_url?: string | null
          contract_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          webhook_n8n_url?: string | null
        }
        Update: {
          calendly_url?: string | null
          contract_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          webhook_n8n_url?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          ciudad: string
          correo: string
          created_at: string
          empresa: string
          estado: string
          id: string
          mensaje: string | null
          nombre: string
          rubro: string
          tenant_id: string | null
          updated_at: string
          whatsapp: string
        }
        Insert: {
          ciudad: string
          correo: string
          created_at?: string
          empresa: string
          estado?: string
          id?: string
          mensaje?: string | null
          nombre: string
          rubro: string
          tenant_id?: string | null
          updated_at?: string
          whatsapp: string
        }
        Update: {
          ciudad?: string
          correo?: string
          created_at?: string
          empresa?: string
          estado?: string
          id?: string
          mensaje?: string | null
          nombre?: string
          rubro?: string
          tenant_id?: string | null
          updated_at?: string
          whatsapp?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      plantillas_whatsapp: {
        Row: {
          activa: boolean | null
          contenido: string
          created_at: string
          estado_aplicable: Database["public"]["Enums"]["cotizacion_estado"]
          id: string
          nombre: string
          tenant_id: string | null
          updated_at: string
          variables: string[] | null
        }
        Insert: {
          activa?: boolean | null
          contenido: string
          created_at?: string
          estado_aplicable: Database["public"]["Enums"]["cotizacion_estado"]
          id?: string
          nombre: string
          tenant_id?: string | null
          updated_at?: string
          variables?: string[] | null
        }
        Update: {
          activa?: boolean | null
          contenido?: string
          created_at?: string
          estado_aplicable?: Database["public"]["Enums"]["cotizacion_estado"]
          id?: string
          nombre?: string
          tenant_id?: string | null
          updated_at?: string
          variables?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "plantillas_whatsapp_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          name: string
          owner_email: string
          plan: string
          setup_type: string
          slug: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          name: string
          owner_email: string
          plan?: string
          setup_type?: string
          slug?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          name?: string
          owner_email?: string
          plan?: string
          setup_type?: string
          slug?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          image_url: string | null
          message: string
          name: string
          position: string | null
          rating: number
          status: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          image_url?: string | null
          message: string
          name: string
          position?: string | null
          rating?: number
          status?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          image_url?: string | null
          message?: string
          name?: string
          position?: string | null
          rating?: number
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cotizacion_estado:
        | "nuevo"
        | "contactado"
        | "cotizacion_enviada"
        | "en_decision"
        | "visita_agendada"
        | "visita_realizada"
        | "propuesta_final_enviada"
        | "anticipo_pagado"
        | "en_fabricacion"
        | "listo_instalar"
        | "instalado_entregado"
        | "cerrado_ganado"
        | "perdido"
      cotizacion_fuente: "ads" | "web" | "organico" | "referido" | "manual"
      cotizacion_prioridad: "alta" | "media" | "baja"
      motivo_perdida:
        | "precio"
        | "sin_medidas"
        | "comparando"
        | "no_respondio"
        | "fuera_zona"
        | "plazo_disponibilidad"
        | "otro"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      cotizacion_estado: [
        "nuevo",
        "contactado",
        "cotizacion_enviada",
        "en_decision",
        "visita_agendada",
        "visita_realizada",
        "propuesta_final_enviada",
        "anticipo_pagado",
        "en_fabricacion",
        "listo_instalar",
        "instalado_entregado",
        "cerrado_ganado",
        "perdido",
      ],
      cotizacion_fuente: ["ads", "web", "organico", "referido", "manual"],
      cotizacion_prioridad: ["alta", "media", "baja"],
      motivo_perdida: [
        "precio",
        "sin_medidas",
        "comparando",
        "no_respondio",
        "fuera_zona",
        "plazo_disponibilidad",
        "otro",
      ],
    },
  },
} as const
