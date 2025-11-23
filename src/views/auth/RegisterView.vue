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
const password = ref<string>('');
const confirmPassword = ref<string>('');
const success = ref<boolean>(false);

const emailError = ref<AppError | null>(null);
const passwordError = ref<AppError | null>(null);
const confirmPasswordError = ref<AppError | null>(null);

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

const validateConfirmPassword = (): boolean => {
  confirmPasswordError.value = null;
  if (!confirmPassword.value) {
    confirmPasswordError.value = validationError(
      'Confirmação de senha é obrigatória',
      'confirmPassword'
    );
    return false;
  }
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = validationError(
      'As senhas não coincidem',
      'confirmPassword'
    );
    return false;
  }
  return true;
};

const onSubmit = async (): Promise<void> => {
  auth.clearError();
  emailError.value = null;
  passwordError.value = null;
  confirmPasswordError.value = null;

  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
    return;
  }

  await auth.signUp(email.value, password.value, confirmPassword.value);

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
    title="Criar conta"
    subtitle="Comece a usar o PipeCRM gratuitamente"
    hero-title="Junte-se a milhares de equipes"
    hero-description="Aumente sua produtividade e venda mais com o melhor CRM do mercado"
  >
    <!-- Estado de sucesso -->
    <div v-if="success" class="space-y-6">
      <div class="rounded-xl border p-6 surface-card border-base">
        <div class="flex items-start gap-4">
          <i class="pi pi-check-circle text-3xl"></i>
          <div>
            <p class="mb-2 text-lg font-bold">
              Cadastro realizado com sucesso!
            </p>
            <p class="text-sm font-medium leading-relaxed">
              Enviamos um e-mail de confirmação para
              <span class="font-medium">{{ email }}</span
              >. Verifique sua caixa de entrada e spam.
            </p>
          </div>
        </div>
      </div>

      <PipeButton
        id="go-to-login"
        label="Ir para login"
        class="w-full"
        @click="goToLogin"
      />
    </div>

    <!-- Formulário de cadastro -->
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

      <!-- Campo Senha -->
      <div>
        <label for="password" class="mb-2 block text-sm font-semibold">
          Senha
        </label>
        <PipeInput
          id="password"
          v-model="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          :conditions="{
            fluid: true,
            invalid: !!passwordError,
          }"
          aria-describedby="password-error"
          autocomplete="new-password"
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

      <!-- Campo Confirmar Senha -->
      <div>
        <label for="confirm-password" class="mb-2 block text-sm font-semibold">
          Confirmar senha
        </label>
        <PipeInput
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          placeholder="Digite a senha novamente"
          :conditions="{
            fluid: true,
            invalid: !!confirmPasswordError,
          }"
          aria-describedby="confirm-password-error"
          autocomplete="new-password"
          @blur="validateConfirmPassword"
        />
        <Transition name="slide-fade">
          <PipeMessage
            v-if="confirmPasswordError"
            id="confirm-password-error"
            severity="error"
            variant="simple"
            icon="pi pi-exclamation-circle"
            size="small"
            class="mt-1"
          >
            {{ confirmPasswordError?.message }}
          </PipeMessage>
        </Transition>
      </div>

      <!-- Botão Cadastrar -->
      <PipeButton
        id="submit-button"
        type="submit"
        label="Criar conta"
        class="w-full mt-2"
        :conditions="{ loading: auth.loading }"
      />

      <!-- Link Login -->
      <p class="text-center text-sm">
        Já tem uma conta?
        <button
          type="button"
          class="font-medium transition-colors hover:underline"
          @click="goToLogin"
        >
          Entrar
        </button>
      </p>
    </form>
  </PipeAuthForm>
</template>
