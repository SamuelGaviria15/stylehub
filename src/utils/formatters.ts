// Utility functions for formatting
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceWithDots = (price: number): string => {
  return `$${price.toLocaleString('es-CO')}`;
};
