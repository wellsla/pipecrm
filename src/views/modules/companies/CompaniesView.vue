<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCompanies } from '@/composables/useCompanies';
import PipeCompanyCard from '@/components/ui/company/PipeCompanyCard.vue';
import PipeDialog from '@/components/ui/dialog/PipeDialog.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import PipeCompanyForm from '@/components/ui/company/PipeCompanyForm.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import type {
  Company,
  CompanyInsert,
  CompanyUpdate,
} from '@/types/companies.types';

const {
  companies,
  loading,
  error,
  fetchCompanies,
  deleteCompany,
  createCompany,
  updateCompany,
} = useCompanies();

const selected = ref<Company | null>(null);
const showCompanyDialog = ref(false);
const showFormDialog = ref(false);
const formModel = ref<Partial<Company> | null>(null);

onMounted(async () => {
  await fetchCompanies();
});

function handleClick(c: Company) {
  selected.value = c;
  showCompanyDialog.value = true;
}

function handleDelete(c: Company) {
  if (!confirm('Excluir empresa?')) return;
  deleteCompany(c.id);
}

function openCreate() {
  formModel.value = null;
  showFormDialog.value = true;
}

function openEdit(c: Company) {
  formModel.value = c;
  showFormDialog.value = true;
}

async function handleFormSubmit(payload: CompanyInsert | CompanyUpdate) {
  try {
    if (formModel.value?.id) {
      await updateCompany(formModel.value.id, payload as CompanyUpdate);
    } else {
      await createCompany(payload as CompanyInsert);
    }
    showFormDialog.value = false;
    formModel.value = null;
  } catch {}
}
</script>

<template>
  <div class="p-3 sm:p-6">
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6"
    >
      <h1 class="text-xl sm:text-2xl font-bold">Empresas</h1>
      <PipeButton
        id="btn-new-company"
        :label="'Nova Empresa'"
        :icon="{ class: 'pi pi-plus', position: 'left' }"
        size="small"
        class="w-full sm:w-auto"
        @click="openCreate"
      />
    </div>

    <PipeMessage
      v-if="error"
      severity="error"
      class="mb-4"
      :conditions="{ closable: true }"
    >
      {{ error }}
    </PipeMessage>

    <div v-if="loading" class="p-6 text-slate-500">Carregando empresas...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PipeCompanyCard
        v-for="c in companies"
        :key="c.id"
        :company="c"
        @click="handleClick"
        @edit="openEdit(c)"
        @delete="handleDelete"
      />
    </div>

    <PipeDialog v-model="showCompanyDialog" header="Detalhes da empresa">
      <div v-if="selected">
        <p><strong>Nome:</strong> {{ selected.name }}</p>
        <p><strong>Segmento:</strong> {{ selected.segment || '—' }}</p>
        <p><strong>Cidade:</strong> {{ selected.city || '—' }}</p>
      </div>
      <div v-else>Selecione uma empresa.</div>
    </PipeDialog>

    <PipeDialog
      v-model="showFormDialog"
      :header="formModel?.id ? 'Editar Empresa' : 'Nova Empresa'"
      :modal="true"
      width="95vw"
      class="max-w-lg"
    >
      <PipeCompanyForm
        :modelValue="formModel"
        :loading="loading"
        @submit="handleFormSubmit"
        @cancel="showFormDialog = false"
      />
    </PipeDialog>
  </div>
</template>
