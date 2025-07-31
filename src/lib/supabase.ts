import { createClient } from '@supabase/supabase-js'

// For Lovable's native Supabase integration, these will be automatically provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: 'user' | 'admin'
          college: string | null
          course: string | null
          year: string | null
          resume_url: string | null
          prep_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: 'user' | 'admin'
          college?: string | null
          course?: string | null
          year?: string | null
          resume_url?: string | null
          prep_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'user' | 'admin'
          college?: string | null
          course?: string | null
          year?: string | null
          resume_url?: string | null
          prep_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      usage_analytics: {
        Row: {
          id: string
          user_id: string
          action: string
          details: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          details?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          details?: any
          created_at?: string
        }
      }
    }
  }
}