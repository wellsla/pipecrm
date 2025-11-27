import { supabase } from '@/db/supabase.client';
import type { Deal, DealInsert, DealUpdate, DealWithRelations, Stage } from '@/types/modules/deals.types';

export const dealsService = {
  async getDeals(pipelineId?: string): Promise<DealWithRelations[]> {
    let query = supabase
      .from('deals')
      .select('*, stage:pipeline_stages(*), pipeline:pipelines(*)');

    if (pipelineId) {
      query = query.eq('pipeline_id', pipelineId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as DealWithRelations[];
  },

  async getDealById(id: string): Promise<DealWithRelations | null> {
    const { data, error } = await supabase
      .from('deals')
      .select('*, stage:pipeline_stages(*), pipeline:pipelines(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as DealWithRelations;
  },

  async createDeal(deal: DealInsert): Promise<Deal> {
    const { data, error } = await supabase.from('deals').insert(deal).select().single();

    if (error) throw error;
    return data as Deal;
  },

  async updateDeal(id: string, updates: DealUpdate): Promise<Deal> {
    const { data, error } = await supabase
      .from('deals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Deal;
  },

  async deleteDeal(id: string): Promise<void> {
    const { error } = await supabase.from('deals').delete().eq('id', id);

    if (error) throw error;
  },

  async getStages(pipelineId: string): Promise<Stage[]> {
    const { data, error } = await supabase
      .from('pipeline_stages')
      .select('*')
      .eq('pipeline_id', pipelineId)
      .order('position', { ascending: true });

    if (error) throw error;
    return (data || []) as Stage[];
  },

  async moveDeal(dealId: string, pipelineId: string, stageId: string): Promise<Deal> {
    const { data, error } = await supabase
      .from('deals')
      .update({ pipeline_id: pipelineId, stage_id: stageId })
      .eq('id', dealId)
      .select()
      .single();

    if (error) throw error;
    return data as Deal;
  }
};
