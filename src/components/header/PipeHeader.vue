<script lang="ts">
import PipeTopMenubar from '../ui/menubar/PipeTopMenubar.vue'

export default {
  name: 'PipeHeader',
  components: {
    PipeTopMenubar,
  },
}
</script>

<template>
  <header>
    <PipeTopMenubar :items="[]" />
  </header>
</template>
