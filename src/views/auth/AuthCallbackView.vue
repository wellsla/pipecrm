<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

interface AuthCallBackForm {
  isLoading: boolean
  message: string
  status?: 'success' | 'error'
}

const router = useRouter()

const authCallbackForm = reactive<AuthCallBackForm>({
  isLoading: true,
  message: '',
  status: undefined,
})

onBeforeMount(async () => {
  authCallbackForm.isLoading = true
  authCallbackForm.message = 'Processando autenticação...'

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simula chamada assíncrona
    authCallbackForm.status = 'success'
    authCallbackForm.message = 'Autenticação bem-sucedida! Redirecionando...'
    setTimeout(() => {
      router.replace(router.currentRoute.value.query.redirect as string)
    }, 2000)
  } catch (error) {
    authCallbackForm.status = 'error'
    const errorMessage = (error as Error).message
    authCallbackForm.message = `Erro na autenticação: ${errorMessage}, redirecionando para o login…`
    setTimeout(() => {
      router.replace(router.currentRoute.value.query.redirect as string)
    }, 2000)
  } finally {
    authCallbackForm.isLoading = false
  }
})
</script>

<template>
  <div>
    <i
      :class="{
        'pi pi-spin pi-spinner': authCallbackForm.isLoading && !authCallbackForm.status,
        'pi pi-times-circle': authCallbackForm.status === 'error',
        'pi pi-check-circle': authCallbackForm.status === 'success',
      }"
    ></i>
    <p>{{ authCallbackForm.message }}</p>
  </div>
</template>
