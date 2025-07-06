import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../../types/product';
import { useCartContext } from '../../hooks/useCartContext';
import { FiShoppingBag, FiHeart, FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import { formatPriceWithDots } from '../../utils/formatters';
import styles from './ProductDetail.module.scss';
 
interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(
    Array.isArray(product.colors) && product.colors.length > 0 ? product.colors[0] : ''
  );
  const { addToCart } = useCartContext();
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Función para obtener las tallas disponibles para el color seleccionado
  const getAvailableSizesForColor = (color: string): string[] => {
    if (product.colorSizes && product.colorSizes[color]) {
      return product.colorSizes[color];
    }
    // Si no hay mapeo de colores-tallas, devolver todas las tallas
    return product.sizes || [];
  };

  // Efecto para resetear la talla seleccionada cuando cambia el color
  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    // Resetear la talla si no está disponible para el nuevo color
    const availableSizes = getAvailableSizesForColor(newColor);
    if (selectedSize && !availableSizes.includes(selectedSize)) {
      setSelectedSize('');
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Using a more elegant notification system would be better in production
      alert('Por favor selecciona una talla');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    });
    // No abrir el detalle del carrito automáticamente
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className={styles.productDetail}>
      <div className={styles.productGallery}>
        {Array.isArray(product.images) && product.images.length > 0 && product.images[0] ? (
          <>
            <motion.button 
              className={`${styles.galleryNav} ${styles.prev}`}
              onClick={prevImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft />
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.div 
                className={styles.mainImage}
                key={currentImage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsImageZoomed(!isImageZoomed)}
              >
                <img src={product.images[currentImage]} alt={product.title} />
              </motion.div>
            </AnimatePresence>
            <motion.button 
              className={`${styles.galleryNav} ${styles.next}`}
              onClick={nextImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight />
            </motion.button>
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`${styles.thumbnail} ${currentImage === index ? styles.active : ''}`}
                  onClick={() => setCurrentImage(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={image} alt={`${product.title} - view ${index + 1}`} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.mainImage} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 220, background: '#f0f0f0', borderRadius: 12, color: '#aaa', fontSize: '1.1rem'}}>
            <span><FiShoppingBag style={{marginRight: 8, fontSize: 22}} /> Imagen no disponible</span>
          </div>
        )}
      </div>

      <div className={styles.productInfo}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.sku}>SKU: {product.sku}</p>
        </motion.div>

        <motion.div 
          className={styles.pricing}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {product.price && typeof product.price.discount === 'number' && typeof product.price.full === 'number' ? (
            product.price.discount < product.price.full ? (
              <>
                <span className={styles.originalPrice}>{formatPriceWithDots(product.price.full)}</span>
                <span className={styles.discountPrice}>{formatPriceWithDots(product.price.discount)}</span>
              </>
            ) : (
              <span className={styles.price}>{formatPriceWithDots(product.price.full)}</span>
            )
          ) : (
            <span className={styles.price}>Precio no disponible</span>
          )}
        </motion.div>

        <motion.div 
          className={styles.options}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.colorOptions}>
            <h3>Color {selectedColor && `(${getAvailableSizesForColor(selectedColor).length} tallas disponibles)`}</h3>
            <div className={styles.colors}>
              {Array.isArray(product.colors) && product.colors.length > 0 ? (
                product.colors.map((color) => {
                  // Si el color es un nombre, mapea a un color visual (ej: blanco, negro, etc.)
                  let visualColor = color;
                  if (!/^#|rgb|hsl/.test(color)) {
                    const colorMap: Record<string, string> = {
                      // Blancos
                      'Blanco': '#fff',
                      'Blanco Hueso': '#f8f8f0',
                      'Blanco Perla': '#f6f6f2',
                      'Marfil': '#fffff0',
                      'Hueso': '#f8f8f0',
                      'Perla': '#f6f6f2',
                      'Sin Color': '#fff',
                      
                      // Negros
                      'Negro': '#222',
                      'Negro Azabache': '#181818',
                      'Negro Mate': '#232323',
                      
                      // Cafés y marrones
                      'Café': '#8b6c4c',
                      'Café Oscuro': '#5d3a1a',
                      'Café Claro': '#bfa074',
                      'Marrón': '#8b6c4c',
                      'Marrón Oscuro': '#4e2e1e',
                      'Marrón Claro': '#bfa074',
                      'Camel': '#c19a6b',
                      
                      // Beiges y tonos tierra
                      'Beige': '#f5f5dc',
                      'Beige Claro': '#f8f5e1',
                      'Beige Oscuro': '#e3d7b6',
                      'Arena': '#e6d3b3',
                      'Taupe': '#b9a281',
                      'Natural': '#e6d3b3',
                      'Piedra': '#e0cda9',
                      'Champaña': '#f7e7ce',
                      
                      // Grises
                      'Gris': '#bdbdbd',
                      'Gris Claro': '#e0e0e0',
                      'Gris Oscuro': '#616161',
                      'Gris Perla': '#d8d8d8',
                      'Gris Plomo': '#757575',
                      'Gris Azulado': '#90a4ae',
                      'Gris Topo': '#b9a281',
                      'Ceniza': '#d3d3d3',
                      'Plata': '#c0c0c0',
                      'Plateado': '#c0c0c0',
                      'Acero': '#a7a7a7',
                      'Plomo': '#757575',
                      'Grafito': '#474a51',
                      'Topo': '#b9a281',
                      
                      // Azules
                      'Azul': '#1976d2',
                      'Azul Oscuro': '#0d47a1',
                      'Azul Claro': '#64b5f6',
                      'Azul Marino': '#001f3f',
                      'Azul Rey': '#0033a0',
                      'Azul Cielo': '#87ceeb',
                      'Azul Turquesa': '#30d5c8',
                      'Azul Pastel': '#b2ebf2',
                      'Azul Petróleo': '#006d77',
                      'Azul Acero': '#4682b4',
                      'Azul Teal': '#008080',
                      'Azul Klein': '#002fa7',
                      'Azul Electrico': '#3f51b5',
                      'Azul Lavanda': '#e6e6fa',
                      'Azul Cobalto': '#0047ab',
                      'Azul Zafiro': '#0f52ba',
                      'Azul Celeste': '#b2ebf2',
                      'Azul Plomo': '#607d8b',
                      'Azul Grafito': '#474a51',
                      'Azul Gris': '#90a4ae',
                      'Azul Verde': '#008080',
                      'Celeste': '#b2ebf2',
                      'Turquesa': '#30d5c8',
                      'Petroleo': '#006d77',
                      'Teal': '#008080',
                      'Klein': '#002fa7',
                      'Electrico': '#3f51b5',
                      'Cobalto': '#0047ab',
                      'Zafiro': '#0f52ba',
                      
                      // Verdes
                      'Verde': '#388e3c',
                      'Verde Oscuro': '#1b5e20',
                      'Verde Claro': '#a5d6a7',
                      'Verde Limon': '#d0ff00',
                      'Verde Militar': '#4b5320',
                      'Verde Oliva': '#808000',
                      'Verde Menta': '#98ff98',
                      'Verde Agua': '#00bfae',
                      'Verde Pastel': '#b2f2bb',
                      'Verde Esmeralda': '#50c878',
                      'Verde Botella': '#006a4e',
                      'Verde Pistacho': '#93c572',
                      'Verde Pasto': '#7bb661',
                      'Verde Lima': '#bfff00',
                      'Verde Jade': '#00a86b',
                      'Verde Musgo': '#8a9a5b',
                      'Verde Azul': '#008080',
                      'Esmeralda': '#50c878',
                      'Botella': '#006a4e',
                      'Pistacho': '#93c572',
                      'Pasto': '#7bb661',
                      'Lima': '#bfff00',
                      'Jade': '#00a86b',
                      'Musgo': '#8a9a5b',
                      
                      // Rojos
                      'Rojo': '#e53935',
                      'Rojo Oscuro': '#b71c1c',
                      'Rojo Vino': '#800020',
                      'Rojo Coral': '#ff4040',
                      'Vino': '#800020',
                      'Vinotinto': '#722f37',
                      'Borgoña': '#800020',
                      'Coral': '#ff7f50',
                      
                      // Rosas y fucsias
                      'Rosa': '#f06292',
                      'Rosa Pastel': '#f8bbd0',
                      'Rosa Claro': '#fce4ec',
                      'Rosa Viejo': '#c08081',
                      'Fucsia': '#e040fb',
                      'Magenta': '#d500f9',
                      'Pastel': '#f8bbd0',
                      
                      // Morados
                      'Morado': '#6a1b9a',
                      'Morado Oscuro': '#4a148c',
                      'Mora': '#5d4e75',
                      'Lila': '#b39ddb',
                      'Lavanda': '#e6e6fa',
                      
                      // Amarillos
                      'Amarillo': '#ffe600',
                      'Amarillo Pastel': '#fff9c4',
                      'Amarillo Mostaza': '#ffdb58',
                      'Mostaza': '#ffdb58',
                      
                      // Naranjas
                      'Naranja': '#ff9800',
                      'Naranja Pastel': '#ffe0b2',
                      'Naranja Quemado': '#ff5722',
                      
                      // Dorados y metálicos
                      'Dorado': '#ffd700',
                      'Oro': '#ffd700',
                      'Cobre': '#b87333',
                      'Bronce': '#cd7f32',
                      'Metalico': '#c0c0c0',
                      'Metalizado': '#c0c0c0',
                      
                      // Terracota y tierra
                      'Terracota': '#e2725b',
                      'Terracotta': '#e2725b',
                      'Ocre': '#cc7722',
                      'Tostado': '#a0522d',
                      'Canela': '#d2691e',
                      'Cuero': '#8b7355',
                      'Cognac': '#a0522d',
                      
                      // Colores específicos de calzado
                      'Cereza': '#de3163',
                      'Burgundy': '#800020',
                      'Granate': '#722f37',
                      'Oxido': '#8b4513',
                      'Herrumbre': '#b7410e',
                      'Tabaco': '#8b5a2b',
                      'Miel': '#f4a460',
                      'Caramelo': '#af6e4d',
                      'Chocolate': '#5d4037',
                      'Espresso': '#3c2415',
                      
                      // Salmón
                      'Salmón': '#fa8072',
                      'Salmon': '#fa8072',
                      
                      // Especiales
                      'Multicolor': 'linear-gradient(90deg, #e53935, #ffe600, #388e3c, #1976d2, #8b6c4c)',
                      'Transparente': 'transparent',
                      'Animal Print': '#a67c52',
                      'Leopardo': '#a67c52',
                      'Estampado': '#bdbdbd',
                      'Print': '#bdbdbd'
                    };
                    visualColor = colorMap[color.trim()] || '#fff';
                  }
                  return (
                    <motion.button
                      key={color}
                      className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                      style={{ backgroundColor: visualColor, border: selectedColor === color ? '2px solid #8b6c4c' : '1px solid #ccc' }}
                      onClick={() => handleColorChange(color)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {selectedColor === color && <span style={{color: visualColor === '#fff' ? '#8b6c4c' : '#fff'}}>✓</span>}
                    </motion.button>
                  );
                })
              ) : (
                <span>No hay colores disponibles</span>
              )}
            </div>
          </div>

          <div className={styles.sizeOptions}>
            <h3>Talla</h3>
            <div className={styles.sizes}>
              {(() => {
                const availableSizes = getAvailableSizesForColor(selectedColor);
                return availableSizes.length > 0 ? (
                  availableSizes.map((size) => (
                    <motion.button
                      key={size}
                      className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ''}`}
                      style={{ border: selectedSize === size ? '2px solid #8b6c4c' : '1px solid #ccc' }}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))
                ) : (
                  <span>No hay tallas disponibles para este color</span>
                );
              })()}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className={styles.addToCart}
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!selectedSize || !selectedColor}
            style={{ opacity: !selectedSize || !selectedColor ? 0.6 : 1 }}
          >
            <FiShoppingBag />
            Agregar al carrito
          </motion.button>
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className={styles.successMsg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <FiCheckCircle style={{color: '#43a047', marginRight: 6}} /> ¡Agregado al carrito!
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            className={styles.wishlist}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiHeart />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};