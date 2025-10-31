<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ForgotPasswordView',
  data() {
    return {
      message: 'Forgot Password View',
    }
  },
})
</script>

<template>
  <div style="padding: 24px">{{ message }}</div>
</template>

<style scoped></style>
