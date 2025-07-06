// Adaptador para mapear la respuesta de la API Vélez al modelo Product de la UI
import type { Product, ColorSizes } from '../../types/product';

interface ApiImage { imageUrl: string }
interface ApiSeller { commertialOffer?: { ListPrice?: number; Price?: number }, AvailableQuantity?: number }
interface ApiItem {
  images?: ApiImage[];
  Talla?: string[];
  Color?: string[];
  sellers?: ApiSeller[];
}
interface ApiProduct {
  productId?: string | number;
  id?: string | number;
  productName?: string;
  productTitle?: string;
  brand?: string;
  productReference?: string;
  description?: string;
  items?: ApiItem[];
}

export function mapApiProductToProduct(apiProductRaw: unknown): Product {
  const apiProduct = apiProductRaw as ApiProduct;
  const allSizes = new Set<string>();
  const allColors = new Set<string>();
  const colorSizes: ColorSizes = {};
  let images: string[] = [];
  let priceFull = 0;
  let priceDiscount = 0;
  let stock = 0;

  if (Array.isArray(apiProduct.items) && apiProduct.items.length > 0) {
    // Tomar imágenes del primer item
    images = apiProduct.items[0].images?.map((img) => img.imageUrl) || [];
    
    // Mapear tallas por color desde los items
    apiProduct.items.forEach((item) => {
      const itemColors = item.Color || [];
      const itemSizes = item.Talla || [];
      
      // Unificar tallas y colores
      itemSizes.forEach((t) => allSizes.add(t));
      itemColors.forEach((c) => allColors.add(c));
      
      // Mapear cada color con sus tallas disponibles
      itemColors.forEach((color) => {
        if (!colorSizes[color]) {
          colorSizes[color] = [];
        }
        itemSizes.forEach((size) => {
          if (!colorSizes[color].includes(size)) {
            colorSizes[color].push(size);
          }
        });
      });
    });
    
    // Tomar precio y stock del primer seller del primer item
    const offer = apiProduct.items[0].sellers?.[0]?.commertialOffer;
    priceFull = offer?.ListPrice || offer?.Price || 0;
    priceDiscount = offer?.Price || 0;
    stock = apiProduct.items[0].sellers?.[0]?.AvailableQuantity || 0;
  }

  return {
    id: String(apiProduct.productId || apiProduct.id || ''),
    key: String(apiProduct.productId || apiProduct.id || ''),
    title: apiProduct.productName || apiProduct.productTitle || '',
    brand: apiProduct.brand || 'Sin marca',
    sku: apiProduct.productReference || '',
    sizes: Array.from(allSizes),
    sizeDetails: Array.from(allSizes).map((s) => ({ value: s, available: true })),
    colorSizes, // Nuevo: mapeo de colores a tallas
    color: Array.from(allColors)[0] || 'Sin color',
    colors: Array.from(allColors),
    price: {
      full: Number(priceFull),
      discount: Number(priceDiscount),
    },
    images,
    description: apiProduct.description || '',
    stock,
  };
}
