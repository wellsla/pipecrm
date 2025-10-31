<script lang="ts">
import { defineComponent } from 'vue'
import PipeInput from '@/components/pipekit/PipeInput.vue'
import PipePassword from '@/components/pipekit/PipePassword.vue'
import PipeButton from '@/components/pipekit/PipeButton.vue'

export default defineComponent({
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
      redirect: this.$route.query.redirect || '/sales',
    }
  },
  methods: {
    async loginEmail() {
      sessionStorage.setItem('__pipecrm_auth__', '0')
      await this.$auth.loginWithRedirect({
        authorizationParams: { login_hint: this.email },
        appState: { redirect: this.redirect },
      })
    },
    async loginGoogle() {
      sessionStorage.setItem('__pipecrm_auth__', '0')
      await this.$auth.loginWithRedirect({
        authorizationParams: { connection: 'google-oauth2' },
        appState: { redirect: this.redirect },
      })
    },
    goRegister() {
      this.$router.push('/auth/register')
    },
    goForgot() {
      this.$router.push('/auth/forgot')
    },
  },
})
</script>

<template>
  <div class="auth-card">
    <h2>Entrar</h2>
    <div class="col">
      <label for="email">Email</label>
      <PipeInput id="email" v-model="email" placeholder="voce@empresa.com" />
      <label for="password">Senha</label>
      <PipePassword id="password" v-model="password" toggleMask :feedback="false" />
      <PipeButton label="Entrar" icon="pi pi-sign-in" primary @click="loginEmail" />
      <PipeButton
        label="Entrar com Google"
        icon="pi pi-google"
        severity="secondary"
        @click="loginGoogle"
      />
    </div>
    <div class="links">
      <a @click.prevent="goRegister">Criar uma conta</a> |
      <a @click.prevent="goForgot">Esqueci minha senha</a>
    </div>
  </div>
</template>

<style scoped>
.auth-card {
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
</style>
