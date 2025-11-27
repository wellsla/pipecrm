<script setup lang="ts">
import PipeCard from '@/components/ui/card/PipeCard.vue';
import type { Deal } from '@/types/modules/deals.types';

const props = defineProps<{
  deal: Deal;
}>();

const emit = defineEmits<{
  (e: 'drag-start', payload: { dealId: string }): void;
  (e: 'drag-end'): void;
}>();

const handleDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(props.deal.id));
  }
  emit('drag-start', { dealId: props.deal.id });
};

const handleDragEnd = () => {
  emit('drag-end');
};
</script>

<template>
  <PipeCard
    v-bind="$attrs"
    :deal="deal"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  />
</template>
