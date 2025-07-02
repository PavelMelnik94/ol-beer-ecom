import type { ApiErrorResponse, ApiSuccessResponse, LikeResponse } from '@kernel/index';
import type { Article, ArticleDetails } from '@modules/articles/types';
import { API_ENDPOINTS, apiClient } from '@kernel/index';

export type SuccessResponseArticleLike = ApiSuccessResponse<LikeResponse>;
export type SuccessResponseRandomArticle = ApiSuccessResponse<Article>;
export type SuccessResponseArticleDetails = ApiSuccessResponse<ArticleDetails>;
export type ErrorResponse = ApiErrorResponse;

async function likeArticle(articleId: string): Promise<SuccessResponseArticleLike> {
  return apiClient.post(`${API_ENDPOINTS.articles.articleLike(articleId)}`);
}

async function getRandomArticle(excludeId: string): Promise<SuccessResponseRandomArticle> {
  return apiClient.get(`${API_ENDPOINTS.articles.randomArticle(excludeId)}`);
}

async function getArticleDetails(id: string): Promise<SuccessResponseArticleDetails> {
  return apiClient.get(`${API_ENDPOINTS.articles.articleDetails(id)}`)
}

export const articleApi = {
  likeArticle,
  getRandomArticle,
  getArticleDetails,
}
