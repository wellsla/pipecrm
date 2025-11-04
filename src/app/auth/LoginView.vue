<script lang="ts">
import PipeInput from '@/components/pipekit/PipeInput.vue'
import PipePassword from '@/components/pipekit/PipePassword.vue'
import PipeButton from '@/components/pipekit/PipeButton.vue'

export default {
  name: 'LoginView',
  components: {
    PipeInput,
    PipePassword,
    PipeButton,
  },
  data() {
    return {
      email: '',
      password: '',
      redirect: (this.$route.query.redirect as string) || '/sales',
      loading: false,
      error: '',
    }
  },
  methods: {
    async loginEmail() {
      this.loading = true
      this.error = ''
      try {
        sessionStorage.setItem('__pipecrm_auth__', '0')
        await this.$auth.signInWithPassword(this.email, this.password)
        sessionStorage.setItem('__pipecrm_auth__', '1')
        this.$router.push(this.redirect)
      } catch (err: unknown) {
        this.error = `Erro ao entrar: ${(err as Error).message}`
        this.loading = false
      } finally {
        this.loading = false
      }
    },
    async loginGoogle() {
      await this.$auth.signInWithGoogle()
      // Supabase redireciona
    },
    goRegister() {
      this.$router.push('/auth/register')
    },
    goForgot() {
      this.$router.push('/auth/forgot')
    },
  },
}
</script>

<template>
  <div class="card">
    <h2>Entrar</h2>
    <div class="col">
      <label for="email">Email</label>
      <PipeInput id="email" v-model="email" placeholder="voce@empresa.com" />
      <label for="password">Senha</label>
      <PipePassword id="password" v-model="password" toggleMask :feedback="false" />
      <PipeButton
        :loading="loading"
        label="Entrar"
        icon="pi pi-sign-in"
        primary
        @click="loginEmail"
      />
      <PipeButton
        label="Entrar com Google"
        icon="pi pi-google"
        severity="secondary"
        @click="loginGoogle"
      />
      <p v-if="error" style="color: #b91c1c">{{ error }}</p>
    </div>
    <div class="links">
      <a @click.prevent="goRegister">Criar uma conta</a> |
      <a @click.prevent="goForgot">Esqueci minha senha</a>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-bg);
  padding: 16px;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}
.links {
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
</style>
