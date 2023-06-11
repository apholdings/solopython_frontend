import { IUser } from '../user';
import { IFeature } from './Feature';

export interface ITier {
  id: number;
  title: string | null;
  description: string | null;
  thumbnail: string | null;
  slug: string | null;
  mostPopular: boolean | null;
  features: IFeature[];
  user: IUser;
  tier_id: string;
  application_id: string;
  collector_id: string;
  external_reference: string | null;
  init_point: string | null;
  date_created: string;
  last_modified: string;
  reason: string;
  frequency: number;
  frequency_type: 'months';
  repetitions: number | null;
  billing_day: number;
  billing_day_proportional: boolean;
  free_trial_frequency: number | null;
  free_trial_frequency_type: 'months' | null;
  transaction_amount: string;
  transaction_amount_proportional: string | null;
  currency_id: string;
  payment_methods_allowed: object | null;
  back_url: string;
  index: number;
  status: 'active' | 'cancelled';
}
