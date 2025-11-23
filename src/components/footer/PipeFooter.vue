<script setup lang="ts">
interface PipeFooterProps {
  company: string;
  year?: number;
}

const props = withDefaults(defineProps<PipeFooterProps>(), {
  company: 'PipeCRM',
  year: new Date().getFullYear(),
});
</script>

<template>
  <footer class="border-t px-6 py-6 text-center">
    <p class="text-sm font-medium">
      © {{ props.year }} {{ props.company }}. Todos os direitos reservados.
    </p>
  </footer>
</template>
