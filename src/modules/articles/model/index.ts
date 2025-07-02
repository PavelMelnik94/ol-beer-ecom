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

  toggleLikeState(prev: { isLiked: boolean; likeCounter: number }) {
    return {
      isLiked: !prev.isLiked,
      likeCounter: prev.isLiked ? prev.likeCounter - 1 : prev.likeCounter + 1,
    };
  },
};
