<template>
  <InputText
    v-bind="$attrs"
    :modelValue="modelValue"
    @update:modelValue="handleUpdate"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputText from 'primevue/inputtext'

export default defineComponent({
  name: 'PipeInput',
  components: {
    InputText
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
:deep(.p-inputtext) {
  border-color: #B3B4BC;
  color: #3A4B59;
}

:deep(.p-inputtext:enabled:hover) {
  border-color: #B8284B;
}

:deep(.p-inputtext:enabled:focus) {
  border-color: #B8284B;
  box-shadow: 0 0 0 0.2rem rgba(184, 40, 75, 0.2);
}

:deep(.p-inputtext::placeholder) {
  color: #B3B4BC;
}
</style>
