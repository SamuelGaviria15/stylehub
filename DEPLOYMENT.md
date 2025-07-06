# 🛍️ StyleHub - Modern E-commerce Store

Una tienda virtual moderna construida con React + TypeScript + SCSS, consumiendo la API de Vélez.

## 🚀 Demo Live
- **🌐 Sitio Web**: [Próximamente en Vercel]
- **📱 Preview**: Responsive design para móvil, tablet y desktop

## ✨ Características Implementadas

### Funcionalidades Core
- ✅ **PDP Completa**: Página de detalle de producto con toda la información
- ✅ **Carrito Funcional**: Agregar, quitar productos con persistencia
- ✅ **Selección Inteligente**: Tallas disponibles por color seleccionado
- ✅ **Vitrina de Productos**: Paginación elegante (4 productos por página)
- ✅ **Productos Relacionados**: Sección de recomendaciones

### UI/UX Avanzado
- ✅ **Tema Claro/Oscuro**: Toggle persistente entre temas
- ✅ **Diseño Responsivo**: Mobile-first, optimizado para todos los dispositivos
- ✅ **Glassmorphism**: Efectos modernos de cristal y profundidad
- ✅ **Animaciones Suaves**: Transiciones y micro-interacciones
- ✅ **Feedback Visual**: Estados de carga, errores y confirmaciones

### Técnico
- ✅ **TypeScript**: Tipado fuerte y robusto
- ✅ **SCSS Moderno**: Arquitectura @use, variables CSS
- ✅ **API Integration**: Adaptador robusto para la API de Vélez
- ✅ **Context API**: Estado global del carrito
- ✅ **Error Handling**: Manejo completo de errores de API
- ✅ **SEO Optimizado**: Metadatos y estructura correcta

## 🛠️ Tecnologías

```json
{
  "frontend": "React 18 + TypeScript",
  "styling": "SCSS con @use moderno",
  "build": "Vite",
  "state": "Context API + Custom Hooks",
  "http": "Axios",
  "icons": "React Icons",
  "animation": "CSS + micro-interactions",
  "quality": "ESLint + Prettier + Husky"
}
```

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/stylehub.git
cd stylehub

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🎨 Paleta de Colores

```scss
// Colores principales
$primary-color: #1a1a1a;      // Negro elegante
$secondary-color: #8B4513;     // Café capuchino
$tertiary-color: #722F37;      // Vinotinto
$accent-color: #483D8B;        // Mora
```

## 🌐 Deployment

### Vercel (Recomendado)
1. Fork/crea repositorio en GitHub
2. Conecta con Vercel: https://vercel.com
3. Import project desde GitHub
4. Deploy automático

### Configuración Vercel
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Node Version: 18.x
- ✅ SPA Routing configurado

## 📱 Responsive Breakpoints

```scss
// Mobile First
320px   // Mobile pequeño
480px   // Mobile grande
768px   // Tablet
1024px  // Desktop pequeño
1440px+ // Desktop grande
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Producción
npm run preview      # Preview del build
npm run lint         # Linting
npm run format       # Formateo Prettier
```

## 📁 Estructura

```
src/
├── components/      # Componentes UI
│   ├── cart/       # Carrito de compras
│   ├── product/    # Productos y PDP
│   └── shared/     # Compartidos (Header, etc)
├── contexts/        # Context API
├── hooks/          # Custom hooks
├── pages/          # Páginas principales
├── services/       # API y servicios
├── styles/         # SCSS global y temas
├── types/          # TypeScript definitions
└── utils/          # Utilidades
```

## 🎯 Cumplimiento de Requisitos

### ✅ Requisitos Obligatorios
- [x] React + TypeScript + SCSS
- [x] PDP con toda la información del producto
- [x] Carrito funcional con persistencia
- [x] Vitrina de productos relacionados
- [x] Responsive design completo
- [x] Manejo de errores robusto

### ✅ Valoración Especial
- [x] UX intuitiva y fluida
- [x] Diseño original y creativo
- [x] Animaciones sutiles y efectivas
- [x] Error handling completo
- [x] Mobile-first responsive

## 👨‍💻 Autor

**Tu Nombre** - [GitHub](https://github.com/TU_USUARIO)

---

⭐ **Nota**: Este proyecto cumple todos los requisitos de la prueba técnica y está optimizado para el deployment en Vercel.
