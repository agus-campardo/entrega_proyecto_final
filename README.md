# E-commerce React App - KIROO

Aplicación de comercio electrónico desarrollada con React que implementa carrito de compras, autenticación de usuarios, productos desde MockAPI y diseño responsivo usando Boostrap.

## Características principales

✅ **Gestión de carrito de compras**  
✅ **Autenticación de usuarios**  
✅ **CRUD completo de productos CON MockAPI**  
✅ **Bootstrap**  
✅ **Búsqueda y paginación de productos**  
✅ **Notificaciones**  

## Requerimientos implementados

### 1. Gestión del Carrito y Autenticación
- Context API para estado global del carrito
- Operaciones: agregar, eliminar y vaciar carrito
- AuthContext para manejo de autenticación, usnado Firebase 
- Login simulado con localStorage
- Rutas protegidas para secciones privadas (ej.: iniciar sesión para acceder al carrito)

### 2. Productos con MockAPI
- Formulario para agregar productos
- Validación de campos (nombre, precio, descripción)
- Operaciones PUT y DELETE para edición/eliminación
- Confirmación
- Manejo de estados de carga y error

### 4. Búsqueda y Paginación
- Barra de búsqueda con filtrado en tiempo real
- Paginación del catálogo de productos
- Navegación intuitiva entre páginas


## Herramientas utilizadas

- React 18
- React Router 6
- Context API
- Bootstrap 5
- Styled-components
- React Icons
- React Toastify
- React Helmet
- MockAPI (API simulada)

## Instalación
1. Clonar repositorio: `git clone [url]`
2. Instalar dependencias: `npm install`
3. Iniciar la app: `npm start`

## Estructura de proyecto 
/src
├── auth              # Autentificación con Firebase
├── components/       # Componentes   
├── contexts/         # Contextos de la aplicación
├── styles/           # Estilos globales
├── App.js            # Configuración de rutas
└── index.js          