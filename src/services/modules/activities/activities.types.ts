import type { Database } from '@/core/db/supabase.types'

// Supabase generated types
export type DealActivity = Database['public']['Tables']['deal_activities']['Row']
export type DealActivityInsert = Database['public']['Tables']['deal_activities']['Insert']
export type DealActivityUpdate = Database['public']['Tables']['deal_activities']['Update']

// Activity type enum matching Supabase enum
export enum ActivityType {
  NOTE = 'note',
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  TASK = 'task',
  OTHER = 'other'
}

// Extended type with computed properties for UI
export interface DealActivityWithMeta extends DealActivity {
  formattedDate?: string
  icon?: string
  colorClass?: string
}
