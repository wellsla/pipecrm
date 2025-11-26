import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';

import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue';
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue';
import TwoFactorView from '@/views/auth/TwoFactorView.vue';
import AuthCallbackView from '@/views/auth/AuthCallbackView.vue';

import HomeView from '@/views/home/HomeView.vue';
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
        path: '',
        redirect: '/login',
      },
      {
        path: 'login',
        name: 'Login',
        component: LoginView,
        meta: {
          title: 'Entrar no PipeCRM',
          description: 'Entrar na sua conta PipeCRM',
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterView,
        meta: {
          title: 'Registrar no PipeCRM',
          description: 'Criar uma nova conta PipeCRM',
        }
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPasswordView,
        meta: {
          title: 'Esqueci minha senha PipeCRM',
          description: 'Recuperar acesso à sua conta PipeCRM',
        }
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPasswordView,
        meta: {
          title: 'Redefinir senha PipeCRM',
          description: 'Definir uma nova senha para sua conta PipeCRM',
        }
      },
      {
        path: 'two-factor',
        name: 'TwoFactor',
        component: TwoFactorView,
        meta: {
          title: 'Autenticação de Dois Fatores PipeCRM',
          description: 'Verificar sua identidade com autenticação de dois fatores',
        }
      },
      {
        path: 'callback',
        name: 'AuthCallback',
        component: AuthCallbackView,
        meta: {
          public: true,
        }
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
        meta: {
          title: 'Página Inicial PipeCRM',
          description: 'Visão geral e resumo das atividades do PipeCRM',
        }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/modules/dashboard/DashboardView.vue'),
        meta: {
          title: 'Painel de Controle PipeCRM',
          description: 'Visualizar métricas e relatórios do PipeCRM',
        }
      },
      {
        path: 'pipeline',
        name: 'Pipeline',
        component: PipelineView,
        meta: {
          title: 'Pipeline PipeCRM',
          description: 'Gerenciar e acompanhar o fúnil de vendas do PipeCRM',
        }
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: ContactsView,
        meta: {
          title: 'Contatos PipeCRM',
          description: 'Gerenciar e visualizar seus contatos no PipeCRM',
        }
      },
      {
        path: 'companies',
        name: 'Companies',
        component: CompaniesView,
        meta: {
          title: 'Empresas PipeCRM',
          description: 'Gerenciar e visualizar suas empresas no PipeCRM',
        }
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

let sessionInitialized = false;

router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore();

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
