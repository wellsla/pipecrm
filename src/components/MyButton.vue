<template>
  <Button
    v-bind="$attrs"
    :label="label"
    :class="classes"
    @click="$emit('click', $event)"
    :style="style"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Button from 'primevue/button'
import './button.css'

const props = defineProps<{
  label?: string
  primary?: boolean
  size?: 'small' | 'medium' | 'large'
  backgroundColor?: string
}>()

// Emit typing so template $emit is recognized by TS
defineEmits<{
  (e: 'click', ev?: MouseEvent): void
}>()

// Keep this component small for story/app parity; we don't need a typed 'emit' here
const classes = computed(() => ({
  'storybook-button': true,
  'storybook-button--primary': props.primary,
  'storybook-button--secondary': !props.primary,
  [`storybook-button--${props.size || 'medium'}`]: true,
}))

const style = computed(() => ({
  backgroundColor: props.backgroundColor,
}))
</script>

<style scoped>
/* keep styles delegated to imported button.css */
</style>
