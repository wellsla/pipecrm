<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

interface MenuItem {
  label: string
  icon: string
  items?: MenuItem[]
  command?: () => void
}

const router = useRouter()

const sidebarOpen = ref<boolean>(true)
const menu = reactive<MenuItem[]>([
  {
    label: 'Vendas',
    icon: 'pi pi-chart-line',
    items: [
      {
        label: 'Pipelines',
        icon: 'pi pi-columns',
        command: () => router.push('/sales'),
      },
      {
        label: 'Leads',
        icon: 'pi pi-columns',
        command: () => router.push('/leads'),
      },
    ],
  },
])
</script>

<template>
  <div>
    <header></header>
    <div>
      <!-- Temporário, apenas para testes -->
      <aside v-show="sidebarOpen">
        <nav>
          <ul>
            <li v-for="section in menu" :key="section.label">
              <div>
                <i :class="section.icon"></i>
                <span>{{ section.label }}</span>
              </div>
              <ul>
                <li v-for="item in section.items" :key="item.label" @click="item.command">
                  <i :class="item.icon"></i>
                  <span>{{ item.label }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
      <!--  -->
    </div>
    <main>
      <router-view />
    </main>
  </div>
</template>
