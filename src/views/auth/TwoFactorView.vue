<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';

import PipeInput from '@/components/ui/input/PipeInput.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import Message from 'primevue/message';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const code = ref<string>('');

const onSubmit = async (): Promise<void> => {
  if (!code.value) return;

  auth.clearError();
  await auth.verifyMfa(code.value);

  if (auth.isAuthenticated && !auth.errorMessage) {
    const redirect = (route.query.redirect as string | undefined) ?? '/';
    router.replace(redirect);
  }
};

const goBackToLogin = (): void => {
  router.replace({ name: 'Login' });
};

onMounted(() => {
  if (!auth.requiresMfa) {
    router.replace({ name: 'Login' });
  }
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md rounded-xl p-6 shadow-lg">
      <h1 class="mb-2 text-2xl font-semibold">Autenticação em duas etapas</h1>
      <p class="mb-4 text-sm">
        Digite o código de 6 dígitos enviado para seu e-mail.
      </p>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium"> Código de verificação </label>

          <PipeInput
            id="code"
            v-model="code"
            type="otp"
            :conditions="{ fluid: true }"
            :otpParams="{ integerOnly: true, length: 6 }"
          />
        </div>

        <PipeButton
          id="submit-button"
          type="submit"
          label="Validar código"
          class="w-full"
          :conditions="{ loading: auth.loading }"
        />

        <div class="flex flex-col gap-2 text-center text-sm">
          <button
            type="button"
            class="text-primary-600 hover:underline"
            @click="goBackToLogin"
          >
            Voltar para login
          </button>

          <span class="italic">
            Verifique a pasta de spam se não recebeu o código.
          </span>
        </div>

        <Message v-if="auth.errorMessage" severity="error" :closable="false">
          {{ auth.errorMessage }}
        </Message>
      </form>
    </div>
  </div>
</template>
