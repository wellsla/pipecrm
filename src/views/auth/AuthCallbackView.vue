<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';

const router = useRouter();
const auth = useAuthStore();

onMounted(async () => {
  await auth.handleAuthCallback();

  if (auth.isAuthenticated) {
    router.replace('/');
  } else if (auth.errorMessage) {
    router.replace({ name: 'Login', query: { error: 'auth_callback_failed' } });
  } else {
    router.replace({ name: 'Login' });
  }
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <div
        class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full"
      >
        <i class="pi pi-spin pi-spinner text-3xl"></i>
      </div>
      <h2 class="mb-2 text-xl font-bold tracking-tight">Autenticando...</h2>
      <p class="text-sm font-medium">Por favor, aguarde um momento</p>
    </div>
  </div>
</template>
