<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDeals } from '@/composables/useDeals';
import { pipelineService } from '@/services/modules/pipelines/pipeline.service';
import PipeCard from '@/components/ui/card/PipeCard.vue';
import PipeDialog from '@/components/ui/dialog/PipeDialog.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import PipeActivityTimeline from '@/components/ui/activity/PipeActivityTimeline.vue';
import PipeDealForm from '@/components/ui/deal/PipeDealForm.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import type {
  DealWithRelations,
  DealInsert,
  DealUpdate,
} from '@/types/deals.types';

const currentPipelineId = ref<string | null>(null);
const {
  stages,
  loading,
  error,
  dealsByStage,
  fetchDeals,
  fetchStages,
  createDeal,
  updateDeal,
  deleteDeal,
} = useDeals();

const selectedDeal = ref<DealWithRelations | null>(null);
const showDealDialog = ref(false);
const showActivityTab = ref(true);
const showFormDialog = ref(false);
const formModel = ref<Partial<DealWithRelations> | null>(null);
const formStageId = ref<string>('');

onMounted(async () => {
  try {
    // Get or create default pipeline for current user
    currentPipelineId.value =
      await pipelineService.getOrCreateDefaultPipeline();
    await fetchStages(currentPipelineId.value);
    await fetchDeals();
  } catch (e) {
    console.error('Error loading pipeline:', e);
  }
});

function handleDealClick(deal: DealWithRelations) {
  selectedDeal.value = deal;
  showDealDialog.value = true;
}

function handleDealEdit(deal: DealWithRelations) {
  formModel.value = deal;
  formStageId.value = deal.stage_id;
  showFormDialog.value = true;
  showDealDialog.value = false;
}

function handleDealDelete(deal: DealWithRelations) {
  if (!confirm(`Excluir negócio "${deal.title}"?`)) return;
  deleteDeal(deal.id);
  showDealDialog.value = false;
}

function openCreateDeal(stageId: string) {
  formModel.value = null;
  formStageId.value = stageId;
  showFormDialog.value = true;
}

