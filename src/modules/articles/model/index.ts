import type { ApiSuccessResponsePaginated } from '@kernel/index';
import type { Article } from '../types';

export const articlesModel = {
  flattenArticlesPages(pages: ApiSuccessResponsePaginated<Article>[] | undefined): Article[] {
    return pages?.flatMap(page => page.data) ?? [];
  },

  getNextPageParam(lastPage: ApiSuccessResponsePaginated<Article>) {
    const { page, totalPages } = lastPage.pagination;
    return page < totalPages ? page + 1 : undefined;
  },

  toggleLikeState(previous: { isLiked: boolean; likeCounter: number; }) {
    return {
      isLiked: !previous.isLiked,
      likeCounter: previous.isLiked ? previous.likeCounter - 1 : previous.likeCounter + 1,
    };
  },
};
