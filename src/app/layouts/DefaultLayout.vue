<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {},
  data() {
    return {
      sidebarOpen: true,
      menu: [
        {
          label: 'Vendas',
          icon: 'pi pi-chart-line',
          items: [
            {
              label: 'Pipelines',
              icon: 'pi pi-columns',
              command: () => this.$router.push('/sales'),
            },
            { label: 'Leads', icon: 'pi pi-columns', command: () => this.$router.push('/leads') },
          ],
        },
      ],
    }
  },
  computed: {
    userName(): string {
      return this.$auth.user?.user_metadata?.name ?? this.$auth.user?.email ?? 'Usuário'
    },
  },
  methods: {
    async doLogout() {
      sessionStorage.setItem('__pipecrm_auth__', '0')
      await this.$auth.signOut()
      this.$router.replace('/auth/login')
    },
  },
  created() {
    const saved = localStorage.getItem('pipecrm-theme') || 'light'
    document.documentElement.setAttribute('data-theme', saved)
  },
})
</script>

<template>
  <div class="layout">
    <header class="topbar"></header>
    <div class="body">
      <aside v-show="sidebarOpen" class="sidebar"></aside>
    </div>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-rows: 56px 1fr;
  height: 100vh;
}
.topbar :deep(.p-menubar) {
  border: none;
  border-radius: 0;
  box-shadow: var(--shadow-sm);
}
.body {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 12px;
  padding: 12px;
}
.sidebar {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px;
}
.content {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  overflow: auto;
}
.user {
  margin-right: 8px;
  color: var(--text-700);
}
@media (max-width: 1024px) {
  .body {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
}
</style>
