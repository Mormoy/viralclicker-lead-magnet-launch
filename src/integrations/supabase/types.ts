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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          session_token: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          session_token: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          session_token?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          actor_name: string | null
          created_at: string
          diff: Json | null
          entity_id: string
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          diff?: Json | null
          entity_id: string
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          diff?: Json | null
          entity_id?: string
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      automations: {
        Row: {
          active: boolean | null
          channels: Json | null
          conditions: Json | null
          created_at: string
          extra_payload: Json | null
          id: string
          name: string
          offset_hours: number | null
          template_id: string | null
          trigger_event: Database["public"]["Enums"]["automation_trigger"]
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          channels?: Json | null
          conditions?: Json | null
          created_at?: string
          extra_payload?: Json | null
          id?: string
          name: string
          offset_hours?: number | null
          template_id?: string | null
          trigger_event: Database["public"]["Enums"]["automation_trigger"]
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          channels?: Json | null
          conditions?: Json | null
          created_at?: string
          extra_payload?: Json | null
          id?: string
          name?: string
          offset_hours?: number | null
          template_id?: string | null
          trigger_event?: Database["public"]["Enums"]["automation_trigger"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "automations_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "message_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      availability_blocks: {
        Row: {
          created_at: string
          date_from: string
          date_to: string
          id: string
          note: string | null
          reason: Database["public"]["Enums"]["availability_reason"]
          unit_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_from: string
          date_to: string
          id?: string
          note?: string | null
          reason: Database["public"]["Enums"]["availability_reason"]
          unit_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_from?: string
          date_to?: string
          id?: string
          note?: string | null
          reason?: Database["public"]["Enums"]["availability_reason"]
          unit_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_blocks_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_article_tags_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "blog_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_article_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_articles: {
        Row: {
          author: string
          category_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_time: number | null
          scheduled_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author?: string
          category_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          scheduled_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author?: string
          category_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          scheduled_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          article_id: string | null
          author_email: string
          author_name: string
          content: string
          created_at: string
          id: string
          status: string
        }
        Insert: {
          article_id?: string | null
          author_email: string
          author_name: string
          content: string
          created_at?: string
          id?: string
          status?: string
        }
        Update: {
          article_id?: string | null
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "blog_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      guests: {
        Row: {
          country: string | null
          created_at: string
          doc_number: string | null
          email: string | null
          first_name: string | null
          full_name: string
          id: string
          last_name: string | null
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          doc_number?: string | null
          email?: string | null
          first_name?: string | null
          full_name: string
          id?: string
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          doc_number?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string
          id?: string
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          channel: Database["public"]["Enums"]["channel_type"]
          channel_listing_id: string | null
          created_at: string
          credentials: Json | null
          ical_url: string | null
          id: string
          is_connected: boolean | null
          last_sync_at: string | null
          mode: Database["public"]["Enums"]["listing_mode"] | null
          unit_id: string
          updated_at: string
        }
        Insert: {
          channel: Database["public"]["Enums"]["channel_type"]
          channel_listing_id?: string | null
          created_at?: string
          credentials?: Json | null
          ical_url?: string | null
          id?: string
          is_connected?: boolean | null
          last_sync_at?: string | null
          mode?: Database["public"]["Enums"]["listing_mode"] | null
          unit_id: string
          updated_at?: string
        }
        Update: {
          channel?: Database["public"]["Enums"]["channel_type"]
          channel_listing_id?: string | null
          created_at?: string
          credentials?: Json | null
          ical_url?: string | null
          id?: string
          is_connected?: boolean | null
          last_sync_at?: string | null
          mode?: Database["public"]["Enums"]["listing_mode"] | null
          unit_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          caption: string | null
          created_at: string
          file_size: number | null
          file_type: string | null
          id: string
          order_index: number | null
          unit_id: string
          updated_at: string
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          order_index?: number | null
          unit_id: string
          updated_at?: string
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          order_index?: number | null
          unit_id?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          body_markdown: string
          channel: Database["public"]["Enums"]["message_channel"]
          created_at: string
          id: string
          key: string
          language: string | null
          name: string
          subject: string | null
          updated_at: string
          variables: Json | null
        }
        Insert: {
          body_markdown: string
          channel: Database["public"]["Enums"]["message_channel"]
          created_at?: string
          id?: string
          key: string
          language?: string | null
          name: string
          subject?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          body_markdown?: string
          channel?: Database["public"]["Enums"]["message_channel"]
          created_at?: string
          id?: string
          key?: string
          language?: string | null
          name?: string
          subject?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          id: string
          name: string
          notes: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      rate_plans: {
        Row: {
          base_price: number
          cancellation_policy: string | null
          created_at: string
          currency: string | null
          id: string
          is_default: boolean | null
          max_nights: number | null
          min_nights: number | null
          name: string
          unit_id: string
          updated_at: string
        }
        Insert: {
          base_price: number
          cancellation_policy?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          is_default?: boolean | null
          max_nights?: number | null
          min_nights?: number | null
          name?: string
          unit_id: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          cancellation_policy?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          is_default?: boolean | null
          max_nights?: number | null
          min_nights?: number | null
          name?: string
          unit_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rate_plans_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      reservation_guests: {
        Row: {
          guest_id: string
          is_primary: boolean | null
          reservation_id: string
        }
        Insert: {
          guest_id: string
          is_primary?: boolean | null
          reservation_id: string
        }
        Update: {
          guest_id?: string
          is_primary?: boolean | null
          reservation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservation_guests_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_guests_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          channel: Database["public"]["Enums"]["channel_type"]
          channel_res_id: string | null
          checkin_date: string
          checkout_date: string
          created_at: string
          currency: string | null
          guests_adults: number | null
          guests_children: number | null
          hold_security_deposit: number | null
          id: string
          nights: number
          payout_estimated: number | null
          special_requests: string | null
          status: Database["public"]["Enums"]["reservation_status"] | null
          total_price: number
          unit_id: string
          updated_at: string
        }
        Insert: {
          channel: Database["public"]["Enums"]["channel_type"]
          channel_res_id?: string | null
          checkin_date: string
          checkout_date: string
          created_at?: string
          currency?: string | null
          guests_adults?: number | null
          guests_children?: number | null
          hold_security_deposit?: number | null
          id?: string
          nights: number
          payout_estimated?: number | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["reservation_status"] | null
          total_price: number
          unit_id: string
          updated_at?: string
        }
        Update: {
          channel?: Database["public"]["Enums"]["channel_type"]
          channel_res_id?: string | null
          checkin_date?: string
          checkout_date?: string
          created_at?: string
          currency?: string | null
          guests_adults?: number | null
          guests_children?: number | null
          hold_security_deposit?: number | null
          id?: string
          nights?: number
          payout_estimated?: number | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["reservation_status"] | null
          total_price?: number
          unit_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      season_rules: {
        Row: {
          created_at: string
          date_from: string
          date_to: string
          id: string
          min_nights_override: number | null
          name: string | null
          price_override: number | null
          unit_id: string
          updated_at: string
          weekend_markup_pct: number | null
        }
        Insert: {
          created_at?: string
          date_from: string
          date_to: string
          id?: string
          min_nights_override?: number | null
          name?: string | null
          price_override?: number | null
          unit_id: string
          updated_at?: string
          weekend_markup_pct?: number | null
        }
        Update: {
          created_at?: string
          date_from?: string
          date_to?: string
          id?: string
          min_nights_override?: number | null
          name?: string | null
          price_override?: number | null
          unit_id?: string
          updated_at?: string
          weekend_markup_pct?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "season_rules_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
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
          updated_at: string
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
          rating: number
          status?: string
          updated_at?: string
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
          updated_at?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          amenities: Json | null
          baths: number | null
          beds: number | null
          capacity: number | null
          code: string
          created_at: string
          description_long: string | null
          description_short: string | null
          house_rules: string | null
          id: string
          name: string
          property_id: string
          sqft: number | null
          status: Database["public"]["Enums"]["unit_status"] | null
          updated_at: string
        }
        Insert: {
          amenities?: Json | null
          baths?: number | null
          beds?: number | null
          capacity?: number | null
          code: string
          created_at?: string
          description_long?: string | null
          description_short?: string | null
          house_rules?: string | null
          id?: string
          name: string
          property_id: string
          sqft?: number | null
          status?: Database["public"]["Enums"]["unit_status"] | null
          updated_at?: string
        }
        Update: {
          amenities?: Json | null
          baths?: number | null
          beds?: number | null
          capacity?: number | null
          code?: string
          created_at?: string
          description_long?: string | null
          description_short?: string | null
          house_rules?: string | null
          id?: string
          name?: string
          property_id?: string
          sqft?: number | null
          status?: Database["public"]["Enums"]["unit_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          property_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id?: string | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      automation_trigger:
        | "reservation.created"
        | "reservation.updated"
        | "reservation.cancelled"
        | "pricing.changed"
        | "block.created"
        | "guest.message.send"
      availability_reason: "maintenance" | "owner" | "block"
      channel_type: "Airbnb" | "Booking" | "iCal" | "Direct"
      listing_mode: "API" | "ICAL"
      message_channel: "whatsapp" | "email" | "airbnb" | "booking"
      reservation_status: "pre-reserva" | "reserva" | "contrato" | "cancelada"
      unit_status: "active" | "inactive"
      user_role: "owner" | "manager" | "cleaner"
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
      automation_trigger: [
        "reservation.created",
        "reservation.updated",
        "reservation.cancelled",
        "pricing.changed",
        "block.created",
        "guest.message.send",
      ],
      availability_reason: ["maintenance", "owner", "block"],
      channel_type: ["Airbnb", "Booking", "iCal", "Direct"],
      listing_mode: ["API", "ICAL"],
      message_channel: ["whatsapp", "email", "airbnb", "booking"],
      reservation_status: ["pre-reserva", "reserva", "contrato", "cancelada"],
      unit_status: ["active", "inactive"],
      user_role: ["owner", "manager", "cleaner"],
    },
  },
} as const
