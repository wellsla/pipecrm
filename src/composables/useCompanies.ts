import { ref } from 'vue';
import { companiesService } from '@/services/modules/companies/companies.service';
import { trackError } from '@/core/errors/error.tracking';
import { mapSupabasePostgrestError } from '@/core/errors/supabase/error.mapping';
import type { Company, CompanyInsert, CompanyUpdate } from '@/types/companies.types';
import type { PostgrestError } from '@supabase/supabase-js';

export function useCompanies() {
  const companies = ref<Company[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCompanies() {
    loading.value = true;
    error.value = null;
    try {
      companies.value = await companiesService.getCompanies();
    } catch (e) {
      const appError = mapSupabasePostgrestError(e as PostgrestError);
      error.value = appError.message;
      trackError(appError, 'useCompanies.fetchCompanies');
    } finally {
      loading.value = false;
    }
  }

  async function createCompany(payload: CompanyInsert) {
    loading.value = true;
    error.value = null;
    try {
      const created = await companiesService.createCompany(payload);
      await fetchCompanies();
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
      await fetchCompanies();
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
      await fetchCompanies();
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
    fetchCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  };
}
