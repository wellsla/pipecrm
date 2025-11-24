import { supabase } from '@/core/db/supabase.client';
import type { Contact, ContactInsert, ContactUpdate } from '@/services/modules/contacts/contacts.types';

export const contactsService = {
  async getContacts(): Promise<Contact[]> {
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getContactById(id: string): Promise<Contact | null> {
    const { data, error } = await supabase.from('contacts').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async createContact(contact: ContactInsert): Promise<Contact> {
    const { data, error } = await supabase.from('contacts').insert(contact).select().single();
    if (error) throw error;
    return data;
  },

  async updateContact(id: string, updates: ContactUpdate): Promise<Contact> {
    const { data, error } = await supabase.from('contacts').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteContact(id: string): Promise<void> {
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) throw error;
  },
};
