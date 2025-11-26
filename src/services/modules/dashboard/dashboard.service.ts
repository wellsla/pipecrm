import { supabase } from '@/core/db/supabase.client'
import type { DashboardMetrics } from '@/services/modules/dashboard/dashboard.types'

export const dashboardService = {
  async fetchMetrics(): Promise<DashboardMetrics> {
    const [deals, contacts, companies, activities] = await Promise.all([
      this.fetchDealMetrics(),
      this.fetchContactMetrics(),
      this.fetchCompanyMetrics(),
      this.fetchActivityMetrics()
    ])

    return {
      deals,
      contacts,
      companies,
      activities
    }
  },

  async fetchDealMetrics() {
    const { data: deals, error: dealsError } = await supabase
      .from('deals')
      .select('*, pipeline_stages(id, name, position)')

    if (dealsError) throw dealsError

    const total = deals?.length || 0
    const open = deals?.filter((d) => d.status === 'open').length || 0
    const won = deals?.filter((d) => d.status === 'won').length || 0
    const lost = deals?.filter((d) => d.status === 'lost').length || 0

    const totalValue = deals?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0
    const averageValue = total > 0 ? totalValue / total : 0
    const conversionRate = total > 0 ? (won / total) * 100 : 0

    const stageMap = new Map<string, { name: string; count: number; value: number }>()
    deals?.forEach((deal) => {
      if (deal.pipeline_stages) {
        const stageId = deal.pipeline_stages.id
        const stageName = deal.pipeline_stages.name
        const existing = stageMap.get(stageId)
        
        if (existing) {
          existing.count++
          existing.value += deal.amount || 0
        } else {
          stageMap.set(stageId, {
            name: stageName,
            count: 1,
            value: deal.amount || 0
          })
        }
      }
    })

    const byStage = Array.from(stageMap.entries()).map(([stageId, data]) => ({
      stageId,
      stageName: data.name,
      count: data.count,
      totalValue: data.value
    }))

    return {
      total,
      open,
      won,
      lost,
      totalValue,
      averageValue,
      conversionRate,
      byStage
    }
  },

  async fetchContactMetrics() {
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')

    if (error) throw error

    const total = contacts?.length || 0
    
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentlyAdded = contacts?.filter((c) => 
      new Date(c.created_at) >= thirtyDaysAgo
    ).length || 0

    const withEmail = contacts?.filter((c) => c.email).length || 0
    const withPhone = contacts?.filter((c) => c.phone).length || 0

    return {
      total,
      recentlyAdded,
      withEmail,
      withPhone
    }
  },

  async fetchCompanyMetrics() {
    const { data: companies, error } = await supabase
      .from('companies')
      .select('*')

    if (error) throw error

    const total = companies?.length || 0

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentlyAdded = companies?.filter((c) => 
      new Date(c.created_at) >= thirtyDaysAgo
    ).length || 0

    const segmentMap = new Map<string, number>()
    companies?.forEach((company) => {
      const segment = company.segment || 'Outros'
      segmentMap.set(segment, (segmentMap.get(segment) || 0) + 1)
    })

    const bySegment = Array.from(segmentMap.entries()).map(([segment, count]) => ({
      segment,
      count
    }))

    return {
      total,
      recentlyAdded,
      bySegment
    }
  },

  async fetchActivityMetrics() {
    const { data: activities, error } = await supabase
      .from('deal_activities')
      .select('*')

    if (error) throw error

    const total = activities?.length || 0

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const today = activities?.filter((a) => 
      new Date(a.created_at) >= todayStart
    ).length || 0

    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)
    const thisWeek = activities?.filter((a) => 
      new Date(a.created_at) >= weekStart
    ).length || 0

    const typeMap = new Map<string, number>()
    activities?.forEach((activity) => {
      const type = activity.type
      typeMap.set(type, (typeMap.get(type) || 0) + 1)
    })

    const byType = Array.from(typeMap.entries()).map(([type, count]) => ({
      type,
      count
    }))

    return {
      total,
      today,
      thisWeek,
      byType
    }
  }
}
