<script setup lang="ts">
import { useAttrs } from 'vue';

import PrimeInputMask from 'primevue/inputmask';
import PrimeInputNumber from 'primevue/inputnumber';
import PrimeInputOtp from 'primevue/inputotp';
import PrimeInputText from 'primevue/inputtext';
import PrimePassword from 'primevue/password';

interface PipeInputTextProps {
  id: string;
  type?: 'mask' | 'number' | 'otp' | 'text' | 'password';
  variant?: 'filled';
  placeholder?: string;
  size?: 'small' | 'large';
  conditions?: {
    fluid?: boolean;
    disabled?: boolean;
    invalid?: boolean;
  };
  mask?: string | boolean;
  slotChar?: string;
  numberParams?: {
    mode?: 'decimal' | 'currency';
    min?: number;
    max?: number;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    useGrouping?: boolean;
    locale?: 'pt-BR' | 'en-US' | string;
    currency?: 'BRL' | 'USD' | string;
    currencyDisplay?: 'symbol' | 'code' | 'name';
    prefix?: string;
    suffix?: string;
    showButtons?: boolean;
    buttonLayout?: 'vertical' | 'horizontal';
    step?: number;
    showClear?: boolean;
  };
  otpParams?: {
    integerOnly?: boolean;
    length?: number;
  };
  passwordParams?: {
    feedback?: boolean;
    promptLabel?: string;
    weakLabel?: string;
    mediumLabel?: string;
    strongLabel?: string;
    showClear?: boolean;
  };
  ariaLabel?: string;
  ariaLabeledBy?: string;
  ariaDescribedBy?: string;
}

const props = withDefaults(defineProps<PipeInputTextProps>(), {
  type: 'text',
});

const modelValue = defineModel<string | number>({ default: '' });

const attrs = useAttrs();
</script>

<template>
  <!-- Text Input -->
  <PrimeInputText
    v-if="props.type === 'text'"
    v-model="modelValue as string"
    v-bind="attrs"
    :id="props.id"
    :variant="props.variant"
    :placeholder="props.placeholder"
    :size="props.size"
    :fluid="props.conditions?.fluid"
    :disabled="props.conditions?.disabled"
    :invalid="props.conditions?.invalid && !modelValue"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabeledBy"
    :aria-describedby="props.ariaDescribedBy"
  />

  <!-- Mask Input -->
  <PrimeInputMask
    v-else-if="props.type === 'mask'"
    v-model="modelValue as string"
    v-bind="attrs"
    :id="props.id"
    :variant="props.variant"
    :placeholder="props.placeholder"
    :size="props.size"
    :fluid="props.conditions?.fluid"
    :disabled="props.conditions?.disabled"
    :invalid="props.conditions?.invalid && !modelValue"
    :mask="typeof props.mask === 'string' ? props.mask : undefined"
    :slotChar="props.slotChar"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabeledBy"
    :aria-describedby="props.ariaDescribedBy"
  />

  <!-- Number Input -->
  <PrimeInputNumber
    v-else-if="props.type === 'number'"
    v-model="modelValue as number"
    v-bind="attrs"
    :id="props.id"
    :variant="props.variant"
    :placeholder="props.placeholder"
    :size="props.size"
    :fluid="props.conditions?.fluid"
    :disabled="props.conditions?.disabled"
    :invalid="props.conditions?.invalid && !modelValue"
    :min="props.numberParams?.min"
    :max="props.numberParams?.max"
    :minFractionDigits="props.numberParams?.minFractionDigits"
    :maxFractionDigits="props.numberParams?.maxFractionDigits"
    :useGrouping="props.numberParams?.useGrouping"
    :locale="props.numberParams?.locale"
    :currency="props.numberParams?.currency"
    :currencyDisplay="props.numberParams?.currencyDisplay"
    :prefix="props.numberParams?.prefix"
    :suffix="props.numberParams?.suffix"
    :showButtons="props.numberParams?.showButtons"
    :buttonLayout="props.numberParams?.buttonLayout"
    :mode="props.numberParams?.mode"
    :step="props.numberParams?.step"
    :showClear="props.numberParams?.showClear"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabeledBy"
    :aria-describedby="props.ariaDescribedBy"
  />

  <!-- OTP Input -->
  <PrimeInputOtp
    v-else-if="props.type === 'otp'"
    v-model="modelValue as string"
    v-bind="attrs"
    :id="props.id"
    :disabled="props.conditions?.disabled"
    :invalid="props.conditions?.invalid && !modelValue"
    :integerOnly="props.otpParams?.integerOnly"
    :length="props.otpParams?.length"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabeledBy"
    :aria-describedby="props.ariaDescribedBy"
  />

  <!-- Password Input -->
  <PrimePassword
    v-else-if="props.type === 'password'"
    v-model="modelValue as string"
    v-bind="attrs"
    :id="props.id"
    :variant="props.variant"
    :placeholder="props.placeholder"
    :size="props.size"
    :fluid="props.conditions?.fluid"
    :disabled="props.conditions?.disabled"
    :invalid="props.conditions?.invalid && !modelValue"
    :feedback="props.passwordParams?.feedback"
    :promptLabel="props.passwordParams?.promptLabel"
    :weakLabel="props.passwordParams?.weakLabel"
    :mediumLabel="props.passwordParams?.mediumLabel"
    :strongLabel="props.passwordParams?.strongLabel"
    :toggleMask="props.mask === true"
    :showClear="props.passwordParams?.showClear"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabeledBy"
    :aria-describedby="props.ariaDescribedBy"
  />

  <!-- Fallback Text Input -->
  <PrimeInputText
    v-else
    v-model="modelValue as string"
    v-bind="attrs"
    :id="props.id"
    :variant="props.variant"
    :placeholder="props.placeholder"
    :size="props.size"
    :fluid="props.conditions?.fluid"
    :disabled="props.conditions?.disabled"
    :invalid="props.conditions?.invalid && !modelValue"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabeledBy"
    :aria-describedby="props.ariaDescribedBy"
  />
</template>
