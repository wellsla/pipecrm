<script lang="ts">
import type { MenuItem } from 'primevue/menuitem'

import PipeTopMenubar from '../ui/menubar/PipeTopMenubar.vue'

export default {
  name: 'PipeHeader',
  components: {
    PipeTopMenubar,
  },
  props: {
    items: {
      type: Array as () => MenuItem[],
      required: false,
      default: () => [],
    },
  },
}
</script>

<template>
  <header>
    <PipeTopMenubar :items="items" />
  </header>
</template>
