import { supabase } from '@/core/db/supabase.client'
import type { DealActivityInsert, DealActivityUpdate } from '@/services/modules/activities/activities.types'

/**
 * Activities Service
 * CRUD operations for deal activities (notes, calls, emails, meetings, tasks)
 */

export const activitiesService = {
  /**
   * Fetch all activities for a specific deal
   * @param dealId - The deal ID
   * @returns Array of activities ordered by date descending
   */
  async fetchByDeal(dealId: string) {
    const { data, error } = await supabase
      .from('deal_activities')
      .select('*')
      .eq('deal_id', dealId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  /**
   * Fetch a single activity by ID
   * @param id - Activity ID
   */
  async fetchById(id: string) {
    const { data, error } = await supabase
      .from('deal_activities')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Create a new activity
   * @param activity - Activity data to insert
   */
  async create(activity: DealActivityInsert) {
    const { data, error } = await supabase
      .from('deal_activities')
      .insert(activity)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Update an existing activity
   * @param id - Activity ID
   * @param updates - Partial activity data to update
   */
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

  /**
   * Delete an activity
   * @param id - Activity ID
   */
  async delete(id: string) {
    const { error } = await supabase.from('deal_activities').delete().eq('id', id)

    if (error) throw error
  },

  /**
   * Fetch recent activities across all deals for a user
   * @param ownerId - User ID
   * @param limit - Number of activities to fetch (default: 10)
   */
  async fetchRecent(limit: number = 10) {
    const { data, error } = await supabase
      .from('deal_activities')
      .select('*, deals(title)')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }
}
