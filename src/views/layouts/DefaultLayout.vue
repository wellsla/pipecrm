<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

import PipeHeader from '@/components/header/PipeHeader.vue';
import PipeFooter from '@/components/footer/PipeFooter.vue';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

const router = useRouter();
const route = useRoute();

const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-home', route: '/home' },
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
          <button
            v-for="item in menuItems"
            :key="item.route"
            class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
            @click="navigateTo(item.route)"
          >
            <i :class="['text-base', item.icon]"></i>
            <span class="truncate flex-1 text-left">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="rounded-full px-2 py-0.5 text-xs font-semibold"
            >
              {{ item.badge }}
            </span>
          </button>
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
