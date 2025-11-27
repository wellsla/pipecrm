import { ref } from 'vue'
import { activitiesService } from '@/services/modules/activities.service'
import { trackError } from '@/errors/tracking'
import { mapSupabasePostgrestError } from '@/errors/supabase/supabase.mapping'
import type { DealActivity, DealActivityInsert, DealActivityUpdate } from '@/types/modules/activities.types'
import type { PostgrestError } from '@supabase/supabase-js'

export const useActivities = () => {
  const activities = ref<DealActivity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getActivitiesByDeal = async (dealId: string) => {
    loading.value = true
    error.value = null

    try {
      activities.value = await activitiesService.getByDeal(dealId)
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError)
      error.value = appError.message
      trackError(appError, 'useActivities.getActivitiesByDeal')
    } finally {
      loading.value = false
    }
  }

  const getRecentActivities = async (limit: number = 10) => {
    loading.value = true
    error.value = null

    try {
      activities.value = await activitiesService.getRecent(limit)
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError)
      error.value = appError.message
      trackError(appError, 'useActivities.getRecentActivities')
    } finally {
      loading.value = false
    }
  }

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
    getActivitiesByDeal,
    getRecentActivities,
    createActivity,
    updateActivity,
    deleteActivity
  }
}
