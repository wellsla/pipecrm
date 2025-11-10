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
  <PrimeMenubar :model="items">
    <template #start>
      <a v-ripple class="flex items-center" href="#"><span>PipeCRM</span></a>
      <slot name="start" />
    </template>
    <template #item="{}">
      <slot />
    </template>
    <template #end>
      <PipeButton size="small" :icon="darkMode ? 'pi pi-sun' : 'pi pi-moon'" @click="toggleTheme" />
      <slot name="end" />
    </template>
  </PrimeMenubar>
</template>
