<script setup lang="ts">
import PrimeDialog from 'primevue/dialog';

interface PipeDialogProps {
  modelValue: boolean;
  header?: string;
  modal?: boolean;
  closable?: boolean;
  width?: string;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  showHeader?: boolean;
  showFooter?: boolean;
  contentClass?: string;
}

const props = withDefaults(defineProps<PipeDialogProps>(), {
  modal: true,
  closable: true,
  position: 'center',
  showHeader: true,
  showFooter: false,
});

const emit = defineEmits(['update:modelValue', 'close']);

const handleHide = () => {
  emit('update:modelValue', false);
  emit('close');
};
</script>

<template>
  <PrimeDialog
    :visible="props.modelValue"
    :header="props.header"
    :modal="props.modal"
    :closable="props.closable"
    :position="props.position"
    :style="{ width: props.width || '95vw', maxWidth: '32rem' }"
    :contentClass="props.contentClass"
    :breakpoints="{ '960px': '90vw', '640px': '95vw' }"
    @update:visible="handleHide"
  >
    <template v-if="props.showHeader" #header>
      <slot name="header">
        <span>{{ props.header }}</span>
      </slot>
    </template>
    <slot />
    <template v-if="props.showFooter" #footer>
      <slot name="footer" />
    </template>
  </PrimeDialog>
</template>
