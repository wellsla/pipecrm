/// <reference types="vite/client" />
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import { AuthService } from '@/services/supabase.client'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: AuthService
    $router: Router
    $route: RouteLocationNormalizedLoaded
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

declare global {
  interface Window {
    __pipecrm_auth__?: string
  }
}

export {}
