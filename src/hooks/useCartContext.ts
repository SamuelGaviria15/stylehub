import { useContext } from 'react';
import { CartContext } from './CartContextDef';

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext debe usarse dentro de CartProvider');
  return ctx;
}
