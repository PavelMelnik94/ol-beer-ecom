import { API_ENDPOINTS, type ApiSuccessResponse } from '@kernel/api';
import type {
  CartAddItemRequest,
  CartUpdateItemRequest,
  CartApplyPromoRequest,
  CartPaymentRequest,
  PromoCodeApiResponse,
  CartSummaryApiResponse,
  Cart,
} from '../types';
import { apiClient } from '@kernel/api/client';


export type ApiSuccessResponseCart = ApiSuccessResponse<Cart>
export type ApiSuccessResponsePromocode = ApiSuccessResponse<PromoCodeApiResponse>
export type ApiSuccessResponseCartSummary = ApiSuccessResponse<CartSummaryApiResponse>

async function getCart(): Promise<ApiSuccessResponseCart> {
  return apiClient.get(API_ENDPOINTS.cart.cart);
}

async function clearCart(): Promise<ApiSuccessResponseCart> {
  return apiClient.delete(API_ENDPOINTS.cart.cart);
}

async function addCartItem(data: CartAddItemRequest): Promise<ApiSuccessResponseCart> {
  return apiClient.post(API_ENDPOINTS.cart.items, data);
}

async function updateCartItem(id: string, data: CartUpdateItemRequest): Promise<ApiSuccessResponseCart> {
  return apiClient.patch(API_ENDPOINTS.cart.item(id), data);
}

async function removeCartItem(id: string): Promise<ApiSuccessResponseCart> {
  return apiClient.delete(API_ENDPOINTS.cart.item(id));
}

async function addCartItemsBatch(items: CartAddItemRequest[]): Promise<ApiSuccessResponseCart> {
  return apiClient.post(API_ENDPOINTS.cart.itemsBatch, { items });
}

async function applyPromoCode(data: CartApplyPromoRequest): Promise<ApiSuccessResponsePromocode> {
  return apiClient.post(API_ENDPOINTS.cart.promo, data);
}

async function removePromoCode(): Promise<ApiSuccessResponseCart> {
  return apiClient.delete(API_ENDPOINTS.cart.promo);
}

async function processCartPayment(data: CartPaymentRequest): Promise<unknown> {
  return apiClient.post(API_ENDPOINTS.cart.payment, data);
}

async function getCartSummary(): Promise<ApiSuccessResponseCartSummary> {
  return apiClient.get(API_ENDPOINTS.cart.summary);
}

export const cartApi = {
  getCart,
  clearCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  addCartItemsBatch,
  applyPromoCode,
  removePromoCode,
  processCartPayment,
  getCartSummary,
} as const;
