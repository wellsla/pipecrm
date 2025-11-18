<script setup lang="ts">
import PipeHeader from '@/components/header/PipeHeader.vue'
</script>

<template>
  <div>
    <PipeHeader />
    <main><router-view /></main>
    <footer>© {{ new Date().getFullYear() }} PipeCRM</footer>
  </div>
</template>
