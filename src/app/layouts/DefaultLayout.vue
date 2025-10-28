<script lang="ts">
import {defineComponent, ref} from 'vue';
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar'
import PanelMenu from 'primevue/panelmenu'
import MyButton from '@/components/MyButton.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Menubar,
    MyButton,
    PanelMenu
  },
  setup() {
    const router = useRouter();
    const sidebarOpen = ref(true);
    const menubarItems = [{label: 'PipeCRM', icon: 'pi pi-verified', command:() => router.push('/')}];
    const menu = [
      {label: 'Vendas', icon: 'pi pi-chart-line', items:[
        {label: 'Pipeline', icon: 'pi pi-columns', command:() => router.push('/')},
        {label: 'Leads', icon: 'pi pi-users', command:() => router.push('/')},
        {label: 'Propostas', icon: 'pi pi-file', command: () => router.push('/')}
      ]},
      {label: 'Atendimento', icon: 'pi pi-comments', items:[
        {label: 'Inbox', icon: 'pi pi-whatsapp', command:() => router.push('/')},
        {label: 'CSAT', icon: 'pi pi-star', command:() => router.push('/')}
      ]},
      {label: 'Automação', icon: 'pi pi-bolt', items:[
        {label: 'Regras & Eventos', icon: 'pi pi-cog', command:() => router.push('/')}
      ]}
    ]
    return { sidebarOpen, menubarItems, menu };
  }
});
</script>
<template>
  <div class="layout">
    <header class="topbar">
      <Menubar :model="menubarItems">
  <template #end><MyButton text icon="pi pi-bars" @click="sidebarOpen = !sidebarOpen" /></template>
      </Menubar>
    </header>
    <div class="body">
      <aside class="sidebar" v-show="sidebarOpen">
        <PanelMenu :model="menu" />
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