<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  iconColor?: 'primary' | 'success' | 'info' | 'warn' | 'danger' | 'secondary';
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'primary',
  subtitle: undefined,
  trend: undefined,
});

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString('pt-BR');
  }
  return props.value;
});

const iconBgClass = computed(() => {
  const colorMap: Record<string, string> = {
    primary: 'bg-blue-100',
    success: 'bg-green-100',
    info: 'bg-cyan-100',
    warn: 'bg-yellow-100',
    danger: 'bg-red-100',
    secondary: 'bg-gray-100',
  };
  return colorMap[props.iconColor] || colorMap.primary;
});

const iconColorClass = computed(() => {
  const colorMap: Record<string, string> = {
    primary: 'text-blue-600',
    success: 'text-green-600',
    info: 'text-cyan-600',
    warn: 'text-yellow-600',
    danger: 'text-red-600',
    secondary: 'text-gray-600',
  };
  return colorMap[props.iconColor] || colorMap.primary;
});
</script>

<template>
  <div class="rounded-lg border p-6 transition-all hover:shadow-md">
    <div class="flex items-center justify-between mb-4">
      <div
        :class="[
          'w-12 h-12 rounded-lg flex items-center justify-center',
          iconBgClass,
        ]"
      >
        <i :class="[icon, 'text-xl', iconColorClass]"></i>
      </div>
      <div v-if="trend" class="flex items-center gap-1">
        <i
          :class="[
            'pi',
            trend.direction === 'up' ? 'pi-arrow-up' : 'pi-arrow-down',
            'text-xs',
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600',
          ]"
        ></i>
        <span
          :class="[
            'text-xs font-medium',
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600',
          ]"
        >
          {{ trend.value }}%
        </span>
      </div>
    </div>

    <div class="space-y-1">
      <h3 class="text-sm font-medium">{{ title }}</h3>
      <p class="text-3xl font-bold">{{ formattedValue }}</p>
      <p v-if="subtitle" class="text-xs">{{ subtitle }}</p>
    </div>
  </div>
</template>
