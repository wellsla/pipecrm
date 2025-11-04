import type { Session, User } from '@supabase/supabase-js'
import type { App } from 'vue'
import { supabase } from '@/services/supabase.client'

export interface AuthProfile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
}

export class SupaAuthService {
  private _session: Session | null = null
  private _user: User | null = null

  get session(): Session | null {
    return this._session
  }
  get user(): User | null {
    return this._user
  }
  get isAuthenticated(): boolean {
    return !!this._session && !!this._user
  }

  async init(): Promise<void> {
    const { data } = await supabase.auth.getSession()
    this._session = data.session ?? null
    this._user = data.session?.user ?? null

    supabase.auth.onAuthStateChange((_event, sess) => {
      this._session = sess
      this._user = sess?.user ?? null
      sessionStorage.setItem('__pipecrm_auth__', this.isAuthenticated ? '1' : '0')
    })
    sessionStorage.setItem('__pipecrm_auth__', this.isAuthenticated ? '1' : '0')
  }

  async signInWithPassword(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async signInWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) throw error
  }

  async signUp(email: string, password: string, name?: string): Promise<void> {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    if (data.user?.id) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        name: name || null,
        avatar_url: null,
      })
    }
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth/login',
    })
    if (error) throw error
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}
export default {
  install(app: App, instance: SupaAuthService) {
    app.config.globalProperties.$auth = instance
  },
}
