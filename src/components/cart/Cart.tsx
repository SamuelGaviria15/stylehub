import { useCartContext } from '../../hooks/useCartContext';
import { FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import styles from './Cart.module.scss';
import type { CartItem } from '../../types/product';

export const Cart = () => {
  const { cart, total, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useCartContext();

  if (!isCartOpen) return null;

  return (
    <div className={styles.cartOverlay} onClick={() => setIsCartOpen(false)}>
      <div className={styles.cart} onClick={e => e.stopPropagation()}>
        <div className={styles.cartHeader}>
          <h2>Carrito de compras</h2>
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
                      ${item.price.discount < item.price.full ? item.price.discount : item.price.full}
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
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalAmount}>${total}</span>
              </div>
              <button className={styles.clearBtn} onClick={clearCart}>
                Vaciar carrito
              </button>
              <button className={styles.checkoutBtn} disabled>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
