<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { MenuItem } from 'primevue/menuitem';

import PipeHeader from '@/components/header/PipeHeader.vue';
import PipeFooter from '@/components/footer/PipeFooter.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';

const router = useRouter();
const route = useRoute();
const mobileMenuOpen = ref(false);

const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-chart-line', route: '/dashboard' },
  { label: 'Pipeline', icon: 'pi pi-sitemap', route: '/pipeline' },
  { label: 'Contatos', icon: 'pi pi-users', route: '/contacts' },
  { label: 'Empresas', icon: 'pi pi-building', route: '/companies' },
];

function navigateTo(r: string) {
  if (route.path !== r) {
    router.push(r);
    mobileMenuOpen.value = false; // Close mobile menu after navigation
  }
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <PipeHeader title="PipeCRM" :subtitle="route.name as string" />

    <!-- Mobile Menu Toggle Button -->
    <div class="md:hidden sticky top-0 z-40 border-b px-4 py-3">
      <button
        @click="toggleMobileMenu"
        class="flex items-center gap-2 text-sm font-medium"
        aria-label="Toggle menu"
      >
        <i
          :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"
          class="text-lg"
        ></i>
        <span>{{ mobileMenuOpen ? 'Fechar' : 'Menu' }}</span>
      </button>
    </div>

    <div class="flex flex-1 relative">
      <!-- Mobile Sidebar Overlay -->
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-opacity-50 z-40 md:hidden"
        @click="mobileMenuOpen = false"
      ></div>

      <!-- Sidebar (Desktop + Mobile) -->
      <aside
        :class="[
          'fixed md:static inset-y-0 left-0 z-50 w-64 flex-col border-r transition-transform duration-300 ease-in-out md:flex',
          mobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0',
        ]"
      >
        <nav class="flex flex-1 flex-col gap-1 p-4 overflow-y-auto">
          <PipeButton
            v-for="item in menuItems"
            :id="`${(item.label as string).toLowerCase()}-menu-button`"
            :key="item.route"
            :label="item.label as string"
            :icon="{ class: item.icon as string, position: 'left' }"
            :badge="{ value: item.badge, severity: 'info' }"
            class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition justify-start"
            @click="navigateTo(item.route)"
          />
        </nav>
        <div class="border-t p-4 text-xs text-center md:text-left">v0.1.0</div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 w-full px-3 py-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div class="mx-auto w-full max-w-7xl space-y-6">
          <RouterView />
        </div>
      </main>
    </div>

    <PipeFooter company="PipeCRM" />
  </div>
</template>
