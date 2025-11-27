import { ref } from 'vue';
import { contactsService } from '@/services/modules/contacts.service';
import { trackError } from '@/errors/tracking';
import { mapSupabasePostgrestError } from '@/errors/supabase/supabase.mapping';
import type { Contact, ContactInsert, ContactUpdate } from '@/types/modules/contacts.types';
import type { PostgrestError } from '@supabase/supabase-js';

export const useContacts = () => {
  const contacts = ref<Contact[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const getContacts = async () => {
    loading.value = true;
    error.value = null;
    try {
      contacts.value = await contactsService.getContacts();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useContacts.getContacts');
    } finally {
      loading.value = false;
    }
  }

  const createContact = async (payload: ContactInsert) => {
    loading.value = true;
    error.value = null;
    try {
      const created = await contactsService.createContact(payload);
      await getContacts();
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

  const updateContact = async (id: string, updates: ContactUpdate) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await contactsService.updateContact(id, updates);
      await getContacts();
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

  const deleteContact = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await contactsService.deleteContact(id);
      await getContacts();
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
    getContacts,
    createContact,
    updateContact,
    deleteContact,
  };
}
