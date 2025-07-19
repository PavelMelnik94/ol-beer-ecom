import type { Product } from '@kernel/types';

import type { Cart, CartItem, OptimisticCartItem, PromoCode } from '../types';
import { nanoid } from 'nanoid';

function clearCart(prev: Cart): Cart {
  return {
    ...prev,
    items: [],
    total: 0,
    discountAmount: 0,
    promoCode: null,
  };
}

function optimisticApplyPromo(prev: Cart, promoCode: string): Cart {
  return {
    ...prev,
    promoCode,
    discountAmount: 0,
  };
}

function optimisticRemovePromo(prev: Cart): Cart {
  return {
    ...prev,
    promoCode: null,
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

function syncLocalQuantities(prev: Record<string, number>, items: CartItem[]): Record<string, number> {
  const updated: Record<string, number> = { ...prev };
  items.forEach((item) => {
    updated[item.id] = item.quantity;
  });
  Object.keys(updated).forEach((id) => {
    if (!items.find(item => item.id === id)) {
      delete updated[id];
    }
  });
  return updated;
}

function getInitialLocalQuantities(items: CartItem[]): Record<string, number> {
  const initial: Record<string, number> = {};
  items.forEach((item) => {
    initial[item.id] = item.quantity;
  });
  return initial;
}

function updateOrderedItems(prevItems: CartItem[], newItems: CartItem[]): CartItem[] {
  const updatedItems = [...prevItems];
  newItems.forEach(newItem => {
    const index = updatedItems.findIndex(item => item.id === newItem.id);
    if (index !== -1) {
      updatedItems[index] = newItem;
    } else {
      updatedItems.push(newItem);
    }
  });
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
