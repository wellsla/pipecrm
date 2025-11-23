import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/views/layouts/PublicLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/LoginView.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/RegisterView.vue'),
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPasswordView.vue'),
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPasswordView.vue'),
      },
      {
        path: 'two-factor',
        name: 'TwoFactor',
        component: () => import('@/views/auth/TwoFactorView.vue'),
      },
      {
        path: 'callback',
        name: 'AuthCallback',
        component: () => import('@/views/auth/AuthCallbackView.vue'),
      },
    ],
  },

  {
    path: '/',
    component: () => import('@/views/layouts/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/HomeView.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore();

  if (!auth.user && !_from.name) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const isAuthenticated = auth.isAuthenticated;
  const isPublicRoute = Boolean(to.meta.public);
  const requiresAuth = Boolean(to.meta.requiresAuth);
  const requiresAdmin = Boolean(to.meta.requiresAdmin);

  auth.clearError();

  if (to.name === 'TwoFactor') {
    if (!auth.requiresMfa) {
      next({ name: 'Login' });
      return;
    }
    if (isAuthenticated) {
      next({ path: '/' });
      return;
    }
    next();
    return;
  }

  if (isPublicRoute && isAuthenticated && to.name !== 'AuthCallback') {
    next({ path: '/' });
    return;
  }

  if (requiresAuth && !isAuthenticated) {
    next({
      name: 'Login',
      query: { redirect: to.fullPath },
    });
    return;
  }

  if (requiresAdmin && !auth.user?.isAdmin) {
    next({ path: '/' });
    return;
  }

  next();
});

export default router;
