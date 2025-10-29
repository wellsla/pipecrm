<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PublicLayout',
})
</script>

<template>
  <div class="public-wrap">
    <header class="brand">PipeCRM</header>
    <main><slot /></main>
    <footer>© {{ new Date().getFullYear() }} PipeCRM</footer>
  </div>
</template>

<style scoped>
.public-wrap{ 
  min-height:100vh; 
  display:grid; 
  grid-template-rows:auto 1fr auto; }
.brand{ 
  padding:1rem; 
  font-weight:700; 
  display:flex; 
  gap:0.75rem; 
  align-items:center }
main{ 
  display:grid; 
  place-items:center; 
  padding:2rem }
footer{ 
  padding:1rem; 
  text-align:center; 
  color:#64748b 
}
</style>