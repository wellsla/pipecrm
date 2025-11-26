import { ref } from 'vue';
import { pipelineService } from '@/services/modules/pipelines.service';
import { trackError } from '@/errors/tracking';
import { mapSupabasePostgrestError } from '@/errors/supabase/supabase.mapping';
import type { PostgrestError } from '@supabase/supabase-js';

export function usePipelines() {
  const pipelineId = ref<string>('');
  const loading = ref(false);

  async function getPipelines() {
    loading.value = true;

    try {
      pipelineId.value = await pipelineService.getOrCreateDefaultPipeline();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      trackError(appError, 'usePipelines.getPipelines');
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    pipelineId,
    getPipelines,
  };
}
