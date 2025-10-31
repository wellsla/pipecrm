import { createAuth0Client, Auth0Client } from '@auth0/auth0-spa-js'
import type { GetTokenSilentlyOptions, RedirectLoginOptions, User } from '@auth0/auth0-spa-js'
import type { App } from 'vue'

export interface AuthUser extends User {
  sub: string
  name?: string
  email?: string
  picture?: string
}

export class AuthService {
  private client: Auth0Client | null = null
  public isAuthenticated = false
  public user: User | null = null
  public isLoading = true

  async init(): Promise<void> {
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
    this.user = this.isAuthenticated ? ((await this.client.getUser()) as AuthUser) : null
    this.isLoading = false
  }

  async handleRedirectCallback(): Promise<void> {
    if (!this.client) return
    await this.client.handleRedirectCallback()
    this.isAuthenticated = await this.client.isAuthenticated()
    this.user = this.isAuthenticated ? ((await this.client.getUser()) as AuthUser) : null
  }

  async loginWithRedirect(options?: RedirectLoginOptions): Promise<void> {
    await this.client?.loginWithRedirect(options)
  }

  async logout(): Promise<void> {
    await this.client?.logout({ logoutParams: { returnTo: window.location.origin } })
  }

  async getAccessTokenSilently(options?: GetTokenSilentlyOptions): Promise<string | undefined> {
    return this.client?.getTokenSilently(options)
  }
}

export default {
  install(app: App, instance: AuthService) {
    app.config.globalProperties.$auth = instance
  },
}
