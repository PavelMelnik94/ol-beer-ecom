import type { ApiSuccessResponse, ApiSuccessResponsePaginated, ApiErrorResponse } from '@kernel/index';
import type { Comment, CommentCreateRequest } from '../types';
import { API_ENDPOINTS, apiClient } from '@kernel/index';

export type CommentsResponse = ApiSuccessResponsePaginated<Comment>;
export type CommentResponse = ApiSuccessResponse<Comment>;
export type ErrorResponse = ApiErrorResponse;

export function getCommentsApi(articleId: string, page: number): Promise<ApiSuccessResponsePaginated<Comment>> {
  return apiClient.get(`${API_ENDPOINTS.articles.comments(articleId)}?page=${page}`);
}

export function createCommentApi(articleId: string, data: CommentCreateRequest): Promise<ApiSuccessResponse<Comment>> {
  return apiClient.post(`${API_ENDPOINTS.articles.commentCreate(articleId)}`, data);
}

export function updateCommentApi(id: string, content: string): Promise<ApiSuccessResponse<Comment>> {
  return apiClient.put(`${API_ENDPOINTS.articles.commentEdit(id)}`, { content });
}

export function deleteCommentApi(id: string): Promise<ApiSuccessResponse<Comment>> {
  return apiClient.delete(`${API_ENDPOINTS.articles.commentDelete(id)}`);
}

export function likeCommentApi(id: string): Promise<ApiSuccessResponse<Comment>> {
  return apiClient.post(`${API_ENDPOINTS.articles.commentLike(id)}`);
}

export const commentsApi = {
  getComments: getCommentsApi,
  createComment: createCommentApi,
  updateComment: updateCommentApi,
  deleteComment: deleteCommentApi,
  likeComment: likeCommentApi,
};
