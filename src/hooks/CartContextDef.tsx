import { createContext } from 'react';
import type { CartItem } from '../types/product';

interface CartContextType {
  cart: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, size?: string) => void;
  updateQuantity: (itemId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
