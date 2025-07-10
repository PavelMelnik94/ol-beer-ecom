import type { ApiErrorResponse, ApiSuccessResponse, ApiSuccessResponsePaginated } from '@kernel/index';
import type { Comment, CommentCreateRequest } from '../types';
import { API_ENDPOINTS, apiClient } from '@kernel/index';

export type CommentsResponse = ApiSuccessResponsePaginated<Comment>;
export type CommentResponse = ApiSuccessResponse<Comment>;
export type ErrorResponse = ApiErrorResponse;

export function getComments(articleId: string, page: number): Promise<ApiSuccessResponsePaginated<Comment>> {
  return apiClient.get(`${API_ENDPOINTS.products.comments(articleId)}?page=${page}`);
}

export function createComment(articleId: string, data: CommentCreateRequest): Promise<ApiSuccessResponse<Comment>> {
  return apiClient.post(`${API_ENDPOINTS.products.commentCreate(articleId)}`, data);
}

export function updateComment(id: string, content: string): Promise<ApiSuccessResponse<Comment>> {
  return apiClient.patch(`${API_ENDPOINTS.products.commentEdit(id)}`, { content });
}

export function deleteComment(id: string): Promise<ApiSuccessResponse<Comment>> {
  return apiClient.delete(`${API_ENDPOINTS.products.commentDelete(id)}`);
}

export function likeComment(id: string): Promise<ApiSuccessResponse<Comment>> {
  return apiClient.post(`${API_ENDPOINTS.products.commentLike(id)}`);
}

export const commentsProductsApi = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
};
