<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';
import { validationError } from '@/core/errors/form/validation';
import type { AppError } from '@/core/errors/app/error.types';

import PipeAuthForm from '@/components/auth/PipeAuthForm.vue';
import PipeInput from '@/components/ui/input/PipeInput.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';

const router = useRouter();
const auth = useAuthStore();

const password = ref<string>('');
const confirmPassword = ref<string>('');
const success = ref<boolean>(false);
const passwordError = ref<AppError | null>(null);
const confirmPasswordError = ref<AppError | null>(null);

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
  passwordError.value = null;
  confirmPasswordError.value = null;

  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (!isPasswordValid || !isConfirmPasswordValid) {
    return;
  }

  await auth.resetPassword(password.value, confirmPassword.value);

  if (!auth.errorMessage) {
    success.value = true;
    setTimeout(() => {
      router.push({ name: 'Login' });
    }, 2000);
  }
};

const hasGlobalError = computed(() => !!auth.errorMessage);
</script>

<template>
  <PipeAuthForm
    title="Nova senha"
    subtitle="Crie uma senha forte para proteger sua conta"
    hero-title="Redefina sua senha"
    hero-description="Escolha uma senha segura e fácil de lembrar"
    :show-hero="false"
  >
    <!-- Estado de sucesso -->
    <div v-if="success" class="space-y-6">
      <div class="rounded-xl border p-6 surface-card border-base">
        <div class="flex items-start gap-4">
          <i class="pi pi-check-circle text-3xl"></i>
          <div>
            <p class="mb-2 text-lg font-bold">Senha alterada com sucesso!</p>
            <p class="text-sm font-medium leading-relaxed">
              Redirecionando para o login em instantes...
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <form v-else class="space-y-6" @submit.prevent="onSubmit">
      <PipeMessage
        v-if="hasGlobalError"
        severity="error"
        variant="outlined"
        icon="pi pi-times-circle"
        class="w-full"
      >
        {{ auth.errorMessage }}
      </PipeMessage>

      <!-- Campo Nova Senha -->
      <div>
        <label for="password" class="mb-2 block text-sm font-semibold">
          Nova senha
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
          aria-describedby="password-error password-strength"
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

      <!-- Botão Alterar -->
      <PipeButton
        id="submit-button"
        type="submit"
        label="Alterar senha"
        class="w-full mt-2"
        :conditions="{ loading: auth.loading }"
      />
    </form>
  </PipeAuthForm>
</template>
