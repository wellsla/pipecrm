import { ref } from 'vue';
import { pipelineService } from '@/services/modules/pipelines/pipeline.service';
import { trackError } from '@/core/errors/error.tracking';
import { mapSupabasePostgrestError } from '@/core/errors/supabase/error.mapping';
import type { PostgrestError } from '@supabase/supabase-js';

export function usePipelines() {
  const pipelineId = ref<string>('');
  const loading = ref(false);

  async function fetchPipelines() {
    loading.value = true;

    try {
      pipelineId.value = await pipelineService.getOrCreateDefaultPipeline();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      trackError(appError, 'usePipelines.fetchPipelines');
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    pipelineId,
    fetchPipelines,
  };
}
