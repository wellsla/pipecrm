<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';

import PipeButton from '@/components/ui/button/PipeButton.vue';

interface PipeHeaderProps {
  title?: string;
  subtitle?: string;
  showAuth?: boolean;
}

const props = withDefaults(defineProps<PipeHeaderProps>(), {
  title: 'PipeCRM',
  subtitle: '',
  showAuth: true,
});

const router = useRouter();
const auth = useAuthStore();

const isDark = ref(false);

const userDisplayName = computed(() => {
  const email = auth.user?.email;
  return email ? email.split('@')[0] : 'Usuário';
});

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const handleSignOut = async () => {
  await auth.signOut();
  router.push({ name: 'Login' });
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  isDark.value = savedTheme === 'dark';
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  }
});
</script>

<template>
  <header class="border-b shadow-sm">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 sm:py-4"
    >
      <!-- Logo & Title -->
      <div class="flex items-center gap-4">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl shadow-inner"
        >
          <i class="pi pi-database text-[1.35rem]"></i>
        </div>
        <div>
          <h1
            class="text-lg sm:text-xl font-semibold leading-tight tracking-tight"
          >
            {{ props.title }}
          </h1>
          <p v-if="props.subtitle" class="text-xs sm:text-sm font-medium">
            {{ props.subtitle }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <!-- Dark Mode Toggle -->
        <PipeButton
          id="toggle-theme-button"
          severity="secondary"
          variant="outlined"
          size="small"
          :icon="{ class: isDark ? 'pi pi-sun' : 'pi pi-moon' }"
          :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
          @click="toggleDarkMode"
        />

        <!-- User Info -->
        <div
          v-if="props.showAuth && auth.isAuthenticated"
          class="flex items-center gap-3"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full ring-1"
            >
              <i class="pi pi-user text-base"></i>
            </div>
            <div class="hidden flex-col gap-1 sm:flex">
              <p class="text-sm font-medium leading-tight">
                {{ userDisplayName }}
              </p>
              <p class="text-xs leading-tight">
                {{ auth.user?.email }}
              </p>
            </div>
          </div>

          <!-- Sign Out Button -->
          <PipeButton
            id="signout-button"
            severity="secondary"
            variant="text"
            size="small"
            :icon="{ class: 'pi pi-sign-out' }"
            aria-label="Sair"
            @click="handleSignOut"
          />
        </div>
      </div>
    </div>
  </header>
</template>
