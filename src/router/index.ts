import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import PublicLayout from '@/app/auth/PublicLayout.vue'
import LoginView from '@/app/auth/LoginView.vue'
import RegisterView from '@/app/auth/RegisterView.vue'
import ForgotPasswordView from '@/app/auth/ForgotPasswordView.vue'
import AuthCallback from '@/app/auth/AuthCallback.vue'

import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HomeView from '@/features/home/HomeView.vue'

const routes: RouteRecordRaw[] = [
  // Public
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'auth/login', component: LoginView },
      { path: 'auth/register', component: RegisterView },
      { path: 'auth/forgot', component: ForgotPasswordView },
      { path: 'auth/callback', component: AuthCallback },
    ],
  },
  // Protected
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/home' },
      { path: 'home', component: HomeView },
    ],
  },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const authFlag = sessionStorage.getItem('__pipecrm_auth__') === '1'

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth === true)

  if (requiresAuth && !authFlag) {
    return { path: '/auth/login', query: { redirect: to.fullPath } }
  }

  if (to.path.startsWith('/auth') && authFlag) {
    return { path: '/home' }
  }

  if (to.path === '/') {
    return authFlag ? { path: '/home' } : { path: '/auth/login' }
  }
})

export default router
