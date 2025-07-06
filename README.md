**//contexto**

**Prueba Técnica: Analista Frontend**

Queremos una PDP con un diseño único, moderno y creativo. Sabemos que la página de producto es clave para que las personas decidan comprar, por eso buscamos una propuesta visual atractiva, fácil de usar y que haga que la experiencia se sienta especial desde el primer momento.

**1. Tecnologías Requeridas**

Para la realización de esta prueba, deberás utilizar las siguientes tecnologías:

- **TypeScript**
- **React**
- **CSS** o **Sass/SCSS**.

//objetivos y lineamientos que seguira la logica a implementar

**2. Objetivo del Proyecto**

Deberás crear una **Página de Detalle de Producto (Ver referencias adjuntadas al final del documento)** consumiendo la siguiente API pública:

- **API Endpoint del producto:** https://api-frontend-production.up.railway.app/api/products/125829257
- **Api Endpoint para la vitrina: <https://api-frontend-production.up.railway.app/api/products?ft=tenis>**

//Rquisitos que se deben tener en cuenta

**3. Requisitos de la Página de Producto**

La página de producto debe mostrar la siguiente información (basada en los datos obtenidos de la API):

- **Imágenes del Producto:** Mostrar todas las imágenes
- **Título del Producto**
- **Marca (Brand)**
- **Referencia del Producto:** SKU o código de referencia del producto.
- **Tallas Disponibles:** Mostrarlas de forma seleccionable
- **Color**
- **Precio Full**
- **Precio con Descuento**
- **Botón "Agregar al Carrito":** Un botón funcional para añadir el producto al carrito de compras.
- **Vitrina de Productos Relacionados/Recomendados:** Mostrar una pequeña sección con otros productos obtenidos de la misma API (pueden ser los primeros N productos del listado general).

**4. Funcionalidad del Carrito de Compras**

Al hacer clic en el botón "Agregar al Carrito":

- El producto seleccionado (con la talla y color elegidos, si aplica) debe agregarse a un carrito de compras.
- Se debe **visualizar el estado actual del carrito**. Esto puede ser un pequeño resumen (ícono de carrito con número de ítems, un dropdown, o una sección en la página) que muestre:
  - Producto(s) agregado(s) (Imagen, nombre, precio, cantidad).
  - **Valor Total** de la compra.
  - Borrar producto de carrito.
  - Un botón de **"Finalizar Compra"** (este botón no necesita implementar la lógica de checkout real, solo ser un elemento visual).
- **Persistencia de Datos:** El contenido del carrito de compras debe persistir aunque el usuario recargue la página. Para esto, puedes utilizar localStorage.

//es obligatorio tener en cuenta esto ya que es una prueba tecnica para un empleo

**5. Se valorará especialmente:**

- **Usabilidad (UX):** Interfaz intuitiva y fácil de usar. Flujo de interacción claro para el usuario.
- **Diseño y Creatividad (UI):** Aspecto visual agradable y profesional. 
- **Originalidad en la interfaz**: no hacer copy paste del sitio actual.
- **Animaciones y Transiciones:** Uso sutil y efectivo de animaciones o transiciones para mejorar la experiencia del usuario (ej. al agregar al carrito, al cambiar imágenes, etc.).
- **Manejo de Errores:** Consideración de posibles errores (ej. si la API no responde, si un producto no tiene cierta información).
- **Responsive Design:** La página debe ser adaptable a diferentes tamaños de pantalla (móvil, tablet, desktop).
- Las imágenes adjuntadas son solo de referencia, no se está pidiendo hacer replicas exactas de estos diseños.

**6. Entregables**

- Un enlace a un repositorio de Git (GitHub, GitLab, Bitbucket) con el código fuente del proyecto.
- Un enlace a la aplicación desplegada (ej. en Vercel, Netlify, GitHub Pages).
