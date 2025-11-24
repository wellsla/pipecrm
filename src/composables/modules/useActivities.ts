import { ref } from 'vue'
import { activitiesService } from '@/services/modules/activities/activities.service'
import { trackError } from '@/core/errors/error.tracking'
import { mapSupabasePostgrestError } from '@/core/errors/supabase/error.mapping'
import type { DealActivity, DealActivityInsert, DealActivityUpdate } from '@/services/modules/activities/activities.types'
import type { PostgrestError } from '@supabase/supabase-js'

/**
 * Composable for managing deal activities
 * Provides reactive state and CRUD operations for activities
 */
export function useActivities() {
  const activities = ref<DealActivity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch activities for a specific deal
   */
  const fetchActivitiesByDeal = async (dealId: string) => {
    loading.value = true
    error.value = null

    try {
      activities.value = await activitiesService.fetchByDeal(dealId)
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError)
      error.value = appError.message
      trackError(appError, 'useActivities.fetchActivitiesByDeal')
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch recent activities across all deals
   */
  const fetchRecentActivities = async (limit: number = 10) => {
    loading.value = true
    error.value = null

    try {
      activities.value = await activitiesService.fetchRecent(limit)
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError)
      error.value = appError.message
      trackError(appError, 'useActivities.fetchRecentActivities')
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new activity
   */
  const createActivity = async (activity: DealActivityInsert) => {
    loading.value = true
    error.value = null

    try {
      const newActivity = await activitiesService.create(activity)
      activities.value.unshift(newActivity)
      return newActivity
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError)
      error.value = appError.message
      trackError(appError, 'useActivities.createActivity')
      throw appError
    } finally {
      loading.value = false
    }
  }

  /**
   * Update an existing activity
   */
  const updateActivity = async (id: string, updates: DealActivityUpdate) => {
    loading.value = true
    error.value = null

    try {
      const updatedActivity = await activitiesService.update(id, updates)
      const index = activities.value.findIndex((a) => a.id === id)
      if (index !== -1) {
        activities.value[index] = updatedActivity
      }
      return updatedActivity
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError)
      error.value = appError.message
      trackError(appError, 'useActivities.updateActivity')
      throw appError
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete an activity
   */
  const deleteActivity = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await activitiesService.delete(id)
      activities.value = activities.value.filter((a) => a.id !== id)
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError)
      error.value = appError.message
      trackError(appError, 'useActivities.deleteActivity')
      throw appError
    } finally {
      loading.value = false
    }
  }

  return {
    activities,
    loading,
    error,
    fetchActivitiesByDeal,
    fetchRecentActivities,
    createActivity,
    updateActivity,
    deleteActivity
  }
}
