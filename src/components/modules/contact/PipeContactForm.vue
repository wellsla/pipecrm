<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type {
  Contact,
  ContactInsert,
  ContactUpdate,
} from '@/services/modules/contacts/contacts.types';
import PipeInput from '@/components/ui/input/PipeInput.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';

interface Props {
  modelValue?: Partial<Contact> | null;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  loading: false,
});

const emit = defineEmits<{
  submit: [payload: ContactInsert | ContactUpdate];
  cancel: [];
}>();

const name = ref('');
const email = ref('');
const phone = ref('');
const position = ref('');
const error = ref<string | null>(null);

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      name.value = val.name || '';
      email.value = val.email || '';
      phone.value = val.phone || '';
      position.value = val.position || '';
    } else {
      name.value = '';
      email.value = '';
      phone.value = '';
      position.value = '';
    }
  },
  { immediate: true }
);

const isEdit = computed(() => Boolean(props.modelValue?.id));

function validate() {
  if (!name.value.trim()) {
    error.value = 'Nome é obrigatório';
    return false;
  }
  error.value = null;
  return true;
}

function handleSubmit() {
  if (!validate()) return;

  const payload: ContactInsert | ContactUpdate = {
    name: name.value.trim(),
    email: email.value.trim() || null,
    phone: phone.value.trim() || null,
    position: position.value.trim() || null,
  };

  emit('submit', payload);
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <PipeMessage v-if="error" severity="warn" class="mt-2">{{
      error
    }}</PipeMessage>

    <div class="flex flex-col gap-1">
      <label for="name" class="text-xs font-medium">Nome *</label>
      <PipeInput
        id="name"
        v-model="name"
        :conditions="{ disabled: props.loading }"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label for="email" class="text-xs font-medium">Email</label>
        <PipeInput
          id="email"
          v-model="email"
          type="text"
          :conditions="{ disabled: props.loading }"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="phone" class="text-xs font-medium">Telefone</label>
        <PipeInput
          id="phone"
          v-model="phone"
          :conditions="{ disabled: props.loading }"
        />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label for="position" class="text-xs font-medium">Cargo</label>
      <PipeInput
        id="position"
        v-model="position"
        :conditions="{ disabled: props.loading }"
      />
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <PipeButton
        id="btn-cancel-contact"
        :label="'Cancelar'"
        severity="secondary"
        variant="outlined"
        :conditions="{ disabled: props.loading }"
        @click="emit('cancel')"
        type="button"
      />
      <PipeButton
        id="btn-submit-contact"
        :label="isEdit ? 'Salvar' : 'Criar'"
        :conditions="{ disabled: props.loading, loading: props.loading }"
        @click="handleSubmit"
        type="submit"
      />
    </div>
  </form>
</template>
