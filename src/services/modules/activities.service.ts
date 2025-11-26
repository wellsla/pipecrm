import { supabase } from '@/db/supabase.client'
import type { DealActivityInsert, DealActivityUpdate } from '@/types/modules/activities.types'

export const activitiesService = {
  async getByDeal(dealId: string) {
    const { data, error } = await supabase
      .from('deal_activities')
      .select('*')
      .eq('deal_id', dealId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('deal_activities')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(activity: DealActivityInsert) {
    const { data, error } = await supabase
      .from('deal_activities')
      .insert(activity)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: DealActivityUpdate) {
    const { data, error } = await supabase
      .from('deal_activities')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase.from('deal_activities').delete().eq('id', id)

    if (error) throw error
  },

  async getRecent(limit: number = 10) {
    const { data, error } = await supabase
      .from('deal_activities')
      .select('*, deals(title)')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }
}
