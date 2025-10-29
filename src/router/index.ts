import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import type { Auth0VueClient } from '@auth0/auth0-vue'

import PublicLayout from '@/app/auth/PublicLayout.vue'
import LoginView from '@/app/auth/LoginView.vue'

import DefaultLayout from '@/app/layouts/DefaultLayout.vue'

const routes = [
  // Public
  {path: '/', component: PublicLayout, children: [
    {path: '', redirect: '/login'},
    {path: '/login', component: LoginView}
  ]},
  // Protected
  {path: '/', component: DefaultLayout, meta:{requiresAuth:true}, children: []}
]

const router = createRouter({history: createWebHistory(), routes})

export function setupAuthGuard(router: Router, auth0: Auth0VueClient) {
  router.beforeEach(async (to) => {
    if (to.meta.requiresAuth && !auth0.isAuthenticated.value) {
      await auth0.loginWithRedirect({appState: {target: to.fullPath}})
      return false
    }
  })
}

export default router
