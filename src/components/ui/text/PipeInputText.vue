<script lang="ts">
import type { PropType } from 'vue'
import PrimeInputText from 'primevue/inputtext'
import PrimeFloatLabel from 'primevue/floatlabel'
import PrimeIftaLabel from 'primevue/iftalabel'

export default {
  name: 'PipeInputText',
  components: {
    PrimeInputText,
    PrimeFloatLabel,
    PrimeIftaLabel,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: undefined,
    },
    type: {
      type: String as PropType<'text' | 'password' | 'email' | 'number'>,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    floatLabel: {
      type: Object as PropType<{ variant?: 'in' | 'on'; label: string }>,
      default: undefined,
    },
    iftaLabel: {
      type: Object as PropType<{ label: string }>,
      default: undefined,
    },
    size: {
      type: String as PropType<'small' | 'large'>,
      default: undefined,
    },
    help: {
      type: Object as PropType<{
        text: string
        severity: 'primary' | 'secondary' | 'info' | 'warning' | 'danger'
        size?: 'small' | 'normal' | 'large'
        variant?: 'simple'
      }>,
    },
  },
  emits: ['change', 'update:modelValue'],
  computed: {
    innerValue: {
      get() {
        return this.modelValue
      },
      set(value: string) {
        this.$emit('update:modelValue', value)
      },
    },
    wrapper() {
      if (this.iftaLabel) {
        return 'PrimeIftaLabel'
      } else if (this.floatLabel) {
        return 'PrimeFloatLabel'
      }
      return 'div'
    },
    wrapperProps() {
      if (this.floatLabel) {
        return { variant: this.floatLabel.variant }
      }
      return {}
    },
    currentLabel() {
      if (this.floatLabel) {
        return this.floatLabel.label
      } else if (this.iftaLabel) {
        return this.iftaLabel.label
      }
      return undefined
    },
  },
}
</script>

<template>
  <component :is="wrapper" v-bind="wrapperProps">
    <PrimeInputText
      v-model="innerValue"
      v-bind="$attrs"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :size="size"
      @change="$emit('change', $event)"
    />
    <label v-if="currentLabel" :for="id">{{ currentLabel }}</label>
  </component>
</template>
