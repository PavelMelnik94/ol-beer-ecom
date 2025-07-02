import type { CommentsState, OptimisticComment } from '../types';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface ArticleState {
  articleId: string;
  // Состояние комментариев для текущей статьи
  commentsState: CommentsState;
}

interface ArticleActions {
  setArticleId: (articleId: string) => void;
  // Действия для управления комментариями
  setComments: (comments: OptimisticComment[]) => void;
  setPagination: (pagination: { page: number; totalPages: number }) => void;
  setCommentsLoading: (isLoading: boolean) => void;
  addOptimisticComment: (comment: OptimisticComment) => void;
  updateOptimisticComment: (id: string, updates: Partial<OptimisticComment>) => void;
  removeOptimisticComment: (id: string) => void;
  resetCommentsState: () => void;
}

const initialCommentsState: CommentsState = {
  comments: [],
  pagination: { page: 1, totalPages: 1 },
  isLoading: false,
};

export const useArticleStore = create<ArticleState & ArticleActions>()(
  subscribeWithSelector(set => ({
    articleId: '',
    commentsState: initialCommentsState,

    setArticleId: (articleId: string) => {
      console.warn('📄 Setting article ID:', articleId);

      // Инвалидируем кэш комментариев для предыдущей статьи и новой
      // queryClient.invalidateQueries({
      //   predicate: (query) => {
      //     const key = query.queryKey;
      //     return Array.isArray(key) && key[0] === 'articles' && key[2] === 'comments';
      //   },
      // });

      set({
        articleId,
        // Сбрасываем состояние комментариев при смене статьи
        commentsState: initialCommentsState,
      });
    },

    setComments: (comments: OptimisticComment[]) =>
      set(state => ({
        commentsState: {
          ...state.commentsState,
          comments,
        },
      })),

    setPagination: (pagination: { page: number; totalPages: number }) =>
      set(state => ({
        commentsState: {
          ...state.commentsState,
          pagination,
        },
      })),

    setCommentsLoading: (isLoading: boolean) =>
      set(state => ({
        commentsState: {
          ...state.commentsState,
          isLoading,
        },
      })),

    addOptimisticComment: (comment: OptimisticComment) =>
      set(state => ({
        commentsState: {
          ...state.commentsState,
          comments: [comment, ...state.commentsState.comments],
        },
      })),

    updateOptimisticComment: (id: string, updates: Partial<OptimisticComment>) =>
      set(state => ({
        commentsState: {
          ...state.commentsState,
          comments: state.commentsState.comments.map(comment =>
            comment.id === id ? { ...comment, ...updates } : comment,
          ),
        },
      })),

    removeOptimisticComment: (id: string) =>
      set(state => ({
        commentsState: {
          ...state.commentsState,
          comments: state.commentsState.comments.filter(comment => comment.id !== id),
        },
      })),

    resetCommentsState: () =>
      set({ commentsState: initialCommentsState }),
  })),
);
