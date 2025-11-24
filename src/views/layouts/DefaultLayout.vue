<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import type { MenuItem } from 'primevue/menuitem';

import PipeHeader from '@/components/header/PipeHeader.vue';
import PipeFooter from '@/components/footer/PipeFooter.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';

const router = useRouter();
const route = useRoute();

const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-home', route: '/home' },
  { label: 'Pipeline', icon: 'pi pi-sitemap', route: '/pipeline' },
  { label: 'Contatos', icon: 'pi pi-users', route: '/contacts' },
  { label: 'Empresas', icon: 'pi pi-building', route: '/companies' },
];

function navigateTo(r: string) {
  if (route.path !== r) router.push(r);
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <PipeHeader title="PipeCRM" subtitle="Painel Principal" />

    <div class="flex flex-1">
      <!-- Desktop Sidebar -->
      <aside class="hidden w-64 flex-col border-r md:flex">
        <nav class="flex flex-1 flex-col gap-1 p-4">
          <PipeButton
            v-for="item in menuItems"
            :id="`${(item.label as string).toLowerCase()}-menu-button`"
            :key="item.route"
            :label="item.label as string"
            :icon="{ class: item.icon as string, position: 'left' }"
            :badge="{ value: item.badge, severity: 'info' }"
            class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
            @click="navigateTo(item.route)"
          />
        </nav>
        <div class="border-t p-4 text-xs">v0.1.0</div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div class="mx-auto w-full max-w-7xl space-y-6">
          <RouterView />
        </div>
      </main>
    </div>

    <PipeFooter company="PipeCRM" />
  </div>
</template>
