<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-sm text-gray-600">Visão geral das métricas do sistema</p>
      </div>
      <PipeButton
        id="refresh-dashboard-btn"
        label="Atualizar"
        :icon="{ class: 'pi pi-refresh' }"
        severity="secondary"
        variant="outlined"
        :conditions="{ loading: loading }"
        @click="refreshMetrics"
      />
    </div>

    <!-- Loading State -->
    <div
      v-if="loading && !metrics"
      class="flex items-center justify-center py-12"
    >
      <i class="pi pi-spinner pi-spin text-4xl text-blue-500"></i>
    </div>

    <!-- Error State -->
    <PipeMessage v-else-if="error" severity="error" :text="error" />

    <!-- Metrics Grid -->
    <div v-else-if="metrics" class="space-y-6">
      <!-- Deal Metrics -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Negócios</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PipeMetricCard
            title="Total de Negócios"
            :value="metrics.deals.total"
            icon="pi pi-briefcase"
            icon-color="primary"
            subtitle="Todos os negócios"
          />
          <PipeMetricCard
            title="Negócios Abertos"
            :value="metrics.deals.open"
            icon="pi pi-clock"
            icon-color="info"
            subtitle="Em andamento"
          />
          <PipeMetricCard
            title="Negócios Ganhos"
            :value="metrics.deals.won"
            icon="pi pi-check-circle"
            icon-color="success"
            :subtitle="`${metrics.deals.conversionRate.toFixed(1)}% conversão`"
          />
          <PipeMetricCard
            title="Valor Total"
            :value="formatCurrency(metrics.deals.totalValue)"
            icon="pi pi-dollar"
            icon-color="success"
            :subtitle="`Média: ${formatCurrency(metrics.deals.averageValue)}`"
          />
        </div>
      </div>

      <!-- Contact & Company Metrics -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Contatos & Empresas
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PipeMetricCard
            title="Total de Contatos"
            :value="metrics.contacts.total"
            icon="pi pi-users"
            icon-color="primary"
            :subtitle="`${metrics.contacts.recentlyAdded} adicionados (30d)`"
          />
          <PipeMetricCard
            title="Contatos com Email"
            :value="metrics.contacts.withEmail"
            icon="pi pi-envelope"
            icon-color="info"
            :subtitle="`${((metrics.contacts.withEmail / metrics.contacts.total) * 100).toFixed(0)}% do total`"
          />
          <PipeMetricCard
            title="Total de Empresas"
            :value="metrics.companies.total"
            icon="pi pi-building"
            icon-color="secondary"
            :subtitle="`${metrics.companies.recentlyAdded} adicionadas (30d)`"
          />
          <PipeMetricCard
            title="Atividades Hoje"
            :value="metrics.activities.today"
            icon="pi pi-calendar"
            icon-color="warn"
            :subtitle="`${metrics.activities.thisWeek} esta semana`"
          />
        </div>
      </div>

      <!-- Pipeline by Stage -->
      <div v-if="metrics.deals.byStage.length > 0">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Negócios por Etapa
        </h2>
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="space-y-4">
            <div
              v-for="stage in metrics.deals.byStage"
              :key="stage.stageId"
              class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                <span class="font-medium text-gray-900">{{
                  stage.stageName
                }}</span>
              </div>
              <div class="flex items-center gap-6">
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">
                    {{ stage.count }} negócio{{ stage.count !== 1 ? 's' : '' }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ formatCurrency(stage.totalValue) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Types -->
      <div v-if="metrics.activities.byType.length > 0">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Atividades por Tipo
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="activityType in metrics.activities.byType"
            :key="activityType.type"
            class="bg-white rounded-lg border border-gray-200 p-4 text-center"
          >
            <div class="text-2xl font-bold text-gray-900 mb-1">
              {{ activityType.count }}
            </div>
            <div class="text-xs text-gray-600 capitalize">
              {{ activityType.type }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboard } from '@/composables/useDashboard';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import PipeMetricCard from '@/components/ui/dashboard/PipeMetricCard.vue';

const { metrics, loading, error, fetchMetrics, refreshMetrics } =
  useDashboard();

onMounted(() => {
  fetchMetrics();
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
</script>
