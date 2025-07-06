import { FiShoppingCart } from 'react-icons/fi';
import { useCartContext } from '../../hooks/useCartContext';
import { ThemeToggle } from './ThemeToggle';
import type { CartItem } from '../../types/product';
import styles from './Header.module.scss';

export const Header = () => {
  const { cart, setIsCartOpen } = useCartContext();
  const itemCount = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <span className={styles.logo}>StyleHub</span>
        <div className={styles.actions}>
          <ThemeToggle />
          <button
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
            aria-label="Ver carrito"
          >
            <FiShoppingCart size={24} />
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};
