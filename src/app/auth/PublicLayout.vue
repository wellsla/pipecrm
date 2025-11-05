<script lang="ts">
export default {
  name: 'PublicLayout',
}
</script>

<template>
  <div class="wrap">
    <header class="brand">PipeCRM</header>
    <main><router-view /></main>
    <footer>© {{ new Date().getFullYear() }} PipeCRM</footer>
  </div>
</template>

<style scoped>
main {
  display: grid;
  place-items: center;
  padding: 24px;
}
footer {
  padding: 12px;
  text-align: center;
  color: var(--text-500);
}

.wrap {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.brand {
  padding: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-700);
}
.card {
  width: 100%;
  max-width: 440px;
}
.links {
  margin-top: 8px;
  text-align: center;
  cursor: pointer;
}
</style>
