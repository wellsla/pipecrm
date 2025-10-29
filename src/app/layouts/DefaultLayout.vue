<script lang="ts">
import { defineComponent } from 'vue'
import PipeMenubar from '@/components/pipekit/PipeMenubar.vue'
import PipePanelMenu from '@/components/pipekit/PipePanelMenu.vue'
import PipeButton from '@/components/pipekit/PipeButton.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    PipeMenubar,
    PipeButton,
    PipePanelMenu
  },
  data() {
    return {
      sidebarOpen: true
    }
  },
  computed: {
    menubarItems() {
      return [
        {
          label: 'PipeCRM',
          icon: 'pi pi-verified',
          command: () => this.$router.push('/')
        }
      ]
    },
    menu() {
      return [
        {
          label: 'Vendas',
          icon: 'pi pi-chart-line',
          items: [
            { label: 'Pipeline', icon: 'pi pi-columns', command: () => this.$router.push('/') },
            { label: 'Leads', icon: 'pi pi-users', command: () => this.$router.push('/') },
            { label: 'Propostas', icon: 'pi pi-file', command: () => this.$router.push('/') }
          ]
        },
        {
          label: 'Atendimento',
          icon: 'pi pi-comments',
          items: [
            { label: 'Inbox', icon: 'pi pi-whatsapp', command: () => this.$router.push('/') },
            { label: 'CSAT', icon: 'pi pi-star', command: () => this.$router.push('/') }
          ]
        },
        {
          label: 'Automação',
          icon: 'pi pi-bolt',
          items: [
            { label: 'Regras & Eventos', icon: 'pi pi-cog', command: () => this.$router.push('/') }
          ]
        }
      ]
    }
  }
})
</script>
<template>
  <div class="layout">
    <header class="topbar">
      <PipeMenubar :model="menubarItems">
  <template #end><PipeButton text icon="pi pi-bars" @click="sidebarOpen = !sidebarOpen" /></template>
      </PipeMenubar>
    </header>
    <div class="body">
      <aside class="sidebar" v-show="sidebarOpen">
        <PipePanelMenu :model="menu" />
      </aside>
      <main class="content"><slot /></main>
    </div>
  </div>
</template>
<style scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}
.topbar :deep(.p-menubar) {
  border-radius: 0;
}
.body {
  display:grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 1rem;
}
.sidebar {
  background:#fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 0.5rem;
}
.content {
  overflow:auto;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
}
@media (max-width: 1024px) {
  .body {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display:none;
  }
}
</style>