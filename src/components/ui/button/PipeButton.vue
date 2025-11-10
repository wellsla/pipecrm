<script lang="ts">
import type { PropType } from 'vue'
import PrimeButton from 'primevue/button'

export default {
  name: 'PipeButton',
  components: {
    PrimeButton,
  },
  props: {
    label: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    severity: {
      type: String as PropType<'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'>,
      default: 'primary',
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
    },
  },
  emits: ['click'],
}
</script>

<template>
  <PrimeButton
    v-bind="$attrs"
    :label="label"
    :icon="icon"
    :severity="severity"
    :size="size"
    @click="$emit('click', $event)"
  />
</template>
