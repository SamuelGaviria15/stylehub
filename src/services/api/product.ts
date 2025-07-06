import axios from 'axios';
import type { Product, ColorSizes } from '../../types/product';
import { mapApiProductToProduct } from './productAdapter';

const API_BASE_URL = 'https://api-frontend-production.up.railway.app/api';

// Función para enriquecer productos con datos de ejemplo de tallas por color
function enrichProductWithColorSizes(product: Product): Product {
  // Si el producto ya tiene colorSizes, no modificar
  if (product.colorSizes && Object.keys(product.colorSizes).length > 0) {
    return product;
  }

  // Datos de ejemplo basados en los colores que mencionaste
  const exampleColorSizes: ColorSizes = {};
  const allSizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44'];
  
  product.colors.forEach(color => {
    const colorLower = color.toLowerCase();
    
    switch (colorLower) {
      case 'verde limon':
      case 'verde limón':
        exampleColorSizes[color] = ['36', '37', '38', '39', '40'];
        break;
      case 'Vinotinto':
        exampleColorSizes[color] = ['37', '38', '39', '40', '41', '42'];
        break;
      case 'negro':
        exampleColorSizes[color] = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44'];
        break;
      case 'crema':
        exampleColorSizes[color] = ['36', '37', '38', '39', '40', '41'];
        break;
      case 'miel':
        exampleColorSizes[color] = ['37', '38', '39', '40', '41'];
        break;
      case 'mora':
        exampleColorSizes[color] = ['36', '37', '38', '39', '40', '41'];
        break;
      case 'multicolor':
        exampleColorSizes[color] = ['38', '39', '40', '41'];
        break;
      case 'blanco':
        exampleColorSizes[color] = ['35', '36', '37', '38', '39', '40', '41', '42'];
        break;
      default: {
        // Para otros colores, usar tallas aleatorias
        const startSize = Math.floor(Math.random() * 4) + 35; // Entre 35 y 38
        const endSize = startSize + Math.floor(Math.random() * 5) + 3; // 3 a 7 tallas
        exampleColorSizes[color] = allSizes.slice(startSize - 35, endSize - 35);
        break;
      }
    }
  });

  return {
    ...product,
    colorSizes: exampleColorSizes
  };
}

export const productApi = {
  async getProduct(id: string): Promise<Product> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      const product = mapApiProductToProduct(response.data);
      return enrichProductWithColorSizes(product);
    } catch {
      throw new Error('Error fetching product details');
    }
  },

  async getRelatedProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products?ft=tenis`);
      // Devuelve todos los productos (no solo 4) para mostrar variedad de tallas y colores
      return response.data.map((item: unknown) => 
        enrichProductWithColorSizes(mapApiProductToProduct(item))
      );
    } catch {
      throw new Error('Error fetching related products');
    }
  }
};