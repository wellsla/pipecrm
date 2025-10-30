<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthCallback',
  data() { return { message: 'Autenticando…' } },
})
</script>

<template><div style="padding:24px">{{ message }}</div></template>
