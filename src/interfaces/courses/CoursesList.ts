import { IUser } from '../user';

export interface ICourseList {
  author: IUser;
  best_seller: boolean;
  category: string;
  status: string;
  compare_price: number | null;
  created_at: string;
  discount: boolean;
  discount_until: string;
  id: string;
  keywords: string | null;
  language: string | null;
  level: string | null;
  nft_address: string;
  payment: string;
  price: number | null;
  rating: any[]; // Definir este tipo adecuadamente
  sellers: any[]; // Definir este tipo adecuadamente
  short_description: string | null;
  slug: string;
  taught: string | null;
  thumbnail: string | null;
  title: string;
  token_id: string;
  updated_at: string;
  video: string | null;
  student_rating: number;
  student_rating_no: number;
}
