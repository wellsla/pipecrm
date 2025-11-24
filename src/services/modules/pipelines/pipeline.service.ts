import { supabase } from '@/core/db/supabase.client'

/**
 * Pipeline Service Helper
 * Funções auxiliares para gerenciar pipelines
 */

export const pipelineService = {
  /**
   * Ensure user profile exists
   * Creates profile if missing (failsafe)
   */
  async ensureProfileExists(): Promise<void> {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) throw new Error('User not authenticated')

    // First, ensure auth_users entry exists
    const { error: authUserError } = await supabase.from('auth_users').upsert(
      {
        id: user.id,
        email: user.email || 'user@example.com'
      },
      { onConflict: 'id', ignoreDuplicates: true }
    )

    if (authUserError) {
      console.warn('Could not create auth_users entry:', authUserError)
      // Continue anyway - profile creation might still work
    }

    // Then, ensure profile exists
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle()

    // Ignore query formatting errors
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking profile:', fetchError)
    }

    // If profile doesn't exist, create it
    if (!profile) {
      const { error: profileError } = await supabase.from('profiles').upsert(
        {
          id: user.id,
          name: user.email || 'User',
          avatar_url: user.user_metadata?.avatar_url || null,
          is_admin: false
        },
        { onConflict: 'id', ignoreDuplicates: true }
      )

      if (profileError) {
        console.error('Error creating profile:', profileError)
        // Log but don't throw - profile might have been created by trigger
      }
    }
  },

  /**
   * Get or create default pipeline for current user
   * @returns Pipeline ID
   */
  async getOrCreateDefaultPipeline(): Promise<string> {
    // Ensure profile exists first
    await this.ensureProfileExists()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) throw new Error('User not authenticated')

    // Try to get existing pipeline
    const { data: existingPipelines, error: fetchError } = await supabase
      .from('pipelines')
      .select('id')
      .eq('owner_id', user.id)
      .limit(1)

    if (fetchError) throw fetchError

    if (existingPipelines && existingPipelines.length > 0) {
      return existingPipelines[0].id
    }

    // Create new pipeline if none exists
    const { data: newPipeline, error: createError } = await supabase
      .from('pipelines')
      .insert({ name: 'Pipeline de Vendas' })
      .select('id')
      .single()

    if (createError) throw createError

    // Create default stages
    const stages = [
      { name: 'Prospecção', position: 1 },
      { name: 'Qualificação', position: 2 },
      { name: 'Proposta', position: 3 },
      { name: 'Negociação', position: 4 },
      { name: 'Fechamento', position: 5 }
    ]

    const stagesWithPipelineId = stages.map((stage) => ({
      ...stage,
      pipeline_id: newPipeline.id
    }))

    const { error: stagesError } = await supabase
      .from('pipeline_stages')
      .insert(stagesWithPipelineId)

    if (stagesError) throw stagesError

    return newPipeline.id
  }
}
