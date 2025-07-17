import type { Product } from '@kernel/types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  promoCode?: string | null;
  discountAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  valid: boolean;
}

export interface CartSummary {
  totalItems: number;
  subtotal: number;
  promoCode?: string;
  discountAmount?: number;
  total: number;
}

export interface CartAddItemRequest {
  productId: string;
  quantity: number;
}

export interface CartUpdateItemRequest {
  id: string;
  quantity: number;
}

export interface CartRemoveItemRequest {
  id: string;
}

export interface CartApplyPromoRequest {
  promoCode: string | null;
}

export interface CartPaymentRequest {
  paymentMethod: string;
  billingAddressId?: string;
  shippingAddressId?: string;
}

export type OptimisticCartItem = CartItem & {
  isOptimistic?: boolean;
  isPending?: boolean;
};

export interface CartApiResponse {
  cart: Cart;
}
export interface PromoCodeApiResponse {
  message: string;
  promoCode: string;
  discountAmount: number;
  cart: Cart;
}
export type CartSummaryApiResponse = CartSummary;
