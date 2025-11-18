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

const props = defineProps<PipeInputTextProps>()
const propsWithDefaults = withDefaults(props, {
  type: 'text',
})

const modelValue = defineModel<string>({ default: '' })

const attrs = useAttrs()

const wrapper = computed(() => {
  if (propsWithDefaults.iftaLabel) {
    return PrimeIftaLabel
  } else if (propsWithDefaults.floatLabel) {
    return PrimeFloatLabel
  }
  return 'div'
})

const wrapperProps = computed(() => {
  if (propsWithDefaults.floatLabel) {
    return { variant: propsWithDefaults.floatLabel.variant }
  }
  return {}
})

const currentLabel = computed(() => {
  if (propsWithDefaults.floatLabel) {
    return propsWithDefaults.floatLabel.label
  } else if (propsWithDefaults.iftaLabel) {
    return propsWithDefaults.iftaLabel.label
  }
  return undefined
})
</script>

<template>
  <component :is="wrapper" v-bind="wrapperProps">
    <PrimeInputText
      v-model="modelValue"
      v-bind="attrs"
      :id="propsWithDefaults.id"
      :type="propsWithDefaults.type"
      :placeholder="propsWithDefaults.placeholder"
      :size="propsWithDefaults.size"
    />
    <label v-if="currentLabel" :for="id">{{ currentLabel }}</label>
  </component>
</template>
