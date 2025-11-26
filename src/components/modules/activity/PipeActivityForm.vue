<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ActivityType } from '@/types/modules/activities.types';

import type {
  DealActivity,
  DealActivityInsert,
  DealActivityUpdate,
} from '@/types/modules/activities.types';
import type { Database } from '@/db/supabase.types';

import PipeButton from '@/components/ui/button/PipeButton.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import PipeSelect from '@/components/ui/select/PipeSelect.vue';
import PipeTextarea from '@/components/ui/textarea/PipeTextarea.vue';

interface Props {
  activity?: DealActivity;
  dealId: string;
  loading?: boolean;
}

interface Emits {
  (e: 'submit', payload: DealActivityInsert | DealActivityUpdate): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  activity: undefined,
  loading: false,
});

const emit = defineEmits<Emits>();

const isEditMode = computed(() => !!props.activity);
const error = ref<string | null>(null);

const activityTypes: ActivityType[] = [
  ActivityType.NOTE,
  ActivityType.CALL,
  ActivityType.EMAIL,
  ActivityType.MEETING,
  ActivityType.TASK,
  ActivityType.OTHER,
];
const typeMap: Record<string, string> = {
  [ActivityType.NOTE]: 'Nota',
  [ActivityType.CALL]: 'Ligação',
  [ActivityType.EMAIL]: 'E-mail',
  [ActivityType.MEETING]: 'Reunião',
  [ActivityType.TASK]: 'Tarefa',
  [ActivityType.OTHER]: 'Outro',
};

const formData = ref<{
  type: string;
  content: string;
}>({
  type: props.activity?.type || '',
  content: props.activity?.content || '',
});

watch(
  () => props.activity,
  (newActivity) => {
    if (newActivity) {
      formData.value = {
        type: newActivity.type,
        content: newActivity.content || '',
      };
    }
  }
);

const handleSubmit = () => {
  error.value = null;

  if (!formData.value.type) {
    error.value = 'Tipo de atividade é obrigatório';
    return;
  }

  if (!formData.value.content?.trim()) {
    error.value = 'Conteúdo é obrigatório';
    return;
  }

  const payload: DealActivityInsert | DealActivityUpdate = {
    type: formData.value.type as Database['public']['Enums']['activity_type'],
    content: formData.value.content.trim(),
    ...(isEditMode.value ? {} : { deal_id: props.dealId }),
  };

  emit('submit', payload);
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <PipeMessage v-if="error" severity="error" :text="error" />

    <div class="flex flex-col gap-2">
      <label for="activity-type" class="text-sm font-medium"
        >Tipo de Atividade *</label
      >
      <PipeSelect
        v-model="formData.type"
        id="activity-type"
        :options="activityTypes"
        :optionLabel="(option: string) => typeMap[option]"
        placeholder="Selecione o tipo de atividade"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        :conditions="{ required: true }"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="content" class="text-sm font-medium">Conteúdo *</label>
      <PipeTextarea
        id="content"
        v-model="formData.content"
        :rows="5"
        placeholder="Digite o conteúdo da atividade"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        :conditions="{ required: true }"
      />
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t">
      <PipeButton
        id="cancel-activity-btn"
        label="Cancelar"
        severity="secondary"
        variant="outlined"
        @click="handleCancel"
      />
      <PipeButton
        id="submit-activity-btn"
        :label="isEditMode ? 'Atualizar Atividade' : 'Criar Atividade'"
        severity="primary"
        :conditions="{ loading: loading }"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>
