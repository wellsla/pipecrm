<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import PipeButton from '@/components/ui/button/PipeButton.vue'

interface RegisterForm {
  email: string
  password: string
  isLoading: boolean
  message: string
  status?: 'success' | 'error'
}

const router = useRouter()

const registerForm = reactive<RegisterForm>({
  email: '',
  password: '',
  isLoading: false,
  message: '',
  status: undefined,
})

const signUp = async () => {
  registerForm.isLoading = true
  registerForm.message = ''
  registerForm.status = undefined

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simula chamada assíncrona
    registerForm.status = 'success'
    registerForm.message = 'Verifique seu e-mail para confirmar sua conta.'
  } catch (error) {
    const errorMessage = (error as Error).message
    registerForm.status = 'error'
    registerForm.message = `Ocorreu um erro ao criar a conta: ${errorMessage}`
  } finally {
    registerForm.isLoading = false
  }
}

const goLogin = () => {
  router.push(router.currentRoute.value.query.redirect as string)
}
</script>

<template>
  <div>
    <h2>Criar conta</h2>
    <div>
      <PipeButton
        :loading="registerForm.isLoading"
        label="Registrar"
        :icon="{ class: 'pi pi-user-plus' }"
        @click="signUp"
      />
      <p v-if="registerForm.status">
        {{ registerForm.message }}
      </p>
    </div>
    <div>
      <a @click.prevent="goLogin">Já tem uma conta? Faça login</a>
    </div>
  </div>
</template>
