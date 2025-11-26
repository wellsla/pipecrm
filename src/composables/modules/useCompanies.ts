import { ref } from 'vue';
import { companiesService } from '@/services/modules/companies.service';
import { trackError } from '@/errors/tracking';
import { mapSupabasePostgrestError } from '@/errors/supabase/supabase.mapping';
import type { Company, CompanyInsert, CompanyUpdate } from '@/types/modules/companies.types';
import type { PostgrestError } from '@supabase/supabase-js';

export function useCompanies() {
  const companies = ref<Company[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function getCompanies() {
    loading.value = true;
    error.value = null;
    try {
      companies.value = await companiesService.getCompanies();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useCompanies.getCompanies');
    } finally {
      loading.value = false;
    }
  }

  async function createCompany(payload: CompanyInsert) {
    loading.value = true;
    error.value = null;
    try {
      const created = await companiesService.createCompany(payload);
      await getCompanies();
      return created;
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useCompanies.createCompany');
      throw appError;
    } finally {
      loading.value = false;
    }
  }

  async function updateCompany(id: string, updates: CompanyUpdate) {
    loading.value = true;
    error.value = null;
    try {
      const updated = await companiesService.updateCompany(id, updates);
      await getCompanies();
      return updated;
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useCompanies.updateCompany');
      throw appError;
    } finally {
      loading.value = false;
    }
  }

  async function deleteCompany(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await companiesService.deleteCompany(id);
      await getCompanies();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useCompanies.deleteCompany');
      throw appError;
    } finally {
      loading.value = false;
    }
  }

  return {
    companies,
    loading,
    error,
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  };
}
