<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type {
  DealActivity,
  DealActivityInsert,
  DealActivityUpdate,
} from '@/services/modules/activities/activities.types';
import { ActivityType } from '@/services/modules/activities/activities.types';
import type { Database } from '@/core/db/supabase.types';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';

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

// Activity types for dropdown
const activityTypes = [
  { value: ActivityType.NOTE, label: 'Nota' },
  { value: ActivityType.CALL, label: 'Ligação' },
  { value: ActivityType.EMAIL, label: 'E-mail' },
  { value: ActivityType.MEETING, label: 'Reunião' },
  { value: ActivityType.TASK, label: 'Tarefa' },
  { value: ActivityType.OTHER, label: 'Outro' },
];

// Form data
const formData = ref<{
  type: string;
  content: string;
}>({
  type: props.activity?.type || '',
  content: props.activity?.content || '',
});

// Watch for prop changes (edit mode)
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

  // Validation
  if (!formData.value.type) {
    error.value = 'Tipo de atividade é obrigatório';
    return;
  }

  if (!formData.value.content?.trim()) {
    error.value = 'Conteúdo é obrigatório';
    return;
  }

  // Build payload
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
    <!-- Error Message -->
    <PipeMessage v-if="error" severity="error" :text="error" />

    <!-- Activity Type Selector -->
    <div class="flex flex-col gap-2">
      <label for="activity-type" class="text-sm font-medium"
        >Tipo de Atividade *</label
      >
      <select
        id="activity-type"
        v-model="formData.type"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="" disabled>Selecione o tipo de atividade</option>
        <option
          v-for="type in activityTypes"
          :key="type.value"
          :value="type.value"
        >
          {{ type.label }}
        </option>
      </select>
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-2">
      <label for="content" class="text-sm font-medium">Conteúdo *</label>
      <textarea
        id="content"
        v-model="formData.content"
        rows="5"
        placeholder="Digite o conteúdo da atividade"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        required
      />
    </div>

    <!-- Form Actions -->
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
