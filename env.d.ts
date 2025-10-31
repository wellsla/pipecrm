/// <reference types="vite/client" />
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import { AuthService } from '@/services/auth.service' 

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: AuthService
    $router: Router
    $route: RouteLocationNormalizedLoaded
  }
}

declare global {
  interface Window { __pipecrm_auth__?: string }
}

export {}