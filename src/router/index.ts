import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';

import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue';
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue';
import TwoFactorView from '@/views/auth/TwoFactorView.vue';
import AuthCallbackView from '@/views/auth/AuthCallbackView.vue';

import HomeView from '@/views/home/HomeView.vue';
import DashboardView from '@/views/modules/dashboard/DashboardView.vue';
import PipelineView from '@/views/modules/pipeline/PipelineView.vue';
import ContactsView from '@/views/modules/contacts/ContactsView.vue';
import CompaniesView from '@/views/modules/companies/CompaniesView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/views/layouts/PublicLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginView,
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterView,
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPasswordView,
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPasswordView,
      },
      {
        path: 'two-factor',
        name: 'TwoFactor',
        component: TwoFactorView,
      },
      {
        path: 'callback',
        name: 'AuthCallback',
        component: AuthCallbackView,
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
        component: HomeView,
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
      },
      {
        path: 'pipeline',
        name: 'Pipeline',
        component: PipelineView,
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: ContactsView,
      },
      {
        path: 'companies',
        name: 'Companies',
        component: CompaniesView,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Initialize session before any navigation
let sessionInitialized = false;

router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore();

  // Initialize session on first navigation
  if (!sessionInitialized) {
    await auth.initializeSession();
    sessionInitialized = true;
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
