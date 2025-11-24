<script setup lang="ts">
import { ref } from 'vue';
import type { DealWithRelations } from '@/services/modules/deals/deals.types';

interface Props {
  deal: DealWithRelations;
}

defineProps<Props>();

const emit = defineEmits<{
  click: [deal: DealWithRelations];
  edit: [deal: DealWithRelations];
  delete: [deal: DealWithRelations];
}>();

const showMenu = ref(false);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

function toggleMenu(deal: DealWithRelations, event: Event) {
  event.stopPropagation();
  showMenu.value = !showMenu.value;
}

function handleEdit(deal: DealWithRelations, event: Event) {
  event.stopPropagation();
  showMenu.value = false;
  emit('edit', deal);
}

function handleDelete(deal: DealWithRelations, event: Event) {
  event.stopPropagation();
  showMenu.value = false;
  emit('delete', deal);
}
</script>

<template>
  <div
    class="bg-white border border-surface-border rounded-lg p-4 cursor-pointer transition-all duration-200 mb-3 shadow-sm hover:shadow-md hover:border-primary focus:outline-primary focus:outline-2 relative"
    @click="emit('click', deal)"
    role="button"
    tabindex="0"
    @keypress.enter="emit('click', deal)"
  >
    <div class="flex justify-between items-start mb-3">
      <h4
        class="text-sm font-semibold text-ellipsis overflow-hidden line-clamp-2 flex-1"
      >
        {{ deal.title }}
      </h4>
      <div class="relative shrink-0">
        <button
          class="bg-transparent border-none cursor-pointer p-1 text-text-secondary hover:text-primary"
          @click="(e) => toggleMenu(deal, e)"
          aria-label="Menu"
        >
          <i class="pi pi-ellipsis-v"></i>
        </button>
        <div
          v-if="showMenu"
          class="absolute right-0 top-full mt-1 bg-white border border-surface-border rounded-lg shadow-lg z-10 min-w-[120px]"
          @click.stop
        >
          <button
            class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2"
            @click="(e) => handleEdit(deal, e)"
          >
            <i class="pi pi-pencil text-xs"></i>
            Editar
          </button>
          <button
            class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-danger"
            @click="(e) => handleDelete(deal, e)"
          >
            <i class="pi pi-trash text-xs"></i>
            Excluir
          </button>
        </div>
      </div>
    </div>

    <div class="text-lg font-bold text-primary mb-3">
      {{ formatCurrency(deal.amount) }}
    </div>

    <div class="flex justify-between items-center">
      <span
        v-if="deal.status"
        :class="[
          'inline-block px-2 py-1 rounded text-xs font-medium',
          {
            'bg-blue-100 text-blue-800': deal.status === 'open',
            'bg-green-100 text-green-800': deal.status === 'won',
            'bg-red-100 text-red-800': deal.status === 'lost',
            'bg-gray-100 text-gray-800': deal.status === 'archived',
          },
        ]"
      >
        {{
          deal.status === 'open'
            ? 'Aberto'
            : deal.status === 'won'
              ? 'Ganho'
              : deal.status === 'lost'
                ? 'Perdido'
                : 'Arquivado'
        }}
      </span>
    </div>
  </div>
</template>
