export interface DashboardMetrics {
  deals: DealMetrics
  contacts: ContactMetrics
  companies: CompanyMetrics
  activities: ActivityMetrics
}

export interface DealMetrics {
  total: number
  open: number
  won: number
  lost: number
  totalValue: number
  averageValue: number
  conversionRate: number
  byStage: StageMetric[]
}

export interface StageMetric {
  stageId: string
  stageName: string
  count: number
  totalValue: number
}

export interface ContactMetrics {
  total: number
  recentlyAdded: number
  withEmail: number
  withPhone: number
}

export interface CompanyMetrics {
  total: number
  recentlyAdded: number
  bySegment: SegmentMetric[]
}

export interface SegmentMetric {
  segment: string
  count: number
}

export interface ActivityMetrics {
  total: number
  today: number
  thisWeek: number
  byType: ActivityTypeMetric[]
}

export interface ActivityTypeMetric {
  type: string
  count: number
}

export interface MetricCard {
  title: string
  value: string | number
  subtitle?: string
  icon: string
  iconColor: string
  trend?: {
    value: number
    direction: 'up' | 'down'
    label: string
  }
}
