import type { Cart, CartItem, OptimisticCartItem, PromoCode } from '../types';
import { nanoid } from 'nanoid';


function createOptimisticCartItem(product: CartItem['product'], quantity: number): OptimisticCartItem {
  return {
    id: nanoid(),
    product,
    quantity,
    subtotal: product.price * quantity,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isOptimistic: true,
    isPending: false,
  };
}

function calculateCartTotal(items: CartItem[], discountAmount: number = 0): number {
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  return Math.max(total - discountAmount, 0);
}

function normalizeCartItems(items: CartItem[]): CartItem[] {
  return items.map(item => ({
    ...item,
    subtotal: item.product.price * item.quantity,
  }));
}

function applyPromoCode(cart: Cart, promo: PromoCode): Cart {
  return {
    ...cart,
    promoCode: promo.code,
    discountAmount: promo.discount,
    total: calculateCartTotal(cart.items, promo.discount),
  };
}

export const cartModel = {
  createOptimisticCartItem,
  calculateCartTotal,
  normalizeCartItems,
  applyPromoCode,
} as const;
