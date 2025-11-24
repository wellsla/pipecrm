export interface Company {
  id: string;
  name: string;
  segment?: string;
  city?: string;
  created_at: string;
}

export type CompanyInsert = Omit<Company, 'id' | 'created_at'>;
export type CompanyUpdate = Partial<CompanyInsert>;
