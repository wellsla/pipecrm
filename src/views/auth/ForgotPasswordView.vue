<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import PipeButton from '@/components/ui/button/PipeButton.vue'

interface ForgotPasswordForm {
  email: string
  isLoading: boolean
  message: string
  status?: 'success' | 'error'
}

const router = useRouter()
const forgotPasswordForm = reactive<ForgotPasswordForm>({
  email: '',
  isLoading: false,
  message: '',
  status: undefined,
})

const reset = async () => {
  forgotPasswordForm.isLoading = true
  forgotPasswordForm.message = ''
  forgotPasswordForm.status = undefined

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simula chamada assíncrona
    forgotPasswordForm.status = 'success'
    forgotPasswordForm.message = 'Email de recuperação enviado. Verifique sua caixa de entrada.'
  } catch (err) {
    const errorMessage = (err as Error).message
    forgotPasswordForm.status = 'error'
    forgotPasswordForm.message = `Erro ao enviar email: ${errorMessage}`
  } finally {
    forgotPasswordForm.isLoading = false
  }
}

const goLogin = () => {
  router.push('/auth/login')
}
</script>

<template>
  <div>
    <h2>Recuperar senha</h2>
    <div>
      <PipeButton
        label="Enviar email de recuperação"
        :icon="{ class: 'pi pi-envelope' }"
        @click="reset"
      />
      <p v-if="forgotPasswordForm.status">
        {{ forgotPasswordForm.message }}
      </p>
    </div>
    <div>
      <a @click.prevent="goLogin">Voltar para o login</a>
    </div>
  </div>
</template>
