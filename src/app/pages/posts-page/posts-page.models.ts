import {BaseEntity, User} from '../registration-page/registration-page.models';

export interface Post extends BaseEntity {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  imageUrl: string;
  user: User;
}
