<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      ready: false,
    }
  },
  created() {
    const isAuth = window.__pipecrm_auth__
    if (typeof isAuth === 'string') {
      sessionStorage.setItem('__pipecrm_auth__', isAuth)
      this.ready = true
    }
  },
})
</script>

<template>
  <div v-if="!ready" class="loader">
    <div class="spin"></div>
    <p>Carregando PipeCRM…</p>
  </div>
  <router-view v-else />
</template>

<style scoped>
.loader {
  height: 100vh;
  display: grid;
  place-items: center;
  gap: 12px;
  color: #334155;
}
.spin {
  width: 42px;
  height: 42px;
  border: 4px solid #cbd5e1;
  border-top-color: var(--brand-500);
  border-radius: 50%;
  animation: sp 0.8s linear infinite;
}
@keyframes sp {
  to {
    transform: rotate(360deg);
  }
}
</style>
