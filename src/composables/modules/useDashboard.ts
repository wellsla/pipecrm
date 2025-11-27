import { ref } from 'vue'
import { dashboardService } from '@/services/modules/dashboard.service'
import { trackError } from '@/errors/tracking'
import { mapSupabasePostgrestError } from '@/errors/supabase/supabase.mapping'
import type { DashboardMetrics } from '@/types/modules/dashboard.types'
import type { PostgrestError } from '@supabase/supabase-js'

export const useDashboard = () => {
  const metrics = ref<DashboardMetrics | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getMetrics = async () => {
    loading.value = true
    error.value = null

    try {
      metrics.value = await dashboardService.getMetrics()
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError)
      error.value = appError.message
      trackError(appError, 'useDashboard.getMetrics')
    } finally {
      loading.value = false
    }
  }

  const refreshMetrics = async () => {
    await getMetrics()
  }

  return {
    metrics,
    loading,
    error,
    getMetrics,
    refreshMetrics
  }
}
