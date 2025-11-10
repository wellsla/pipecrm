<script lang="ts">
import PipeButton from '@/components/ui/button/PipeButton.vue'

export default {
  name: 'ForgotPasswordView',
  components: {
    PipeButton,
  },
  data() {
    return {
      email: '',
      sent: false,
      error: '',
    }
  },
  methods: {
    async reset() {
      this.error = ''
      this.sent = false

      try {
        await this.$auth.resetPassword(this.email)
        this.sent = true
      } catch (err: unknown) {
        this.error = `Erro ao enviar email: ${(err as Error).message}`
      }
    },
    goLogin() {
      this.$router.push('/auth/login')
    },
  },
}
</script>

<template>
  <div class="card">
    <h2>Recuperar senha</h2>
    <div class="col">
      <PipeButton label="Enviar email de recuperação" icon="pi pi-envelope" @click="reset" />
      <p v-if="sent" style="color: #065f46">
        Email de recuperação enviado. Verifique sua caixa de entrada.
      </p>
      <p v-if="error" style="color: #b91c1c">{{ error }}</p>
    </div>
    <div class="links">
      <a @click.prevent="goLogin">Voltar para o login</a>
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
