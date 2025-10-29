<template>
  <article class="storybook-page">
    <slot />
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './page.css'

export default defineComponent({
  name: 'PipePage'
})
</script>

<style scoped>
/* Styles in page.css */
</style>
