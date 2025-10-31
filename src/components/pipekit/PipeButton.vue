<template>
  <PrimeButton
    v-bind="$attrs"
    :label="label"
    :class="classes"
    @click="$emit('click', $event)"
    :style="style"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import PrimeButton from 'primevue/button'
import './css/button.css'

export default defineComponent({
  name: 'PipeButton',
  components: {
    PrimeButton,
  },
  props: {
    label: {
      type: String,
      default: undefined,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
    },
    backgroundColor: {
      type: String,
      default: undefined,
    },
  },
  emits: ['click'],
  computed: {
    classes() {
      return {
        'storybook-button': true,
        'storybook-button--primary': this.primary,
        'storybook-button--secondary': !this.primary,
        [`storybook-button--${this.size}`]: true,
      }
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      }
    },
  },
})
</script>
