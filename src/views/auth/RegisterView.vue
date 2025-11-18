<script lang="ts">
import PipeButton from '@/components/ui/button/PipeButton.vue'

export default {
  name: 'RegisterView',
  components: {
    PipeButton,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      loading: false,
      error: '',
      ok: false,
    }
  },
  methods: {
    async signup() {
      this.loading = true
      this.error = ''
      this.ok = false

      try {
        await this.$auth.signUp(this.email, this.password, this.name)
        this.ok = true
      } catch (err: unknown) {
        this.error = `Erro ao registrar: ${(err as Error).message}`
      } finally {
        this.loading = false
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
    <h2>Criar conta</h2>
    <div class="col">
      <PipeButton
        :loading="loading"
        label="Registrar"
        :icon="{ class: 'pi pi-user-plus' }"
        @click="signup"
      />
      <p v-if="ok" style="color: #065f46">Verifique seu e-mail para confirmar a conta.</p>
      <p v-if="error" style="color: #b91c1c">{{ error }}</p>
    </div>
    <div class="links">
      <a @click.prevent="goLogin">Já tem uma conta? Faça login</a>
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
