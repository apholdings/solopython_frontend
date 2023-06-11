export interface ICategory {
  id: string;
  parent: string | null;
  name: string;
  title: string | null;
  description: string | null;
  thumbnail: string | null;
  slug: string;
  views: number;
  buyers: number;
  get_view_count: () => number;
}
