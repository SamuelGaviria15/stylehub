import { useState } from 'react';
import { useCartContext } from '../../hooks/useCartContext';
import { FiShoppingBag, FiMinus, FiPlus, FiX, FiTrash2, FiCheck } from 'react-icons/fi';
import { formatPriceWithDots } from '../../utils/formatters';
import styles from './Cart.module.scss';
import type { CartItem } from '../../types/product';

export const Cart = () => {
  const { cart, total, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useCartContext();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleCheckout = () => {
    // Simular proceso de compra
    setShowSuccessNotification(true);
    
    // Limpiar carrito después de 2 segundos
    setTimeout(() => {
      clearCart();
      setShowSuccessNotification(false);
      setIsCartOpen(false);
    }, 2500);
  };

  if (!isCartOpen) return null;

  return (
    <div className={styles.cartOverlay} onClick={() => setIsCartOpen(false)}>
      <div className={styles.cart} onClick={e => e.stopPropagation()}>
        <div className={styles.cartHeader}>
          <h2>Carrito de compras</h2>
          <button 
            className={styles.closeBtn}
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            <FiX size={20} />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <FiShoppingBag />
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <ul className={styles.cartList}>
              {cart.map((item: CartItem) => (
                <li key={item.id + item.selectedSize + (item.selectedColor || '')} className={styles.cartItem}>
                  <img src={item.images?.[0] || ''} alt={item.title} className={styles.cartImage} />
                  <div className={styles.cartInfo}>
                    <div className={styles.cartTitle}>{item.title}</div>
                    <div className={styles.cartDetails}>
                      Talla: {item.selectedSize} | Color: {item.selectedColor}
                    </div>
                    <div className={styles.cartPrice}>
                      {formatPriceWithDots(item.price.discount < item.price.full ? item.price.discount : item.price.full)}
                    </div>
                    <div className={styles.cartActions}>
                      <div className={styles.quantityControl}>
                        <button 
                          className={styles.quantityBtn}
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button 
                          className={styles.quantityBtn}
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        aria-label="Eliminar producto"
                        title="Eliminar producto del carrito"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalAmount}>{formatPriceWithDots(total)}</span>
              </div>
              <button className={styles.clearBtn} onClick={clearCart}>
                Vaciar carrito
              </button>
              <button 
                className={styles.checkoutBtn} 
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Finalizar compra
              </button>
            </div>
            
            {/* Notificación de compra exitosa */}
            {showSuccessNotification && (
              <div className={styles.successNotification}>
                <div className={styles.successContent}>
                  <FiCheck size={24} className={styles.successIcon} />
                  <h3>¡Compra realizada con éxito!</h3>
                  <p>Tu pedido se ha procesado correctamente</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
