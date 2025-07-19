import type { Product } from '@kernel/types';

import type { Cart, CartItem, OptimisticCartItem, PromoCode } from '../types';
import { nanoid } from 'nanoid';

function clearCart(previous: Cart): Cart {
  return {
    ...previous,
    items: [],
    total: 0,
    discountAmount: 0,
    promoCode: undefined,
  };
}

function optimisticApplyPromo(previous: Cart, promoCode: string): Cart {
  return {
    ...previous,
    promoCode,
    discountAmount: 0,
  };
}

function optimisticRemovePromo(previous: Cart): Cart {
  return {
    ...previous,
    promoCode: undefined,
    discountAmount: 0,
  };
}
function getDefaultProduct(productId: string): Product {
  return {
    id: productId,
    title: '',
    description: '',
    price: 0,
    discount: 0,
    ABV: 0,
    IBU: 0,
    country: '',
    isDiscount: false,
    images: [],
    categories: [],
    brewery: {
      id: '',
      name: '',
      description: '',
      shortDescription: '',
      location: '',
      website: null,
      logo: '',
      createdAt: '',
      updatedAt: '',
    },
    averageRating: 0,
    createdAt: '',
    updatedAt: '',
  };
}

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

function calculateCartTotal(items: CartItem[], discountAmount = 0): number {
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

function syncLocalQuantities(previous: Record<string, number>, items: CartItem[]): Record<string, number> {
  const updated: Record<string, number> = { ...previous };
  for (const item of items) {
    updated[item.id] = item.quantity;
  }
  for (const id of Object.keys(updated)) {
    if (!items.some(item => item.id === id)) {
      delete updated[id];
    }
  }
  return updated;
}

function getInitialLocalQuantities(items: CartItem[]): Record<string, number> {
  const initial: Record<string, number> = {};
  for (const item of items) {
    initial[item.id] = item.quantity;
  }
  return initial;
}

function updateOrderedItems(previousItems: CartItem[], newItems: CartItem[]): CartItem[] {
  const updatedItems = [...previousItems];
  for (const newItem of newItems) {
    const index = updatedItems.findIndex(item => item.id === newItem.id);
    if (index === -1) {
      updatedItems.push(newItem);
    }
    else {
      updatedItems[index] = newItem;
    }
  }
  return updatedItems;
}

export const cartModel = {
  createOptimisticCartItem,
  calculateCartTotal,
  normalizeCartItems,
  applyPromoCode,
  syncLocalQuantities,
  getInitialLocalQuantities,
  getDefaultProduct,
  clearCart,
  optimisticApplyPromo,
  optimisticRemovePromo,
  updateOrderedItems,
} as const;
