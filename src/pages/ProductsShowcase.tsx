import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/api/product';
import { ProductCard } from '../components/product/ProductCard';
import { ProductDetail } from '../components/product/ProductDetail';
import type { Product } from '../types/product';
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './ProductsShowcase.module.scss';

const PAGE_SIZE = 4;

export const ProductsShowcase = () => {
  const { data: originalProducts, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['relatedProducts'],
    queryFn: productApi.getRelatedProducts,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    // Hacer scroll suave al inicio de la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleBackToShowcase = () => {
    setSelectedProduct(null);
    // Hacer scroll suave al inicio cuando se regresa a la vitrina
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePreviousPage = () => {
    setPage(p => Math.max(1, p - 1));
    // Scroll suave al inicio cuando se cambia de página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNextPage = () => {
    setPage(p => Math.min(totalPages, p + 1));
    // Scroll suave al inicio cuando se cambia de página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) return <div style={{textAlign: 'center'}}>Cargando productos...</div>;
  if (error) return <div style={{textAlign: 'center'}}>Error cargando productos relacionados.</div>;
  if (!originalProducts || originalProducts.length === 0) return <div style={{textAlign: 'center'}}>No hay productos para mostrar.</div>;

  const allProducts = originalProducts;
  
  // Imprime en consola lo que se obtiene de la API
  console.log('Productos de la API:', originalProducts);

  // Paginación - productos originales divididos en páginas de 4
  const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);
  const paginated = allProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className={styles.showcase}>
      <h2 className={styles.title}>Colección StyleHub</h2>
      {selectedProduct ? (
        <div>
          <button
            className={styles.backButton}
            onClick={handleBackToShowcase}
          >
            <FiArrowLeft size={20} /> Volver a la colección
          </button>
          <ProductDetail product={selectedProduct} />
          {/* Productos relacionados/recomendados */}
          <div className={styles.relatedSection}>
            <h3 className={styles.relatedTitle}>Te puede interesar</h3>
            <div className={styles.relatedGrid}>
              {allProducts
                .filter((p: Product) => p.id !== selectedProduct.id)
                .slice(0, 4)
                .map((product: Product) => (
                  <ProductCard key={product.id} product={product} onClick={() => handleProductSelect(product)} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.productsGrid}>
            {paginated.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => handleProductSelect(product)} />
            ))}
          </div>
          <div className={styles.pagination}>
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={styles.paginationButton}
            >
              <FiChevronLeft size={16} />
              Anterior
            </button>
            <span className={styles.pageInfo}>
              Página {page} de {totalPages} 
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={styles.paginationButton}
            >
              Siguiente
              <FiChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};
