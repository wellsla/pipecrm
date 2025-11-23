<script setup lang="ts">
import PipeHeader from '@/components/header/PipeHeader.vue';
import PipeFooter from '@/components/footer/PipeFooter.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <PipeHeader :showAuth="false" />

    <div class="flex flex-1">
      <main class="flex-1">
        <RouterView />
      </main>
    </div>

    <PipeFooter company="PipeCRM" />
  </div>
</template>
