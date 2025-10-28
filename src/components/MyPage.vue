<template>
  <article>
    <MyHeader :user="user" @login="onLogin" @logout="onLogout" @createAccount="onCreateAccount" />

    <section class="storybook-page">
      <h2>Pages in Storybook</h2>
      <p>
        This app page is a simple mirror of the Storybook example. Build pages from components and
        preview them in Storybook.
      </p>
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MyHeader from './MyHeader.vue'
import '../stories/pages/page.css'

const user = ref<{ name: string } | null>(null)

const onLogin = () => {
  user.value = { name: 'Jane Doe' }
}
const onLogout = () => {
  user.value = null
}
const onCreateAccount = () => {
  user.value = { name: 'Jane Doe' }
}
</script>

<style scoped>
/* small page-specific tweaks can go here */
</style>
