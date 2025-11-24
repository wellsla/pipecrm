<script setup lang="ts">
import type { Company } from '@/types/companies.types';

interface Props {
  company: Company;
}

defineProps<Props>();

const emit = defineEmits<{
  click: [company: Company];
  edit: [company: Company];
  delete: [company: Company];
}>();
</script>

<template>
  <div
    class="bg-white border border-surface-border rounded-lg p-4 cursor-pointer transition-all duration-150 mb-3 shadow-sm hover:shadow-md hover:border-primary"
    @click="emit('click', company)"
    role="button"
    tabindex="0"
    @keypress.enter="emit('click', company)"
  >
    <div class="flex items-center justify-between mb-2">
      <div>
        <div class="text-sm font-semibold text-slate-800">
          {{ company.name }}
        </div>
        <div class="text-xs text-slate-500">
          {{ company.segment || '—' }} • {{ company.city || '—' }}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="p-1 text-text-secondary hover:text-primary"
          @click.stop="emit('edit', company)"
        >
          <i class="pi pi-pencil"></i>
        </button>
        <button
          class="p-1 text-text-secondary hover:text-red-600"
          @click.stop="emit('delete', company)"
        >
          <i class="pi pi-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>
