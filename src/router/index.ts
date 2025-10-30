import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '@/app/auth/PublicLayout.vue'
import AuthCallback from '@/app/auth/AuthCallback.vue'
import LoginView from '@/app/auth/LoginView.vue'

import DefaultLayout from '@/app/layouts/DefaultLayout.vue'

const routes = [
  // Public
  {path: '/', component: PublicLayout, children: [
    {path: '', redirect: '/auth/login'},
    {path: 'auth/login', component: LoginView},
    {path: 'auth/callback', component: AuthCallback}
  ]},
  // Protected
  {path: '/', component: DefaultLayout, meta:{requiresAuth:true}, children: []}
]

const router = createRouter({history: createWebHistory(), routes})

router.beforeEach((to) => {
  const authFlag = sessionStorage.getItem('isAuthenticated')
  if (to.meta.requiresAuth && authFlag !== 'true') {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router
