import { Category } from './Category';
import { Location } from './Location';
import { Comment } from './Comment';
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
