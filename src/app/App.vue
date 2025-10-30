<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      ready: false
    }
  },
  computed: {
    auth0() {
      return useAuth0()
    },
    isAuthenticated() {
      return this.auth0.isAuthenticated.value
    },
    user() {
      return this.auth0.user.value
    },
    isLoading() {
      return this.auth0.isLoading.value
    }
  },
  async mounted() {
    try {
      if (this.isAuthenticated) {
        await this.auth0.getAccessTokenSilently().catch(() => {})
      }
    } catch (error) {
      console.warn('Erro ao buscar token de acesso:', error)
    } finally {
      this.ready = true
    }
  }
})
</script>

<template>
  <!-- Estado inicial de carregamento -->
  <div v-if="!ready || isLoading" class="loader-screen">
    <div class="spinner"></div>
    <p>Carregando PipeCRM...</p>
  </div>

  <!-- Quando carregado, router controla layout -->
  <router-view v-else />
</template>


<style scoped>
.loader-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: var(--color-bg);
  color: var(--color-text);
  font-weight: 500;
}
.spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>