<script lang="ts">
import { supabase } from '@/services/supabase.client'

export default {
  name: 'AuthCallback',
  data() {
    return {
      message: 'Autenticando…',
      error: '',
      mode: '' as 'oauth' | 'recovery' | '',
    }
  },
  async created() {
    try {
      const url = new URL(location.href)
      const type = url.searchParams.get('type')
      const hashParams = new URLSearchParams(url.hash.substring(1))

      this.mode = type === 'recovery' ? 'recovery' : 'oauth'

      if (this.mode === 'recovery') {
        this.message = 'Defina sua nova senha para concluir a recuperação.'
        return
      }

      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')

      if (!accessToken || !refreshToken) {
        throw new Error('Tokens de autenticação não encontrados na URL.')
      }

      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (error) {
        throw error
      }

      if (data?.session) {
        sessionStorage.setItem('__pipecrm_auth__', '1')

        await this.$auth.init()

        const redirect = (this.$route.query.redirect as string) || '/home'
        window.history.replaceState({}, '', '/auth/callback')
        await this.$router.replace(redirect)
      } else {
        throw new Error('Sessão não foi criada após definir tokens.')
      }
    } catch (err: unknown) {
      this.error = `Erro na autenticação: ${(err as Error).message}`
      this.message = 'Redirecionando para o login...'

      setTimeout(() => {
        this.$router.replace('/auth/login')
      }, 2000)
    }
  },
  methods: {
    async setPassword() {
      const input = this.$refs.passwordInput as HTMLInputElement
      const password = input?.value?.trim()

      if (!password) {
        this.error = 'Digite uma senha válida.'
        return
      }

      try {
        await this.$auth.updatePassword(password)
        sessionStorage.setItem('__pipecrm_auth__', '1')
        this.$router.replace('/')
      } catch (err: unknown) {
        this.error = `Erro ao definir nova senha: ${(err as Error).message}`
      }
    },
  },
}
</script>

<template>
  <div class="auth-callback">
    <div class="card">
      <div v-if="!error && mode !== 'recovery'">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem; margin-bottom: 1rem"></i>
        <p>{{ message }}</p>
      </div>

      <div v-else-if="error" style="color: var(--color-accent)">
        <i class="pi pi-times-circle" style="font-size: 2rem; margin-bottom: 1rem"></i>
        <p>{{ error }}</p>
        <p style="color: var(--color-text); font-size: 0.875rem">{{ message }}</p>
      </div>

      <div v-else-if="mode === 'recovery'" style="text-align: left">
        <h2 style="text-align: center; margin-bottom: 1rem">Recuperação de Senha</h2>
        <p style="text-align: center; margin-bottom: 1rem">{{ message }}</p>
        <div class="col">
          <label>Nova senha</label>
          <input ref="passwordInput" type="password" class="p-inputtext p-component w-full" />
          <button class="p-button p-component" @click="setPassword">Salvar e continuar</button>
          <p v-if="error" style="color: var(--color-accent); font-size: 0.875rem">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-callback {
  height: 100vh;
  display: grid;
  place-items: center;
  background: var(--color-bg);
}
.card {
  background: var(--color-bg);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 420px;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
h2 {
  color: var(--color-heading);
  margin: 0 0 1rem 0;
}
p {
  color: var(--color-text);
  margin: 0.5rem 0;
}
label {
  color: var(--color-text);
  font-weight: 500;
  text-align: left;
}
</style>
