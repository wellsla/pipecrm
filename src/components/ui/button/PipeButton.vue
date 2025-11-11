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
      type: Object as PropType<{ class: string; position?: 'left' | 'right' | 'top' | 'bottom' }>,
      default: undefined,
    },
    severity: {
      type: String as PropType<
        'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'help' | 'contrast'
      >,
      default: 'primary',
    },
    variant: {
      type: String as PropType<'text' | 'outlined' | 'link'>,
      default: undefined,
    },
    size: {
      type: String as PropType<'small' | 'large'>,
      default: undefined,
    },
    badge: {
      type: Object as PropType<{
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
      }>,
      default: undefined,
    },
    externalLink: {
      type: Boolean,
      default: false,
    },
    condition: {
      type: String as PropType<'loading' | 'disabled' | 'raised' | 'rounded' | 'asChild'>,
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
  },
  emits: ['click'],
  computed: {
    isLoading() {
      return this.condition === 'loading' ? true : false
    },
    isDisabled() {
      return this.condition === 'disabled' ? true : false
    },
    isRaised() {
      return this.condition === 'raised' ? true : false
    },
    isRounded() {
      return this.condition === 'rounded' ? true : false
    },
    isAsChild() {
      return this.condition === 'asChild' ? true : false
    },
  },
}
</script>

<template>
  <PrimeButton
    v-bind="$attrs"
    :label="label"
    :icon="icon?.class"
    :icon-pos="icon?.position"
    :severity="severity"
    :variant="variant"
    :size="size"
    :badge="badge?.value"
    :badge-severity="badge?.severity"
    :href="href"
    :as="externalLink ? 'a' : undefined"
    :rel="externalLink ? 'noopener' : undefined"
    :loading="isLoading"
    :disabled="isDisabled"
    :raised="isRaised"
    :rounded="isRounded"
    :as-child="isAsChild"
    @click="$emit('click', $event)"
  >
    <slot />
  </PrimeButton>
</template>
