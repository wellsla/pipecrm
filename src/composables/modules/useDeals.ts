import { ref, computed } from 'vue';
import { dealsService } from '@/services/modules/deals.service';
import { trackError } from '@/errors/tracking';
import { mapSupabasePostgrestError } from '@/errors/supabase/supabase.mapping';
import type { DealInsert, DealUpdate, DealWithRelations, Stage } from '@/types/modules/deals.types';
import type { PostgrestError } from '@supabase/supabase-js';

export function useDeals(pipelineId?: string) {
  const deals = ref<DealWithRelations[]>([]);
  const stages = ref<Stage[]>([]);
  const loadingStages = ref(false);
  const loadingDeals = ref(false);
  const error = ref<string | null>(null);

  const dealsByStage = computed(() => {
    const grouped: Record<string, DealWithRelations[]> = {};

    stages.value.forEach(stage => {
      grouped[stage.id] = deals.value.filter(deal => deal.stage_id === stage.id);
    });

    return grouped;
  });

  async function getDeals() {
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

  async function getStages(pipeId: string) {
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

  async function createDeal(deal: DealInsert) {
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

  async function updateDeal(id: string, updates: DealUpdate) {
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

  async function deleteDeal(id: string) {
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
  };
}
