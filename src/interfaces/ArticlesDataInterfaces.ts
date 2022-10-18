import { AuthorInterface } from './AuthorInterface';

export interface ArticlesDataInterfaces {
  id: any;
  author: AuthorInterface;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: [string] | [null];
  title: string;
  updatedAt: string;
}
