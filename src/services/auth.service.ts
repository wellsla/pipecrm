import { createAuth0Client, Auth0Client } from '@auth0/auth0-spa-js'
import type { GetTokenSilentlyOptions, RedirectLoginOptions, User } from '@auth0/auth0-spa-js'
import type { App, Plugin } from 'vue'

export class AuthService {
  private client: Auth0Client | null = null
  public isAuthenticated = false
  public user: User | null = null
  public isLoading = true

  async init() {
    this.client = await createAuth0Client({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin + '/auth/callback',        
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    })

    this.isAuthenticated = await this.client.isAuthenticated()
    this.user = this.isAuthenticated ? (await this.client.getUser()) ?? null : null
    this.isLoading = false
  }

  async handleRedirectCallback() {
    if (!this.client) return
    await this.client.handleRedirectCallback()
    this.isAuthenticated = await this.client.isAuthenticated()
    this.user = this.isAuthenticated ? (await this.client.getUser()) ?? null : null
  }

  async loginWithRedirect(options?: RedirectLoginOptions) {
    await this.client?.loginWithRedirect(options)
  }

  async logout() {
    await this.client?.logout({ logoutParams: { returnTo: window.location.origin } })
  }

  async getAccessTokenSilently(options?: GetTokenSilentlyOptions) {
    return this.client?.getTokenSilently(options)
  }
}

interface AuthPlugin {
  install(app: App, instance: AuthService): void
}

const authPlugin: Plugin & AuthPlugin = {
  install(app: App, instance: AuthService): void {
    app.config.globalProperties.$auth = instance
    app.provide('auth', instance)
  }
}

export default authPlugin

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: AuthService
  }
}
