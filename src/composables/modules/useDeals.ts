import { ref, computed } from 'vue';
import { dealsService } from '@/services/modules/deals/deals.service';
import { trackError } from '@/core/errors/error.tracking';
import { mapSupabasePostgrestError } from '@/core/errors/supabase/error.mapping';
import type { DealInsert, DealUpdate, DealWithRelations, Stage } from '@/services/modules/deals/deals.types';
import type { PostgrestError } from '@supabase/supabase-js';

export function useDeals(pipelineId?: string) {
  const deals = ref<DealWithRelations[]>([]);
  const stages = ref<Stage[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const dealsByStage = computed(() => {
    const grouped: Record<string, DealWithRelations[]> = {};

    stages.value.forEach(stage => {
      grouped[stage.id] = deals.value.filter(deal => deal.stage_id === stage.id);
    });

    return grouped;
  });

  async function fetchDeals() {
    loading.value = true;
    error.value = null;

    try {
      deals.value = await dealsService.getDeals(pipelineId);
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.fetchDeals');
    } finally {
      loading.value = false;
    }
  }

  async function fetchStages(pipeId: string) {
    loading.value = true;
    error.value = null;

    try {
      stages.value = await dealsService.getStages(pipeId);
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.fetchStages');
    } finally {
      loading.value = false;
    }
  }

  async function createDeal(deal: DealInsert) {
    loading.value = true;
    error.value = null;

    try {
      const newDeal = await dealsService.createDeal(deal);
      await fetchDeals();
      return newDeal;
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.createDeal');
      throw appError;
    } finally {
      loading.value = false;
    }
  }

  async function updateDeal(id: string, updates: DealUpdate) {
    loading.value = true;
    error.value = null;

    try {
      const updated = await dealsService.updateDeal(id, updates);
      await fetchDeals();
      return updated;
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.updateDeal');
      throw appError;
    } finally {
      loading.value = false;
    }
  }

  async function deleteDeal(id: string) {
    loading.value = true;
    error.value = null;

    try {
      await dealsService.deleteDeal(id);
      await fetchDeals();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useDeals.deleteDeal');
      throw appError;
    } finally {
      loading.value = false;
    }
  }

  return {
    deals,
    stages,
    loading,
    error,
    dealsByStage,
    fetchDeals,
    fetchStages,
    createDeal,
    updateDeal,
    deleteDeal,
  };
}
