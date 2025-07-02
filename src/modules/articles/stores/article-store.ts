import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface ArticleState {
  articleId: string;
}

interface ArticleActions {
  setArticleId: (articleId: string) => void;

}

export const useArticleStore = create<ArticleState & ArticleActions>()(
  subscribeWithSelector(set => ({
    articleId: '',

    setArticleId: (articleId: string) => {
      set({
        articleId,
      });
    },

  })),
);
