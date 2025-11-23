<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';
import { validationError } from '@/core/errors/form/validation';
import type { AppError } from '@/core/errors/app/error.types';

import PipeAuthForm from '@/components/ui/auth-form/PipeAuthForm.vue';
import PipeInput from '@/components/ui/input/PipeInput.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';

const router = useRouter();
const auth = useAuthStore();

const email = ref<string>('');
const success = ref<boolean>(false);
const emailError = ref<AppError | null>(null);

const validateEmail = (): boolean => {
  emailError.value = null;
  if (!email.value) {
    emailError.value = validationError('E-mail é obrigatório', 'email');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = validationError('E-mail inválido', 'email');
    return false;
  }
  return true;
};

const onSubmit = async (): Promise<void> => {
  auth.clearError();
  emailError.value = null;

  const isEmailValid = validateEmail();
  if (!isEmailValid) {
    return;
  }

  await auth.forgotPassword(email.value);

  if (!auth.errorMessage) {
    success.value = true;
  }
};

const goToLogin = (): void => {
  router.push({ name: 'Login' });
};

const hasGlobalError = computed(() => !!auth.errorMessage);
</script>

<template>
  <PipeAuthForm
    title="Esqueceu a senha?"
    subtitle="Digite seu e-mail para receber um link de recuperação"
    hero-title="Recupere o acesso à sua conta"
    hero-description="Enviaremos um link seguro para você redefinir sua senha"
    :show-hero="false"
  >
    <!-- Estado de sucesso -->
    <div v-if="success" class="space-y-5">
      <div class="rounded-lg border p-4 surface-card border-base">
        <div class="flex items-start gap-3">
          <i class="pi pi-check-circle text-2xl"></i>
          <div>
            <p class="mb-1 font-semibold">E-mail enviado com sucesso!</p>
            <p class="text-sm">
              Enviamos um link de recuperação para
              <span class="font-medium">{{ email }}</span
              >. Verifique sua caixa de entrada e spam.
            </p>
          </div>
        </div>
      </div>

      <PipeButton
        id="go-to-login"
        label="Voltar para login"
        class="w-full"
        @click="goToLogin"
      />

      <p class="text-center text-sm">
        Não recebeu o e-mail?
        <button
          type="button"
          class="font-medium transition-colors hover:underline"
          @click="success = false"
        >
          Tentar novamente
        </button>
      </p>
    </div>

    <!-- Formulário de recuperação -->
    <form v-else class="space-y-6" @submit.prevent="onSubmit">
      <!-- Erro global do auth store -->
      <PipeMessage
        v-if="hasGlobalError"
        severity="error"
        variant="outlined"
        icon="pi pi-times-circle"
        class="w-full"
      >
        {{ auth.errorMessage }}
      </PipeMessage>

      <!-- Info box -->
      <div class="rounded-lg border p-5 surface-card border-base">
        <div class="flex items-start gap-4">
          <i class="pi pi-info-circle text-xl"></i>
          <p class="text-sm font-medium leading-relaxed">
            Você receberá um e-mail com instruções para criar uma nova senha. O
            link expira em 1 hora.
          </p>
        </div>
      </div>

      <!-- Campo E-mail -->
      <div>
        <label for="email" class="mb-2 block text-sm font-semibold">
          E-mail cadastrado
        </label>
        <PipeInput
          id="email"
          v-model="email"
          type="text"
          placeholder="seu@email.com"
          :conditions="{
            fluid: true,
            invalid: !!emailError,
          }"
          aria-describedby="email-error"
          autocomplete="email"
          @blur="validateEmail"
        />
        <Transition name="slide-fade">
          <PipeMessage
            v-if="emailError"
            id="email-error"
            severity="error"
            variant="simple"
            icon="pi pi-exclamation-circle"
            size="small"
            class="mt-1"
          >
            {{ emailError?.message }}
          </PipeMessage>
        </Transition>
      </div>

      <!-- Botão Enviar -->
      <PipeButton
        id="submit-button"
        type="submit"
        label="Enviar link de recuperação"
        class="w-full mt-2"
        :conditions="{ loading: auth.loading }"
      />

      <!-- Link Voltar -->
      <p class="text-center">
        <button
          type="button"
          class="text-sm font-medium transition-colors hover:underline"
          @click="goToLogin"
        >
          Voltar para login
        </button>
      </p>
    </form>
  </PipeAuthForm>
</template>
