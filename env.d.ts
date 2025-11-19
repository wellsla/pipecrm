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

// Allow importing css/scss/etc in TypeScript (side-effect imports)
declare module '*.css'
declare module '*.scss'
declare module '*.sass'
declare module '*.less'
declare module '*.svg'

// Allow imports using the path alias '@/*' (resolved by tsconfig paths)
declare module '@/*'

export {}
