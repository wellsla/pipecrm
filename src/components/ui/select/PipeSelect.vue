<script setup lang="ts">
import { useAttrs } from 'vue';
import type { SelectPassThroughOptionType } from 'primevue/select';
import PrimeSelect from 'primevue/select';

const props = withDefaults(
  defineProps<{
    id: string;
    options: SelectPassThroughOptionType[];
    optionLabel?: string;
    optionValue?: string;
    placeholder?: string;
    conditions?: {
      fluid?: boolean;
      disabled?: boolean;
      invalid?: boolean;
      required?: boolean;
    };
    showClear?: boolean;
  }>(),
  {
    id: '',
    options: () => [],
    placeholder: 'Selecione',
  }
);

const modelValue = defineModel<string | number | null>({ default: null });

const attrs = useAttrs();
</script>

<template>
  <PrimeSelect
    v-model="modelValue"
    v-bind="attrs"
    :id="props.id"
    :options="props.options"
    :optionLabel="props.optionLabel"
    :optionValue="props.optionValue"
    :placeholder="props.placeholder"
    :fluid="props.conditions?.fluid"
    :disabled="props.conditions?.disabled"
    :invalid="props.conditions?.invalid && !modelValue"
    :required="props.conditions?.required"
    :showClear="props.showClear"
  />
</template>
