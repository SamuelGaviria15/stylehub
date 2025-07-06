import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types/product';
import { CartContext } from './CartContextDef';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const total = cart.reduce((sum, item) => {
    const price = (item.price && item.price.discount < item.price.full)
      ? item.price.discount : item.price.full;
    return sum + price * item.quantity;
  }, 0);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize && cartItem.selectedColor === item.selectedColor
      );
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && cartItem.selectedSize === item.selectedSize && cartItem.selectedColor === item.selectedColor
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string, size?: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === itemId && item.selectedSize === size)));
  };

  const updateQuantity = (itemId: string, quantity: number, size?: string) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === itemId && item.selectedSize === size
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}
