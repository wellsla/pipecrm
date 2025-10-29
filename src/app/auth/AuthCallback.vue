<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export default defineComponent({
  name: 'AuthCallback',
  computed: {
    auth0() {
      return useAuth0()
    }
  },
  async mounted() {
    const result = await this.auth0.handleRedirectCallback()
    const target = result?.appState?.targetUrl || '/'
    this.$router.push(target)
  }
})
</script>
<template><div style="padding:2rem;">Autenticado...</div></template>