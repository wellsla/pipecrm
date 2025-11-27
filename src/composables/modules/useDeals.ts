import { ref, computed } from 'vue';
import { dealsService } from '@/services/modules/deals.service';
import { trackError } from '@/errors/tracking';
import { mapSupabasePostgrestError } from '@/errors/supabase/supabase.mapping';
import type { DealInsert, DealUpdate, DealWithRelations, Stage } from '@/types/modules/deals.types';
import type { PostgrestError } from '@supabase/supabase-js';

export const useDeals = (pipelineId?: string) => {
  const deals = ref<DealWithRelations[]>([]);
  const stages = ref<Stage[]>([]);
  const loadingStages = ref(false);
  const loadingDeals = ref(false);
  const error = ref<string | null>(null);
  const draggingDealId = ref<string | null>(null);

  const dealsByStage = computed(() => {
    const grouped: Record<string, DealWithRelations[]> = {};

    stages.value.forEach(stage => {
      grouped[stage.id] = deals.value.filter(deal => deal.stage_id === stage.id);
    });

    return grouped;
  });

  const getDeals = async () => {
    loadingDeals.value = true;
    error.value = null;

    try {
      deals.value = await dealsService.getDeals(pipelineId);
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.getDeals');
    } finally {
      loadingDeals.value = false;
    }
  }

  const getStages = async (pipeId: string) => {
    loadingStages.value = true;
    error.value = null;

    try {
      stages.value = await dealsService.getStages(pipeId);
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.getStages');
    } finally {
      loadingStages.value = false;
    }
  }

  const createDeal = async (deal: DealInsert) => {
    loadingDeals.value = true;
    error.value = null;

    try {
      const newDeal = await dealsService.createDeal(deal);
      await getDeals();
      return newDeal;
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.createDeal');
      throw appError;
    } finally {
      loadingDeals.value = false;
    }
  }

  const updateDeal = async (id: string, updates: DealUpdate) => {
    loadingDeals.value = true;
    error.value = null;

    try {
      const updated = await dealsService.updateDeal(id, updates);
      await getDeals();
      return updated;
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.updateDeal');
      throw appError;
    } finally {
      loadingDeals.value = false;
    }
  }

  const deleteDeal = async (id: string) => {
    loadingDeals.value = true;
    error.value = null;

    try {
      await dealsService.deleteDeal(id);
      await getDeals();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.deleteDeal');
      throw appError;
    } finally {
      loadingDeals.value = false;
    }
  }

  const startDragging = (dealId: string) => {
    const deal = deals.value.find(d => d.id === dealId);
    if (deal) {
      draggingDealId.value = dealId;
    }
  }
  
  const stopDragging = () => {
    draggingDealId.value = null;
  }

  const moveDealToStage = async (dealId: string, pipelineId: string, stageId: string) => {
    deals.value = deals.value.map(deal => {
      if (deal.id === dealId) {
        return { ...deal, pipeline_id: pipelineId, stage_id: stageId };
      }
      return deal;
    });

    try {
      await dealsService.moveDeal(dealId, pipelineId, stageId);
    } catch (e) {
      await getDeals();
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.moveDealToStage');
    }
  }

  return {
    deals,
    stages,
    loadingStages,
    loadingDeals,
    error,
    dealsByStage,
    getDeals,
    getStages,
    createDeal,
    updateDeal,
    deleteDeal,
    draggingDealId,
    startDragging,
    stopDragging,
    moveDealToStage,
  };
}
