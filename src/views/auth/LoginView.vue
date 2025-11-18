<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import PipeButton from '@/components/ui/button/PipeButton.vue'

interface LoginForm {
  email: string
  password: string
  isLoading: boolean
  error: string
}

const router = useRouter()

const loginForm = reactive<LoginForm>({
  email: '',
  password: '',
  isLoading: false,
  error: '',
})

const loginEmail = async () => {
  loginForm.isLoading = true
  loginForm.error = ''

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simula chamada assíncrona
    router.replace(router.currentRoute.value.query.redirect as string)
  } catch (error) {
    const errorMessage = (error as Error).message
    loginForm.error = `Erro ao entrar: ${errorMessage}`
  } finally {
    loginForm.isLoading = false
  }
}

// const loginGoogle = async () => {
// }

const goRegister = () => {
  router.push('/auth/register')
}

const goForgot = () => {
  router.push('/auth/forgot')
}
</script>

<template>
  <div>
    <h2>Entrar</h2>
    <div>
      <PipeButton
        :loading="loginForm.isLoading"
        label="Entrar"
        :icon="{ class: 'pi pi-sign-in' }"
        severity="primary"
        @click="loginEmail"
      />
      <!-- <PipeButton
        label="Entrar com Google"
        :icon="{ class: 'pi pi-google' }"
        severity="secondary"
        @click="loginGoogle"
      /> -->
      <p v-if="loginForm.error">{{ loginForm.error }}</p>
    </div>
    <div>
      <a @click.prevent="goRegister">Criar uma conta</a> |
      <a @click.prevent="goForgot">Esqueci minha senha</a>
    </div>
  </div>
</template>
