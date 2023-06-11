import { IUser } from '../user';
import { ITier } from './Tier';

export interface ISubscription {
  id: number;
  subscriber: string;
  vendor: IUser;
  tier: ITier;
  subscription_id: string;
  reason: string;
  external_reference: string;
  preapproval_plan_id: string;
  init_point: string;
  back_url: string;
  status: string;
  payer_id: string;
  card_id: string;
  payment_method_id: string;
  next_payment_date: string;
  date_created: string;
  last_modified: string;
}
