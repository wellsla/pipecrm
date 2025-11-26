<script setup lang="ts">
import type { Contact } from '@/types/modules/contacts.types';

interface Props {
  contact: Contact;
}

defineProps<Props>();

const emit = defineEmits<{
  click: [contact: Contact];
  edit: [contact: Contact];
  delete: [contact: Contact];
}>();
</script>

<template>
  <div
    class="border border-surface-border rounded-lg p-4 cursor-pointer transition-all duration-150 mb-3 shadow-sm hover:shadow-md hover:border-primary"
    @click="emit('click', contact)"
    role="button"
    tabindex="0"
    @keypress.enter="emit('click', contact)"
  >
    <div class="flex items-center justify-between mb-2">
      <div>
        <div class="text-sm font-semibold">
          {{ contact.name }}
        </div>
        <div class="text-xs">
          {{ contact.email || contact.phone || '—' }}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="p-1 text-text-secondary hover:text-primary"
          @click.stop="emit('edit', contact)"
        >
          <i class="pi pi-pencil"></i>
        </button>
        <button
          class="p-1 text-text-secondary hover:text-red-600"
          @click.stop="emit('delete', contact)"
        >
          <i class="pi pi-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>
