<script setup lang="ts">
import { ref } from 'vue';

import type { MenuItem } from 'primevue/menuitem';

import PrimeMenubar from 'primevue/menubar';
import PipeButton from '@/components/ui/button/PipeButton.vue';

interface PipeTopMenubarProps {
  items: MenuItem[];
}

const props = defineProps<PipeTopMenubarProps>();

const darkMode = ref(false);

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark');
  darkMode.value = !darkMode.value;
};
</script>

<template>
  <PrimeMenubar :model="props.items" class="rounded-t-none!">
    <template #start>
      <a v-ripple class="cursor-pointer" href="#"
        ><h1 class="text-xl font-bold">PipeCRM</h1></a
      >
      <slot name="start" />
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <slot
        name="item"
        :item="item"
        :props="props"
        :hasSubmenu="hasSubmenu"
        :root="root"
      />
    </template>
    <template #end>
      <PipeButton
        id="toggle-theme-button"
        size="small"
        :icon="{ class: darkMode ? 'pi pi-sun' : 'pi pi-moon' }"
        @click="toggleTheme"
      />
      <slot name="end" />
    </template>
  </PrimeMenubar>
</template>
