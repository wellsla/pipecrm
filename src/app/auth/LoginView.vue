<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
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
      password: ''
    }
  },
  computed: {
    auth0() {
      return useAuth0()
    },
    isAuthenticated() {
      return this.auth0.isAuthenticated.value
    }
  },
  methods: {
    async loginEmail() {
      await this.auth0.loginWithRedirect({
        authorizationParams: {
          login_hint: this.email
        },
        appState: { target: '/' }
      })
    },
    async loginGoogle() {
      await this.auth0.loginWithRedirect({
        authorizationParams: {
          connection: 'google-oauth2'
        },
        appState: { target: '/' }
      })
    }
  }
})
</script>

<template>
  <div class="auth-card">
    <h2>Entrar</h2>
    <div class="col">
      <label for="email">Email</label>
      <PipeInput id="email" v-model="email" placeholder="voce@empresa.com" />
      <label for="password">Senha</label>
      <PipePassword id="password" v-model="password" toggleMask placeholder="••••••••" :feedback="false" />
      <PipeButton label="Entrar" icon="pi pi-sign-in" @click="loginEmail" />
      <PipeButton label="Entrar com Google" icon="pi pi-google" severity="secondary" @click="loginGoogle" />
    </div>
  </div>
</template>

<style scoped>
.auth-card { 
  width: 100%; 
  max-width: 420px;
  border:1px solid #e2e8f0; 
  border-radius:12px; 
  background:#fff; 
  padding:16px 
}
.col { 
  display:flex; 
  flex-direction:column; 
  gap:10px; 
  margin-top:8px 
}
</style>