<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegisterView',
  data() {
    return {
      message: 'Register View',
    }
  },
})
</script>

<template>
  <div style="padding: 24px">{{ message }}</div>
</template>

<style scoped></style>
