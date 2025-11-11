<script lang="ts">
import PipeButton from '@/components/ui/button/PipeButton.vue'

export default {
  name: 'LoginView',
  components: {
    PipeButton,
  },
  data() {
    return {
      email: '',
      password: '',
      redirect: (this.$route.query.redirect as string) || '/home',
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
        this.$router.replace(this.redirect)
      } catch (err: unknown) {
        this.error = `Erro ao entrar: ${(err as Error).message}`
      } finally {
        this.loading = false
      }
    },
    async loginGoogle() {
      await this.$auth.signInWithGoogle()
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
      <PipeButton
        :loading="loading"
        label="Entrar"
        :icon="{ class: 'pi pi-sign-in' }"
        severity="primary"
        @click="loginEmail"
      />
      <PipeButton
        label="Entrar com Google"
        :icon="{ class: 'pi pi-google' }"
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
h2 {
  margin-bottom: 12px;
}
.col > label {
  font-size: 12px;
  color: var(--text-500);
}
.p-password,
.p-inputtext {
  width: 100%;
}
.p-button {
  width: 100%;
}
.p-button + .p-button {
  margin-top: 8px;
}
.links {
  margin-top: 8px;
}
</style>
