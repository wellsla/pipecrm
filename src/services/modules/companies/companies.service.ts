import { supabase } from '@/core/db/supabase.client';
import type { Company, CompanyInsert, CompanyUpdate } from '@/services/modules/companies/companies.types';

export const companiesService = {
  async getCompanies(): Promise<Company[]> {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Company[];
  },

  async getCompanyById(id: string): Promise<Company | null> {
    const { data, error } = await supabase.from('companies').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Company;
  },

  async createCompany(company: CompanyInsert): Promise<Company> {
    const { data, error } = await supabase.from('companies').insert(company).select().single();
    if (error) throw error;
    return data as Company;
  },

  async updateCompany(id: string, updates: CompanyUpdate): Promise<Company> {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Company;
  },

  async deleteCompany(id: string): Promise<void> {
    const { error } = await supabase.from('companies').delete().eq('id', id);
    if (error) throw error;
  },
};
