import { ref } from 'vue';
import { contactsService } from '@/services/modules/contacts/contacts.service';
import { trackError } from '@/core/errors/error.tracking';
import { mapSupabasePostgrestError } from '@/core/errors/supabase/error.mapping';
import type { Contact, ContactInsert, ContactUpdate } from '@/services/modules/contacts/contacts.types';
import type { PostgrestError } from '@supabase/supabase-js';

export function useContacts() {
  const contacts = ref<Contact[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchContacts() {
    loading.value = true;
    error.value = null;
    try {
      contacts.value = await contactsService.getContacts();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useContacts.fetchContacts');
    } finally {
      loading.value = false;
    }
  }

  async function createContact(payload: ContactInsert) {
    loading.value = true;
    error.value = null;
    try {
      const created = await contactsService.createContact(payload);
      await fetchContacts();
      return created;
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useContacts.createContact');
      throw appError;
    } finally {
      loading.value = false;
    }
  }

  async function updateContact(id: string, updates: ContactUpdate) {
    loading.value = true;
    error.value = null;
    try {
      const updated = await contactsService.updateContact(id, updates);
      await fetchContacts();
      return updated;
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useContacts.updateContact');
      throw appError;
    } finally {
      loading.value = false;
    }
  }

  async function deleteContact(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await contactsService.deleteContact(id);
      await fetchContacts();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useContacts.deleteContact');
      throw appError;
    } finally {
      loading.value = false;
    }
  }

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
  };
}
