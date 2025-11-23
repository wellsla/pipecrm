<script setup lang="ts">
import { useAttrs } from 'vue';

import PrimeMessage from 'primevue/message';

interface PipeMessageProps {
  id?: string;
  severity?: 'info' | 'success' | 'warn' | 'error' | 'secondary' | 'contrast';
  variant?: 'simple' | 'outlined';
  icon?: string;
  size?: 'small' | 'large';
  conditions?: {
    closable?: boolean;
  };
}

const props = withDefaults(defineProps<PipeMessageProps>(), {
  severity: 'info',
  conditions: () => ({ closable: false }),
});

const attrs = useAttrs();
</script>

<template>
  <PrimeMessage
    v-bind="attrs"
    :id="props.id"
    :severity="props.severity"
    :variant="props.variant"
    :icon="props.icon"
    :size="props.size"
    :closable="props.conditions?.closable"
  >
    <slot />
  </PrimeMessage>
</template>
