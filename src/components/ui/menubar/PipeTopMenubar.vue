<script lang="ts">
import type { MenuItem } from 'primevue/menuitem'

import PrimeMenubar from 'primevue/menubar'
import PipeButton from '@/components/ui/button/PipeButton.vue'

export default {
  name: 'PipeTopMenubar',
  components: {
    PrimeMenubar,
    PipeButton,
  },
  props: {
    items: {
      type: Array as () => MenuItem[],
      required: true,
    },
  },
  data() {
    return {
      darkMode: false,
    }
  },
  methods: {
    toggleTheme() {
      document.documentElement.classList.toggle('app-dark-mode')
      this.darkMode = !this.darkMode
    },
  },
}
</script>

<template>
  <PrimeMenubar :model="items" class="rounded-t-none!">
    <template #start>
      <a v-ripple class="cursor-pointer" href="#"><h1 class="text-xl font-bold">PipeCRM</h1></a>
      <slot name="start" />
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <slot name="item" :item="item" :props="props" :hasSubmenu="hasSubmenu" :root="root" />
    </template>
    <template #end>
      <PipeButton
        size="small"
        :icon="{ class: darkMode ? 'pi pi-sun' : 'pi pi-moon' }"
        @click="toggleTheme"
      />
      <slot name="end" />
    </template>
  </PrimeMenubar>
</template>
