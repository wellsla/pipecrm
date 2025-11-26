import { supabase } from '@/db/supabase.client'

export const pipelineService = {
  async ensureProfileExists(): Promise<void> {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) throw new Error('User not authenticated')

    const { error: authUserError } = await supabase.from('auth_users').upsert(
      {
        id: user.id,
        email: user.email || 'user@example.com'
      },
      { onConflict: 'id', ignoreDuplicates: true }
    )

    if (authUserError) {
      console.warn('Could not create auth_users entry:', authUserError)
    }

    const { data: profile, error: getError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle()

    if (getError && getError.code !== 'PGRST116') {
      console.error('Error checking profile:', getError)
    }

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
      }
    }
  },

  async getOrCreateDefaultPipeline(): Promise<string> {
    await this.ensureProfileExists()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) throw new Error('User not authenticated')

    const { data: existingPipelines, error: getError } = await supabase
      .from('pipelines')
      .select('id')
      .eq('owner_id', user.id)
      .limit(1)

    if (getError) throw getError

    if (existingPipelines && existingPipelines.length > 0) {
      return existingPipelines[0].id
    }

    const { data: newPipeline, error: createError } = await supabase
      .from('pipelines')
      .insert({ name: 'Pipeline de Vendas' })
      .select('id')
      .single()

    if (createError) throw createError

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
