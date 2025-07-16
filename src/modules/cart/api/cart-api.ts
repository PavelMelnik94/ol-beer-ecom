import type {
  Cart,
  CartItem,
  CartAddItemRequest,
  CartUpdateItemRequest,
  CartRemoveItemRequest,
  CartApplyPromoRequest,
  CartPaymentRequest,
  CartApiResponse,
  PromoCodeApiResponse,
  CartSummaryApiResponse,
} from '../types';
import { apiClient } from '@kernel/api/client';
import { QUERY_KEYS } from '@kernel/query/query-keys';


async function getCart(): Promise<CartApiResponse> {
  return apiClient.get('/api/cart');
}

async function clearCart(): Promise<CartApiResponse> {
  return apiClient.delete('/api/cart');
}

async function addCartItem(data: CartAddItemRequest): Promise<CartApiResponse> {
  return apiClient.post('/api/cart/items', data);
}

async function updateCartItem(id: string, data: CartUpdateItemRequest): Promise<CartApiResponse> {
  return apiClient.patch(`/api/cart/items/${id}`, data);
}

async function removeCartItem(id: string): Promise<CartApiResponse> {
  return apiClient.delete(`/api/cart/items/${id}`);
}

async function addCartItemsBatch(items: CartAddItemRequest[]): Promise<CartApiResponse> {
  return apiClient.post('/api/cart/items/batch', { items });
}

async function applyPromoCode(data: CartApplyPromoRequest): Promise<PromoCodeApiResponse> {
  return apiClient.post('/api/cart/promo', data);
}

async function removePromoCode(): Promise<CartApiResponse> {
  return apiClient.delete('/api/cart/promo');
}

async function processCartPayment(data: CartPaymentRequest): Promise<any> {
  return apiClient.post('/api/cart/payment', data);
}

async function getCartSummary(): Promise<CartSummaryApiResponse> {
  return apiClient.get('/api/cart/summary');
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
