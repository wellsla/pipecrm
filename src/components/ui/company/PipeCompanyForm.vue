<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type {
  Company,
  CompanyInsert,
  CompanyUpdate,
} from '@/types/companies.types';
import PipeInput from '@/components/ui/input/PipeInput.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';

interface Props {
  modelValue?: Partial<Company> | null;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  loading: false,
});

const emit = defineEmits<{
  submit: [payload: CompanyInsert | CompanyUpdate];
  cancel: [];
}>();

const name = ref('');
const segment = ref('');
const city = ref('');
const error = ref<string | null>(null);

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      name.value = val.name || '';
      segment.value = val.segment || '';
      city.value = val.city || '';
    } else {
      name.value = '';
      segment.value = '';
      city.value = '';
    }
  },
  { immediate: true }
);

const isEdit = computed(() => Boolean(props.modelValue?.id));

function validate() {
  if (!name.value.trim()) {
    error.value = 'Nome da empresa é obrigatório';
    return false;
  }
  error.value = null;
  return true;
}

function handleSubmit() {
  if (!validate()) return;
  if (isEdit.value) {
    const updatePayload: CompanyUpdate = {
      name: name.value.trim(),
      segment: segment.value.trim() || undefined,
      city: city.value.trim() || undefined,
    };
    emit('submit', updatePayload);
  } else {
    const createPayload: CompanyInsert = {
      name: name.value.trim(),
      segment: segment.value.trim() || undefined,
      city: city.value.trim() || undefined,
    };
    emit('submit', createPayload);
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex flex-col gap-1">
      <label for="company_name" class="text-xs font-medium text-slate-600"
        >Nome da Empresa</label
      >
      <PipeInput
        id="company_name"
        v-model="name"
        :conditions="{ disabled: props.loading }"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label for="segment" class="text-xs font-medium text-slate-600"
          >Segmento</label
        >
        <PipeInput
          id="segment"
          v-model="segment"
          :conditions="{ disabled: props.loading }"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="city" class="text-xs font-medium text-slate-600"
          >Cidade</label
        >
        <PipeInput
          id="city"
          v-model="city"
          :conditions="{ disabled: props.loading }"
        />
      </div>
    </div>

    <PipeMessage v-if="error" severity="warn" class="mt-2">{{
      error
    }}</PipeMessage>

    <div class="flex justify-end gap-2 pt-2">
      <PipeButton
        id="btn-cancel-company"
        :label="'Cancelar'"
        severity="secondary"
        variant="outlined"
        :conditions="{ disabled: props.loading }"
        @click="emit('cancel')"
        type="button"
      />
      <PipeButton
        id="btn-submit-company"
        :label="isEdit ? 'Salvar' : 'Criar'"
        :conditions="{ disabled: props.loading, loading: props.loading }"
        @click="handleSubmit"
        type="submit"
      />
    </div>
  </form>
</template>
