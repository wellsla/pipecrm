<template>
  <InputText
    class="pipe-input"
    v-bind="$attrs"
    :modelValue="modelValue"
    @update:modelValue="handleUpdate"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputText from 'primevue/inputtext'
import './css/input.css'

export default defineComponent({
  name: 'PipeInput',
  components: {
    InputText,
  },
  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleUpdate(value: string | null | undefined) {
      this.$emit('update:modelValue', value ?? '')
    },
  },
})
</script>
