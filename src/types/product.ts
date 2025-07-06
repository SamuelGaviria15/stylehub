// Definición de tipos para el producto
export interface Product {
  id: string;
  key?: string; // para React lists
  title: string;
  brand: string;
  sku: string;
  sizes: string[]; // para mapear fácilmente en el UI
  sizeDetails?: Size[]; // si quieres mantener detalles de disponibilidad
  colorSizes?: ColorSizes; // Nuevo: tallas disponibles por color
  color: string;
  colors: string[]; // array de colores disponibles
  price: {
    full: number;
    discount: number;
  };
  images: string[];
  description?: string;
  stock?: number;
}

export interface Size {
  value: string;
  available: boolean;
}

// Nuevo: mapeo de colores a tallas disponibles
export interface ColorSizes {
  [color: string]: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor?: string;
  image?: string;
}