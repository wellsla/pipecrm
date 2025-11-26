<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useDashboard } from '@/composables/modules/useDashboard';
import { ActivityType } from '@/types/modules/activities.types';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import PipeMetricCard from '@/components/modules/dashboard/PipeMetricCard.vue';

const { metrics, loading, error, getMetrics, refreshMetrics } = useDashboard();

onMounted(() => {
  getMetrics();
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Mapping activity types to display names
const activityTypesMapped = computed(() => {
  const typeMap: Record<string, string> = {
    [ActivityType.NOTE]: 'Nota',
    [ActivityType.CALL]: 'Ligação',
    [ActivityType.EMAIL]: 'E-mail',
    [ActivityType.MEETING]: 'Reunião',
    [ActivityType.TASK]: 'Tarefa',
    [ActivityType.OTHER]: 'Outro',
  };
  return typeMap;
});
</script>

<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
    >
      <div>
        <h1 class="text-xl sm:text-2xl font-bold">Dashboard</h1>
        <p class="text-xs sm:text-sm">Visão geral das métricas do sistema</p>
      </div>
      <PipeButton
        id="refresh-dashboard-btn"
        label="Atualizar"
        :icon="{ class: 'pi pi-refresh' }"
        severity="secondary"
        variant="outlined"
        size="small"
        class="w-full sm:w-auto"
        :conditions="{ loading: loading }"
        @click="refreshMetrics"
      />
    </div>

    <!-- Loading State -->
    <div
      v-if="loading && !metrics"
      class="flex flex-col items-center justify-center gap-4 p-12"
    >
      <i class="pi pi-spin pi-spinner text-3xl"></i>
      <p>Carregando dashboard...</p>
    </div>

    <!-- Error State -->
    <PipeMessage v-else-if="error" severity="error" :text="error" />

    <!-- Metrics Grid -->
    <div v-else-if="metrics" class="space-y-4 sm:space-y-6">
      <!-- Deal Metrics -->
      <div>
        <h2 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Negócios
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
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
        <h2 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Contatos & Empresas
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
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
        <h2 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Negócios por Etapa
        </h2>
        <div class="rounded-lg border p-3 sm:p-6">
          <div class="space-y-3 sm:space-y-4">
            <div
              v-for="stage in metrics.deals.byStage"
              :key="stage.stageId"
              class="flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition"
            >
              <div class="flex items-center gap-2 sm:gap-3 min-w-0">
                <div class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                <span class="font-medium text-sm sm:text-base truncate">{{
                  stage.stageName
                }}</span>
              </div>
              <div class="flex items-center gap-6">
                <div class="text-right">
                  <p class="text-sm font-medium">
                    {{ stage.count }} negócio{{ stage.count !== 1 ? 's' : '' }}
                  </p>
                  <p class="text-xs">
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
        <h2 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Atividades por Tipo
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          <div
            v-for="activityType in metrics.activities.byType"
            :key="activityType.type"
            class="rounded-lg border p-4 text-center"
          >
            <div class="text-2xl font-bold mb-1">
              {{ activityType.count }}
            </div>
            <div class="text-xs capitalize">
              {{ activityTypesMapped[activityType.type] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
