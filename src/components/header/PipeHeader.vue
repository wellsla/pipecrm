<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

import PipeTopMenubar from '../ui/menubar/PipeTopMenubar.vue'

interface PipeHeaderProps {
  items?: MenuItem[]
}

const props = defineProps<PipeHeaderProps>()
const propsWithDefaults = withDefaults(props, {
  items: () => [] as MenuItem[],
})
</script>

<template>
  <header>
    <PipeTopMenubar :items="propsWithDefaults.items" />
  </header>
</template>
