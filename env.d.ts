/// <reference types="vite/client" />
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import { AuthService } from '@/db/supabase.client'

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

export {}
