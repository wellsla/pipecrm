<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

import PipeTopMenubar from '../ui/menubar/PipeTopMenubar.vue'

interface PipeHeaderProps {
  items?: MenuItem[]
}

const props = withDefaults(defineProps<PipeHeaderProps>(), {
  items: () => [] as MenuItem[],
})
</script>

<template>
  <header>
    <PipeTopMenubar :items="props.items" />
  </header>
</template>
