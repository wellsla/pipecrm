<script setup lang="ts">
import { computed } from 'vue';
import type { DealActivity } from '@/services/modules/activities/activities.types';
import { ActivityType } from '@/services/modules/activities/activities.types';
import PipeButton from '@/components/ui/button/PipeButton.vue';

interface Props {
  activity: DealActivity;
  showActions?: boolean;
}

interface Emits {
  (e: 'click', activity: DealActivity): void;
  (e: 'edit', activity: DealActivity): void;
  (e: 'delete', activityId: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
});

const emit = defineEmits<Emits>();

const activityType = computed(() => {
  const typeMap: Record<string, string> = {
    [ActivityType.NOTE]: 'Nota',
    [ActivityType.CALL]: 'Ligação',
    [ActivityType.EMAIL]: 'E-mail',
    [ActivityType.MEETING]: 'Reunião',
    [ActivityType.TASK]: 'Tarefa',
    [ActivityType.OTHER]: 'Outro',
  };
  return typeMap[props.activity.type] || 'Outro';
});

const activityIcon = computed(() => {
  const iconMap: Record<string, string> = {
    [ActivityType.NOTE]: 'pi pi-file-edit',
    [ActivityType.CALL]: 'pi pi-phone',
    [ActivityType.EMAIL]: 'pi pi-envelope',
    [ActivityType.MEETING]: 'pi pi-users',
    [ActivityType.TASK]: 'pi pi-check-square',
    [ActivityType.OTHER]: 'pi pi-sync',
  };
  return iconMap[props.activity.type] || 'pi pi-info-circle';
});

const iconColorClass = computed(() => {
  const colorMap: Record<string, string> = {
    [ActivityType.NOTE]: 'bg-blue-100 text-blue-600',
    [ActivityType.CALL]: 'bg-green-100 text-green-600',
    [ActivityType.EMAIL]: 'bg-purple-100 text-purple-600',
    [ActivityType.MEETING]: 'bg-orange-100 text-orange-600',
    [ActivityType.TASK]: 'bg-yellow-100 text-yellow-600',
    [ActivityType.OTHER]: 'bg-gray-100 text-gray-600',
  };
  return colorMap[props.activity.type] || 'bg-gray-100 text-gray-600';
});

const formattedDate = computed(() => {
  const date = new Date(props.activity.created_at);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `${diffDays} dias atrás`;

  return date.toLocaleDateString('pt-BR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
});

const handleClick = () => {
  emit('click', props.activity);
};

const handleEdit = () => {
  emit('edit', props.activity);
};

const handleDelete = () => {
  emit('delete', props.activity.id);
};
</script>

<template>
  <div
    class="flex gap-3 p-4 border rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
    @click="handleClick"
  >
    <div class="shrink-0">
      <div
        :class="[
          'w-10 h-10 rounded-full flex items-center justify-center',
          iconColorClass,
        ]"
      >
        <i :class="activityIcon" class="text-lg"></i>
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between gap-2 mb-1">
        <span class="text-sm font-medium capitalize">
          {{ activityType }}
        </span>
        <span class="text-xs">{{ formattedDate }}</span>
      </div>

      <p class="text-sm line-clamp-2">
        {{ activity.content || 'Sem conteúdo' }}
      </p>
    </div>

    <div v-if="showActions" class="shrink-0 flex items-start gap-2">
      <PipeButton
        id="edit-activity-btn"
        :icon="{ class: 'pi pi-pencil' }"
        severity="secondary"
        variant="text"
        size="small"
        @click.stop="handleEdit"
      />
      <PipeButton
        id="delete-activity-btn"
        :icon="{ class: 'pi pi-trash' }"
        severity="danger"
        variant="text"
        size="small"
        @click.stop="handleDelete"
      />
    </div>
  </div>
</template>
