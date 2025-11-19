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
    })
  }

  async signInWithPassword(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async signInWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
    if (error) throw error
  }

  async signUp(email: string, password: string, fullName?: string): Promise<void> {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    if (error) throw error
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/login?type=recovery`,
    })
    if (error) throw error
  }

  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async getProfile(): Promise<AuthProfile | null> {
    if (!this._user?.id) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', this._user.id)
      .single()

    if (error) return null

    return data
  }

  async updateProfile(updates: Partial<AuthProfile>): Promise<void> {
    if (!this._user?.id) throw new Error('Usuário não autenticado')

    const { error } = await supabase.from('profiles').update(updates).eq('id', this._user.id)

    if (error) throw error
  }
}
export default {
  install(app: App, instance: SupaAuthService) {
    app.config.globalProperties.$auth = instance
  },
}