async function handleFormSubmit(payload: DealInsert | DealUpdate) {
  try {
    if (formModel.value?.id) {
      await updateDeal(formModel.value.id, payload as DealUpdate);
    } else {
      await createDeal(payload as DealInsert);
    }
    showFormDialog.value = false;
    formModel.value = null;
  } catch (e) {
    console.error('Error submitting deal:', e);
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function getStageTotal(stageId: string) {
  const stageDeals = dealsByStage.value[stageId] || [];
  return stageDeals.reduce((sum, deal) => sum + deal.amount, 0);
}
</script>

<template>
  <div class="p-6 h-full flex flex-col overflow-hidden">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-slate-800">Pipeline de Vendas</h1>
    </div>

    <PipeMessage
      v-if="error"
      severity="error"
      class="mb-4"
      :conditions="{ closable: true }"
    >
      {{ error }}
    </PipeMessage>

    <div
      v-if="loading"
      class="flex flex-col items-center justify-center gap-4 p-12 text-slate-500"
    >
      <i class="pi pi-spin pi-spinner text-3xl"></i>
      <p>Carregando pipeline...</p>
    </div>

    <div v-else class="flex gap-4 overflow-x-auto flex-1 pb-4">
      <div
        v-for="stage in stages"
        :key="stage.id"
        class="min-w-[320px] bg-slate-50 rounded-lg p-4 flex flex-col"
      >
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base font-semibold text-slate-800">
            {{ stage.name }}
          </h3>
          <span
            class="inline-flex items-center justify-center min-w-6 h-6 px-1 bg-slate-200 text-slate-800 rounded-full text-xs font-semibold"
          >
            {{ (dealsByStage[stage.id] || []).length }}
          </span>
        </div>
        <div
          class="text-lg font-bold text-primary mb-4 pb-3 border-b border-slate-200"
        >
          {{ formatCurrency(getStageTotal(stage.id)) }}
        </div>
        <div class="mb-3">
          <PipeButton
            :id="`btn-new-deal-${stage.id}`"
            label="Novo Negócio"
            :icon="{ class: 'pi pi-plus', position: 'left' }"
            size="small"
            outlined
            class="w-full"
            @click="openCreateDeal(stage.id)"
          />
        </div>
        <div class="flex-1 overflow-y-auto">
          <PipeCard
            v-for="deal in dealsByStage[stage.id] || []"
            :key="deal.id"
            :deal="deal"
            @click="handleDealClick"
            @edit="handleDealEdit"
            @delete="handleDealDelete"
          />
          <div
            v-if="(dealsByStage[stage.id] || []).length === 0"
            class="flex flex-col items-center justify-center text-slate-400 py-8 text-center"
          >
            <i class="pi pi-inbox text-3xl mb-2"></i>
            <p class="text-sm">Nenhum negócio</p>
          </div>
        </div>
      </div>
    </div>

    <PipeDialog
      v-model="showDealDialog"
      :header="selectedDeal?.title"
      :showHeader="true"
      :modal="true"
      width="50rem"
      @close="selectedDeal = null"
    >
      <div v-if="selectedDeal" class="flex flex-col gap-4">
        <!-- Deal Info Section -->
        <div class="p-4 bg-slate-50 rounded-lg space-y-2">
          <p>
            <strong>Valor:</strong> {{ formatCurrency(selectedDeal.amount) }}
          </p>
          <p><strong>Status:</strong> {{ selectedDeal.status }}</p>
          <div class="flex gap-2 pt-2">
            <PipeButton
              id="btn-edit-deal-modal"
              label="Editar"
              :icon="{ class: 'pi pi-pencil', position: 'left' }"
              size="small"
              outlined
              @click="handleDealEdit(selectedDeal)"
            />
            <PipeButton
              id="btn-delete-deal-modal"
              label="Excluir"
              :icon="{ class: 'pi pi-trash', position: 'left' }"
              severity="danger"
              size="small"
              outlined
              @click="handleDealDelete(selectedDeal)"
            />
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 border-b border-slate-200">
          <button
            class="px-4 py-2 text-sm font-medium transition-colors"
            :class="
              showActivityTab
                ? 'border-b-2 border-primary text-primary'
                : 'text-slate-600 hover:text-slate-900'
            "
            @click="showActivityTab = true"
          >
            <i class="pi pi-history mr-2"></i>
            Atividades
          </button>
          <button
            class="px-4 py-2 text-sm font-medium transition-colors"
            :class="
              !showActivityTab
                ? 'border-b-2 border-primary text-primary'
                : 'text-slate-600 hover:text-slate-900'
            "
            @click="showActivityTab = false"
          >
            <i class="pi pi-info-circle mr-2"></i>
            Detalhes
          </button>
        </div>

        <!-- Tab Content -->
        <div class="min-h-[400px] max-h-[500px] overflow-y-auto">
          <!-- Activities Tab -->
          <PipeActivityTimeline
            v-if="showActivityTab"
            :deal-id="selectedDeal.id"
          />

          <!-- Details Tab -->
          <div v-else class="space-y-3 p-4">
            <div>
              <label class="text-sm font-medium text-slate-600"
                >ID do Negócio</label
              >
              <p class="text-slate-800">{{ selectedDeal.id }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-slate-600"
                >ID do Pipeline</label
              >
              <p class="text-slate-800">{{ selectedDeal.pipeline_id }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-slate-600"
                >ID da Etapa</label
              >
              <p class="text-slate-800">{{ selectedDeal.stage_id }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-slate-600"
                >Criado em</label
              >
              <p class="text-slate-800">
                {{ new Date(selectedDeal.created_at).toLocaleString('pt-BR') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-slate-500">Nenhum negócio selecionado.</div>
    </PipeDialog>

    <PipeDialog
      v-model="showFormDialog"
      :header="formModel?.id ? 'Editar Negócio' : 'Novo Negócio'"
      :modal="true"
      width="32rem"
    >
      <PipeDealForm
        v-if="currentPipelineId"
        :modelValue="formModel"
        :stage-id="formStageId"
        :pipeline-id="currentPipelineId"
        :loading="loading"
        @submit="handleFormSubmit"
        @cancel="showFormDialog = false"
      />
    </PipeDialog>
  </div>
</template>
