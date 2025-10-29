<template>
  <Password
    v-bind="$attrs"
    :modelValue="modelValue"
    @update:modelValue="handleUpdate"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Password from 'primevue/password'

export default defineComponent({
  name: 'PipePassword',
  components: {
    Password
  },
  props: {
    modelValue: {
      type: String,
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleUpdate(value: string | null | undefined) {
      this.$emit('update:modelValue', value ?? '')
    }
  }
})
</script>

<style scoped>
:deep(.p-password input) {
  border-color: #B3B4BC;
  color: #3A4B59;
}

:deep(.p-password input:enabled:hover) {
  border-color: #B8284B;
}

:deep(.p-password input:enabled:focus) {
  border-color: #B8284B;
  box-shadow: 0 0 0 0.2rem rgba(184, 40, 75, 0.2);
}

:deep(.p-password input::placeholder) {
  color: #B3B4BC;
}

:deep(.p-password-toggle-icon) {
  color: #3A4B59;
}

:deep(.p-password-toggle-icon:hover) {
  color: #B8284B;
}
</style>
