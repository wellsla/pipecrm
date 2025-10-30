<template>
  <Password
    class="pipe-password"
    v-bind="$attrs"
    :modelValue="modelValue"
    @update:modelValue="handleUpdate"
    placeholder="••••••••"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Password from 'primevue/password'
import './css/password.css'

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
