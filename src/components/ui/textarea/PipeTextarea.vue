<script setup lang="ts">
import { useAttrs } from 'vue';

import PrimeTextarea from 'primevue/textarea';

interface PipeTextareaProps {
  id: string;
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  size?: 'small' | 'large';
  conditions?: {
    fluid?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
  };
}

const props = withDefaults(defineProps<PipeTextareaProps>(), {
  rows: 5,
  cols: 30,
});

const modelValue = defineModel<string>({ default: '' });

const attrs = useAttrs();
</script>

<template>
  <PrimeTextarea
    v-model="modelValue"
    v-bind="attrs"
    :id="props.id"
    :rows="props.rows"
    :cols="props.cols"
    :autoResize="props.autoResize"
    :size="props.size"
    :fluid="props.conditions?.fluid"
    :disabled="props.conditions?.disabled"
    :invalid="props.conditions?.invalid && !modelValue"
    :required="props.conditions?.required"
  />
</template>
