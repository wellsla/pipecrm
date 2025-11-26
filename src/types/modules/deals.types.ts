import type { Pipeline } from './pipelines.types';

export type DealStatus = 'open' | 'won' | 'lost' | 'archived';

export interface Deal {
  id: string;
  title: string;
  amount: number;
  stage_id: string;
  pipeline_id: string;
  company_id?: string;
  contact_id?: string;
  owner_id: string;
  status: DealStatus;
  created_at: string;
  updated_at: string;
}

export interface Stage {
  id: string;
  name: string;
  position: number;
  pipeline_id: string;
  created_at: string;
}

export interface DealWithRelations extends Deal {
  stage?: Stage;
  pipeline?: Pipeline;
}

export type DealInsert = Omit<Deal, 'id' | 'created_at' | 'updated_at'>;
export type DealUpdate = Partial<DealInsert>;
