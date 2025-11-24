<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCompanies } from '@/composables/useCompanies';
import { useContacts } from '@/composables/useContacts';
import PipeInput from '@/components/ui/input/PipeInput.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import type { DealInsert, DealUpdate } from '@/types/deals.types';

interface Props {
  modelValue: (Partial<DealInsert> & { id?: string }) | null;
  stageId: string;
  pipelineId: string;
  loading?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  submit: [payload: DealInsert | DealUpdate];
  cancel: [];
}>();

const { companies, fetchCompanies } = useCompanies();
const { contacts, fetchContacts } = useContacts();

// Form state
const formData = ref({
  title: props.modelValue?.title || '',
  amount: props.modelValue?.amount || 0,
  company_id: props.modelValue?.company_id || (null as string | null),
  contact_id: props.modelValue?.contact_id || (null as string | null),
  status: props.modelValue?.status || 'open',
});

const statusOptions = [
  { label: 'Aberto', value: 'open' },
  { label: 'Ganho', value: 'won' },
  { label: 'Perdido', value: 'lost' },
  { label: 'Arquivado', value: 'archived' },
];

// Load companies and contacts
fetchCompanies();
fetchContacts();

// Watch for model changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      formData.value = {
        title: newValue.title || '',
        amount: newValue.amount || 0,
        company_id: newValue.company_id || null,
        contact_id: newValue.contact_id || null,
        status: newValue.status || 'open',
      };
    }
  },
  { immediate: true }
);

function handleSubmit() {
  const payload: DealInsert | DealUpdate = {
    title: formData.value.title,
    amount: formData.value.amount,
    company_id: formData.value.company_id || undefined,
    contact_id: formData.value.contact_id || undefined,
    status: formData.value.status as 'open' | 'won' | 'lost' | 'archived',
    stage_id: props.stageId,
    pipeline_id: props.pipelineId,
  };

  emit('submit', payload);
}

function handleCancel() {
  emit('cancel');
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <div>
      <label for="deal-title" class="block text-sm font-medium mb-2"
        >Título *</label
      >
      <PipeInput
        id="deal-title"
        v-model="formData.title"
        placeholder="Digite o título do negócio"
        required
      />
    </div>

    <div>
      <label for="deal-amount" class="block text-sm font-medium mb-2"
        >Valor *</label
      >
      <InputNumber
        id="deal-amount"
        v-model="formData.amount"
        mode="currency"
        currency="BRL"
        locale="pt-BR"
        :min="0"
        :minFractionDigits="2"
        class="w-full"
        required
      />
    </div>

    <div>
      <label for="deal-company" class="block text-sm font-medium mb-2"
        >Empresa</label
      >
      <Dropdown
        id="deal-company"
        v-model="formData.company_id"
        :options="companies"
        optionLabel="name"
        optionValue="id"
        placeholder="Selecione uma empresa"
        class="w-full"
        showClear
      />
    </div>

    <div>
      <label for="deal-contact" class="block text-sm font-medium mb-2"
        >Contato</label
      >
      <Dropdown
        id="deal-contact"
        v-model="formData.contact_id"
        :options="contacts"
        optionLabel="name"
        optionValue="id"
        placeholder="Selecione um contato"
        class="w-full"
        showClear
      />
    </div>

    <div>
      <label for="deal-status" class="block text-sm font-medium mb-2"
        >Status *</label
      >
      <Dropdown
        id="deal-status"
        v-model="formData.status"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Selecione o status"
        class="w-full"
        required
      />
    </div>

    <div class="flex justify-end gap-2 pt-4">
      <PipeButton
        id="btn-cancel-deal"
        label="Cancelar"
        severity="secondary"
        outlined
        @click="handleCancel"
        type="button"
      />
      <PipeButton
        id="btn-submit-deal"
        :label="modelValue?.id ? 'Atualizar' : 'Criar'"
        type="submit"
        :loading="loading"
      />
    </div>
  </form>
</template>
