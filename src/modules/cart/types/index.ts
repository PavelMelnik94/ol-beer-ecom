
import type { Product } from '@kernel/types';

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  promoCode?: string | null;
  discountAmount?: number;
  createdAt: string;
  updatedAt: string;
};

export type PromoCode = {
  code: string;
  discount: number;
  valid: boolean;
};

export type CartSummary = {
  totalItems: number;
  subtotal: number;
  promoCode?: string;
  discountAmount?: number;
  total: number;
};

export type CartAddItemRequest = {
  productId: string;
  quantity: number;
};

export type CartUpdateItemRequest = {
  id: string;
  quantity: number;
};

export type CartRemoveItemRequest = {
  id: string;
};

export type CartApplyPromoRequest = {
  promoCode: string | null;
};

export type CartPaymentRequest = {
  paymentMethod: string;
  billingAddressId?: string;
  shippingAddressId?: string;
};

export type OptimisticCartItem = CartItem & {
  isOptimistic?: boolean;
  isPending?: boolean;
};

export type CartApiResponse = {
  cart: Cart;
};
export type PromoCodeApiResponse = {
  message: string;
  promoCode: string;
  discountAmount: number;
  cart: Cart;
};
export type CartSummaryApiResponse = CartSummary;
