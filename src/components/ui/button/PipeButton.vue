<script setup lang="ts">
import { defineProps, withDefaults, computed, useAttrs } from 'vue'

import PrimeButton from 'primevue/button'

interface PipeButtonProps {
  label?: string
  icon?: { class: string; position?: 'left' | 'right' | 'top' | 'bottom' }
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'help' | 'contrast'
  variant?: 'text' | 'outlined' | 'link'
  size?: 'small' | 'large'
  badge?: {
    value: string
    severity?:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'info'
      | 'warn'
      | 'danger'
      | 'help'
      | 'contrast'
  }
  externalLink?: boolean
  condition?: 'loading' | 'disabled' | 'raised' | 'rounded' | 'asChild'
  href?: string
}

const props = withDefaults(defineProps<PipeButtonProps>(), {
  severity: 'primary',
  externalLink: false,
})

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const attrs = useAttrs()

const handleClick = (event: MouseEvent) => {
  emits('click', event)
}

const isLoading = computed(() => props.condition === 'loading')
const isDisabled = computed(() => props.condition === 'disabled')
const isRaised = computed(() => props.condition === 'raised')
const isRounded = computed(() => props.condition === 'rounded')
const isAsChild = computed(() => props.condition === 'asChild')
</script>

<template>
  <PrimeButton
    v-bind="attrs"
    :label="props.label"
    :icon="props.icon?.class"
    :icon-pos="props.icon?.position"
    :severity="props.severity"
    :variant="props.variant"
    :size="props.size"
    :badge="props.badge?.value"
    :badge-severity="props.badge?.severity"
    :href="props.href"
    :as="props.externalLink ? 'a' : undefined"
    :rel="props.externalLink ? 'noopener' : undefined"
    :loading="isLoading"
    :disabled="isDisabled"
    :raised="isRaised"
    :rounded="isRounded"
    :as-child="isAsChild"
    @click="handleClick"
  >
    <slot />
  </PrimeButton>
</template>
