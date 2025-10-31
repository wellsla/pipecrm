<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthCallback',
  data() {
    return { message: 'Autenticando…' }
  },
  async created() {
    try {
      await this.$auth.handleRedirectCallback()
      sessionStorage.setItem('__pipecrm_auth__', this.$auth.isAuthenticated ? '1' : '0')
      const target = (this.$route.query.redirect as string) || '/'
      this.$router.replace(target)
    } catch (error) {
      this.message = `Erro na autenticação: ${error}`
      setTimeout(() => {
        this.$router.replace({ path: '/auth/login' })
      }, 1200)
    }
  },
})
</script>

<template>
  <div style="padding: 24px">{{ message }}</div>
</template>
