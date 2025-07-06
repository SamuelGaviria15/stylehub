import { useState, useEffect } from 'react';
import type { CartItem } from '../types/product';

interface UseCartReturn {
  cart: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, size?: string) => void;
  updateQuantity: (itemId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const total = cart.reduce((sum, item) => {
    // Usa el precio con descuento si existe, si no el full
    const price = (item.price && item.price.discount < item.price.full)
      ? item.price.discount
      : item.price.full;
    return sum + price * item.quantity;
  }, 0);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => 
          cartItem.id === item.id && 
          cartItem.selectedSize === item.selectedSize &&
          cartItem.selectedColor === item.selectedColor
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && 
          cartItem.selectedSize === item.selectedSize &&
          cartItem.selectedColor === item.selectedColor
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
    
    // Open cart when adding items
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string, size?: string) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === itemId && (!size || item.selectedSize === size))
      )
    );
  };

  const updateQuantity = (itemId: string, quantity: number, size?: string) => {
    if (quantity < 1) {
      removeFromCart(itemId, size);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId && (!size || item.selectedSize === size)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return {
    cart,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  };
};