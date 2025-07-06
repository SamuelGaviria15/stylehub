import type { Product } from '../../types/product';
import { FiShoppingBag } from 'react-icons/fi';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const hasDiscount = product.price.discount < product.price.full;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price.full - product.price.discount) / product.price.full) * 100)
    : 0;

  return (
    <div className={styles.card} onClick={onClick} tabIndex={0} role="button">
      {hasDiscount && (
        <div className={styles.badge}>
          -{discountPercentage}%
        </div>
      )}
      
      <div className={styles.imageWrapper}>
        <img 
          src={product.images[0] || ''} 
          alt={product.title} 
          className={styles.image}
          loading="lazy"
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.brand}>{product.brand}</div>
        <h3 className={styles.title}>{product.title}</h3>
        
        <div className={styles.priceContainer}>
          {hasDiscount ? (
            <>
              <span className={styles.originalPrice}>${product.price.full}</span>
              <span className={styles.currentPrice}>${product.price.discount}</span>
            </>
          ) : (
            <span className={styles.regularPrice}>${product.price.full}</span>
          )}
        </div>
        
        <button 
          className={styles.addToCartBtn}
          onClick={(e) => {
            e.stopPropagation();
            // Aquí iría la lógica de agregar al carrito si se quiere
            onClick();
          }}
          aria-label={`Ver detalles de ${product.title}`}
        >
          <FiShoppingBag size={16} />
          Ver Producto
        </button>
      </div>
    </div>
  );
};
