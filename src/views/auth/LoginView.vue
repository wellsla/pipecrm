<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useFormState } from '@/composables/useFormState';

import PipeAuthForm from '@/components/auth/PipeAuthForm.vue';
import PipeInput from '@/components/ui/input/PipeInput.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import { validationError } from '@/core/errors/form/validation';
import type { AppError } from '@/core/errors/app/error.types';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');
const emailError = ref<AppError | null>(null);
const passwordError = ref<AppError | null>(null);

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

const validatePassword = (): boolean => {
  passwordError.value = null;
  if (!password.value) {
    passwordError.value = validationError('Senha é obrigatória', 'password');
    return false;
  }
  if (password.value.length < 6) {
    passwordError.value = validationError(
      'Senha deve ter no mínimo 6 caracteres',
      'password'
    );
    return false;
  }
  return true;
};

const form = useFormState({
  onSuccess: () => {
    if (auth.isAuthenticated) {
      const redirect = (route.query.redirect as string | undefined) ?? '/';
      router.replace(redirect);
    }
  },
});

const onSubmit = async (): Promise<void> => {
  auth.clearError();
  emailError.value = null;
  passwordError.value = null;

  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  if (!isEmailValid || !isPasswordValid) return;

  await form.execute(async () => {
    await auth.signIn(email.value, password.value);
  });
};

const onGoogleSignIn = async (): Promise<void> => {
  auth.clearError();
  await auth.signInWithGoogle();
};

const goToRegister = (): void => {
  router.push({ name: 'Register' });
};

const goToForgotPassword = (): void => {
  router.push({ name: 'ForgotPassword' });
};

const hasGlobalError = computed(
  () => !!auth.errorMessage || !!form.error.value
);
</script>

<template>
  <PipeAuthForm
    title="Entrar"
    subtitle="Acesse sua conta para continuar usando o PipeCRM"
    hero-title="Gerencie seu pipeline com eficiência"
    hero-description="CRM moderno para equipes que querem vender mais e melhor"
  >
    <form class="space-y-6" @submit.prevent="onSubmit">
      <!-- Erro global do auth store -->
      <PipeMessage
        v-if="hasGlobalError"
        severity="error"
        variant="outlined"
        icon="pi pi-times-circle"
        class="w-full"
      >
        {{ auth.errorMessage || form.error.value?.message }}
      </PipeMessage>

      <!-- Campo E-mail -->
      <div>
        <label for="email" class="mb-2 block text-sm font-semibold">
          E-mail
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

      <!-- Campo Senha -->
      <div>
        <div class="mb-2 flex items-center justify-between">
          <label for="password" class="text-sm font-semibold"> Senha </label>
          <button
            type="button"
            class="text-sm font-medium transition-colors hover:underline"
            @click="goToForgotPassword"
          >
            Esqueceu a senha?
          </button>
        </div>
        <PipeInput
          id="password"
          v-model="password"
          type="password"
          placeholder="Digite sua senha"
          :conditions="{
            fluid: true,
            invalid: !!passwordError,
          }"
          aria-describedby="password-error"
          @blur="validatePassword"
        />
        <Transition name="slide-fade">
          <PipeMessage
            v-if="passwordError"
            id="password-error"
            severity="error"
            variant="simple"
            icon="pi pi-exclamation-circle"
            size="small"
            class="mt-1"
          >
            {{ passwordError?.message }}
          </PipeMessage>
        </Transition>
      </div>

      <!-- Botão Entrar -->
      <PipeButton
        id="submit-button"
        type="submit"
        label="Entrar"
        class="w-full"
        :conditions="{ loading: form.loading.value }"
      />

      <!-- Divider -->
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="surface-card px-2 rounded-sm font-medium"> ou </span>
        </div>
      </div>

      <!-- Botão Google -->
      <PipeButton
        id="google-signin-button"
        type="button"
        label="Entrar com Google"
        severity="secondary"
        variant="outlined"
        class="w-full"
        :icon="{ class: 'pi pi-google' }"
        @click="onGoogleSignIn"
      />

      <!-- Link Cadastro -->
      <p class="text-center text-sm">
        Não tem uma conta?
        <button
          type="button"
          class="font-medium transition-colors hover:underline"
          @click="goToRegister"
        >
          Cadastre-se
        </button>
      </p>
    </form>
  </PipeAuthForm>
</template>
