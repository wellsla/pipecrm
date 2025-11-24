import { ref } from 'vue'
import { dashboardService } from '@/services/modules/dashboard/dashboard.service'
import { trackError } from '@/core/errors/error.tracking'
import { mapSupabasePostgrestError } from '@/core/errors/supabase/error.mapping'
import type { DashboardMetrics } from '@/services/modules/dashboard/dashboard.types'
import type { PostgrestError } from '@supabase/supabase-js'

/**
 * Composable for managing dashboard metrics
 * Provides reactive state and operations for dashboard data
 */
export function useDashboard() {
  const metrics = ref<DashboardMetrics | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch all dashboard metrics
   */
  const fetchMetrics = async () => {
    loading.value = true
    error.value = null

    try {
      metrics.value = await dashboardService.fetchMetrics()
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError)
      error.value = appError.message
      trackError(appError, 'useDashboard.fetchMetrics')
    } finally {
      loading.value = false
    }
  }

  /**
   * Refresh metrics (alias for fetchMetrics for clarity)
   */
  const refreshMetrics = async () => {
    await fetchMetrics()
  }

  return {
    metrics,
    loading,
    error,
    fetchMetrics,
    refreshMetrics
  }
}
