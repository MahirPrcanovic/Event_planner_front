import { Category } from './Category';

export interface Event {
  id: string;
  name: string;
  description: string;
  pictureUrl: string;
  date: string;
  location: Location | null;
  comments: Comment[] | null;
  category: Category | null;
}
