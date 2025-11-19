<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import PrimeInputText from 'primevue/inputtext'
import PrimeFloatLabel from 'primevue/floatlabel'
import PrimeIftaLabel from 'primevue/iftalabel'

interface PipeInputTextProps {
  id?: string
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  floatLabel?: { variant?: 'in' | 'on'; label: string }
  iftaLabel?: { label: string }
  size?: 'small' | 'large'
  help?: {
    text: string
    severity: 'primary' | 'secondary' | 'info' | 'warning' | 'danger'
    size?: 'small' | 'normal' | 'large'
    variant?: 'simple'
  }
}

const props = withDefaults(defineProps<PipeInputTextProps>(), {
  type: 'text',
})

const modelValue = defineModel<string>({ default: '' })

const attrs = useAttrs()

const wrapper = computed(() => {
  if (props.iftaLabel) {
    return PrimeIftaLabel
  } else if (props.floatLabel) {
    return PrimeFloatLabel
  }
  return 'div'
})

const wrapperProps = computed(() => {
  if (props.floatLabel) {
    return { variant: props.floatLabel.variant }
  }
  return {}
})

const currentLabel = computed(() => {
  if (props.floatLabel) {
    return props.floatLabel.label
  } else if (props.iftaLabel) {
    return props.iftaLabel.label
  }
  return undefined
})
</script>

<template>
  <component :is="wrapper" v-bind="wrapperProps">
    <PrimeInputText
      v-model="modelValue"
      v-bind="attrs"
      :id="props.id"
      :type="props.type"
      :placeholder="props.placeholder"
      :size="props.size"
    />
    <label v-if="currentLabel" :for="id">{{ currentLabel }}</label>
  </component>
</template>
