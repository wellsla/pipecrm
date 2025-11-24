<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useContacts } from '@/composables/useContacts';
import PipeContactCard from '@/components/ui/contact/PipeContactCard.vue';
import PipeDialog from '@/components/ui/dialog/PipeDialog.vue';
import PipeMessage from '@/components/ui/message/PipeMessage.vue';
import PipeContactForm from '@/components/ui/contact/PipeContactForm.vue';
import PipeButton from '@/components/ui/button/PipeButton.vue';
import type { Contact } from '@/types/contacts.types';

const {
  contacts,
  loading,
  error,
  fetchContacts,
  deleteContact,
  createContact,
  updateContact,
} = useContacts();

const selected = ref<Contact | null>(null);
const showContactDialog = ref(false);
const showFormDialog = ref(false);
const formModel = ref<Partial<Contact> | null>(null);

onMounted(async () => {
  await fetchContacts();
});

function handleClick(c: Contact) {
  selected.value = c;
  showContactDialog.value = true;
}

function handleDelete(c: Contact) {
  if (!confirm('Excluir contato?')) return;
  deleteContact(c.id);
}

function openCreate() {
  formModel.value = null;
  showFormDialog.value = true;
}

function openEdit(c: Contact) {
  formModel.value = c;
  showFormDialog.value = true;
}

import type { ContactInsert, ContactUpdate } from '@/types/contacts.types';

async function handleFormSubmit(payload: ContactInsert | ContactUpdate) {
  try {
    if (formModel.value?.id) {
      await updateContact(formModel.value.id, payload as ContactUpdate);
    } else {
      await createContact(payload as ContactInsert);
    }
    showFormDialog.value = false;
    formModel.value = null;
  } catch {}
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Contatos</h1>
      <PipeButton
        id="btn-new-contact"
        :label="'Novo Contato'"
        :icon="{ class: 'pi pi-plus', position: 'left' }"
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

    <div v-if="loading" class="p-6 text-slate-500">Carregando contatos...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PipeContactCard
        v-for="c in contacts"
        :key="c.id"
        :contact="c"
        @click="handleClick"
        @edit="openEdit(c)"
        @delete="handleDelete"
      />
    </div>

    <PipeDialog v-model="showContactDialog" header="Detalhes do contato">
      <div v-if="selected">
        <p><strong>Nome:</strong> {{ selected.name }}</p>
        <p><strong>Email:</strong> {{ selected.email || '—' }}</p>
        <p><strong>Telefone:</strong> {{ selected.phone || '—' }}</p>
      </div>
      <div v-else>Selecione um contato.</div>
    </PipeDialog>

    <PipeDialog
      v-model="showFormDialog"
      :header="formModel?.id ? 'Editar Contato' : 'Novo Contato'"
      :modal="true"
      width="32rem"
    >
      <PipeContactForm
        :modelValue="formModel"
        :loading="loading"
        @submit="handleFormSubmit"
        @cancel="showFormDialog = false"
      />
    </PipeDialog>
  </div>
</template>
