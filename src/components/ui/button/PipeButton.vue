<script setup lang="ts">
import { useAttrs } from 'vue';

import PrimeButton from 'primevue/button';

interface PipeButtonProps {
  id: string;
  label?: string;
  icon?: { class: string; position?: 'left' | 'right' | 'top' | 'bottom' };
  severity?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'help'
    | 'contrast';
  variant?: 'text' | 'outlined' | 'link';
  size?: 'small' | 'large';
  badge?: {
    value: string;
    severity?:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'info'
      | 'warn'
      | 'danger'
      | 'help'
      | 'contrast';
  };
  externalLink?: boolean;
  conditions?: {
    loading?: boolean;
    disabled?: boolean;
    raised?: boolean;
    rounded?: boolean;
    asChild?: boolean;
  };
  href?: string;
}

const props = withDefaults(defineProps<PipeButtonProps>(), {
  severity: 'primary',
  externalLink: false,
});

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const attrs = useAttrs();

const handleClick = (event: MouseEvent) => {
  emits('click', event);
};
</script>

<template>
  <PrimeButton
    v-bind="attrs"
    :id="props.id"
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
    :loading="props.conditions?.loading"
    :disabled="props.conditions?.disabled"
    :raised="props.conditions?.raised"
    :rounded="props.conditions?.rounded"
    :as-child="props.conditions?.asChild"
    @click="handleClick"
  >
    <slot />
  </PrimeButton>
</template>
