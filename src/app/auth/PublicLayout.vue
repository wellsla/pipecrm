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

<style>
main {
  display: grid;
  place-items: center;
  padding: 24px;
}
footer {
  padding: 12px;
  text-align: center;
  color: #64748b;
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
  gap: 8px;
  align-items: center;
}

/* Auth cards */
.card {
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-bg);
  padding: 16px;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}
.links {
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
</style>
