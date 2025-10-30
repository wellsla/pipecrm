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
      sidebarOpen: true,
      menu: [
        {label:'Vendas', icon:'pi pi-chart-line', items: []},
        {label:'Atendimento', icon:'pi pi-comments', items: []},
        {label:'Automação', icon:'pi pi-bolt', items: []}
      ]
    }
  },
  computed: {
    userName(): string {
      return this.$auth.user?.name || 'Usuário'
    }
  },
  methods: {
    async doLogout() {
      sessionStorage.setItem('__pipecrm_auth__', '0')
      await this.$auth.logout()
    }
  }
})
</script>

<template>
  <div class="layout">
    <header class="topbar">
      <PipeMenubar>
        <template #start>
          <b>PipeCRM</b>
        </template>
        <template #end>
          <span>{{ userName }}</span>
          <PipeButton text icon="pi pi-sign-out" @click="doLogout" />
          <PipeButton text icon="pi pi-bars" @click="sidebarOpen = !sidebarOpen" />
        </template>
      </PipeMenubar>
    </header>
    <div class="body">
      <aside class="sidebar" v-show="sidebarOpen">
        <PipePanelMenu :model="menu" />
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout{ 
  display:grid; 
  grid-template-rows:56px 1fr; 
  height:100vh 
}
.body{ 
  display:grid; 
  grid-template-columns:260px 1fr; 
  gap:12px;
  padding:12px 
}
.sidebar{ 
  background:#fff; 
  border:1px solid #e2e8f0; 
  border-radius:12px; 
  padding:8px 
}
.content{ 
  background:#fff;
  border:1px solid #e2e8f0; 
  border-radius:12px; 
  padding:12px; 
  overflow:auto 
}
</style>