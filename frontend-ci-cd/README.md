# 📱 Agenda Personal - Frontend

Aplicación web moderna para la gestión de contactos personales, construida con React y diseñada para ofrecer una experiencia de usuario excepcional.

## 🚀 Características

- **Gestión Completa de Contactos**: Crear, editar, eliminar y organizar contactos
- **Sistema de Categorías**: Organizar contactos por categorías personalizables
- **Contactos Favoritos**: Marcar y gestionar contactos importantes
- **Búsqueda Avanzada**: Buscar contactos por múltiples criterios
- **Estadísticas Visuales**: Dashboard con métricas de contactos
- **Diseño Responsivo**: Funciona perfectamente en todos los dispositivos
- **Interfaz Moderna**: UI/UX intuitiva y atractiva
- **PWA Ready**: Instalable como aplicación de escritorio

## 🛠️ Tecnologías Utilizadas

- **React 18.2.0** - Biblioteca de interfaz de usuario
- **React Router 6.8.0** - Enrutamiento de la aplicación
- **Axios 1.6.0** - Cliente HTTP para API
- **CSS3** - Estilos modernos y responsivos
- **Context API** - Gestión de estado global
- **Hooks Personalizados** - Lógica reutilizable

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ContactCard.js   # Tarjeta de contacto individual
│   ├── ContactForm.js   # Formulario de contacto
│   ├── ContactList.js   # Lista de contactos
│   ├── Navbar.js        # Barra de navegación
│   ├── SearchBar.js     # Barra de búsqueda
│   ├── CategoryFilter.js # Filtro por categorías
│   ├── Pagination.js    # Componente de paginación
│   ├── LoadingSpinner.js # Indicador de carga
│   └── ErrorMessage.js  # Mensajes de error
├── pages/               # Páginas de la aplicación
│   ├── Home.js          # Página principal
│   ├── Contacts.js      # Lista de contactos
│   ├── AddContact.js    # Agregar contacto
│   ├── EditContact.js   # Editar contacto
│   ├── Favorites.js     # Contactos favoritos
│   ├── Categories.js    # Gestión de categorías
│   └── Statistics.js    # Estadísticas
├── context/             # Contexto global
│   └── ContactContext.js # Estado y lógica de contactos
├── services/            # Servicios de API
│   └── api.js           # Configuración y métodos de API
├── hooks/               # Hooks personalizados
│   ├── useContacts.js   # Hook para contexto de contactos
│   └── useLocalStorage.js # Hook para almacenamiento local
├── utils/               # Utilidades
│   ├── validators.js    # Validaciones de formularios
│   ├── formatters.js    # Formateo de datos
│   └── constants.js     # Constantes de la aplicación
└── styles/              # Estilos CSS
    ├── App.css          # Estilos principales
    ├── Contact.css      # Estilos de contactos
    ├── Form.css         # Estilos de formularios
    ├── Navbar.css       # Estilos de navegación
    └── Responsive.css   # Estilos responsivos
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 16.0.0 o superior
- npm 8.0.0 o superior

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd frontend-ci-cd
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. **Iniciar aplicación en desarrollo**
   ```bash
   npm start
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `REACT_APP_API_URL` | URL base de la API backend | `http://localhost:8080/api` |

### Configuración de la API

La aplicación se conecta automáticamente al backend en `http://localhost:8080/api`. Asegúrate de que el backend esté ejecutándose antes de iniciar el frontend.

## 📱 Uso de la Aplicación

### Navegación Principal

- **🏠 Inicio**: Dashboard con resumen de contactos
- **👥 Contactos**: Lista completa de contactos con filtros
- **➕ Nuevo**: Formulario para agregar contactos
- **⭐ Favoritos**: Contactos marcados como favoritos
- **🏷️ Categorías**: Gestión de categorías de contactos
- **📊 Estadísticas**: Métricas y análisis de contactos

### Gestión de Contactos

1. **Crear Contacto**
   - Navegar a "Nuevo Contacto"
   - Completar formulario con información requerida
   - Asignar categoría opcional
   - Marcar como favorito si es necesario

2. **Editar Contacto**
   - Hacer clic en el botón de editar en cualquier contacto
   - Modificar información según sea necesario
   - Guardar cambios

3. **Eliminar Contacto**
   - Hacer clic en el botón de eliminar
   - Confirmar la acción

4. **Marcar como Favorito**
   - Hacer clic en la estrella del contacto
   - El contacto aparecerá en la página de favoritos

### Gestión de Categorías

1. **Crear Categoría**
   - Navegar a "Categorías"
   - Completar formulario con nombre y color
   - Agregar descripción opcional

2. **Editar Categoría**
   - Hacer clic en el botón de editar
   - Modificar propiedades según sea necesario

3. **Eliminar Categoría**
   - Hacer clic en el botón de eliminar
   - Confirmar la acción

### Búsqueda y Filtros

- **Búsqueda por Término**: Buscar en nombre, apellido, teléfono o email
- **Filtro por Categoría**: Mostrar solo contactos de una categoría específica
- **Filtro de Favoritos**: Mostrar solo contactos marcados como favoritos

## 🎨 Personalización

### Temas y Colores

La aplicación utiliza un sistema de colores consistente basado en la paleta de Material Design:

- **Primario**: #3498db (Azul)
- **Secundario**: #95a5a6 (Gris)
- **Éxito**: #2ecc71 (Verde)
- **Advertencia**: #f39c12 (Naranja)
- **Error**: #e74c3c (Rojo)

### Estilos CSS

Los estilos están organizados en módulos CSS separados para facilitar la personalización:

- `App.css`: Estilos globales y principales
- `Contact.css`: Estilos específicos de contactos
- `Form.css`: Estilos de formularios y componentes
- `Navbar.css`: Estilos de navegación
- `Responsive.css`: Estilos responsivos

## 📱 Responsividad

La aplicación está completamente optimizada para todos los dispositivos:

- **Desktop**: Layout de 3-4 columnas
- **Tablet**: Layout de 2 columnas
- **Mobile**: Layout de 1 columna con navegación optimizada

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests unitarios
npm test

# Tests con coverage
npm test -- --coverage

# Tests en modo watch
npm test -- --watch
```

### Estructura de Tests

- Tests unitarios para componentes
- Tests de integración para páginas
- Tests de utilidades y hooks

## 🚀 Despliegue

### Construcción para Producción

```bash
npm run build
```

### Servidor de Producción

```bash
# Instalar servidor estático
npm install -g serve

# Servir aplicación construida
serve -s build -l 3000
```

### Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Seguridad

- Validación de entrada en todos los formularios
- Sanitización de datos antes de enviar a la API
- Manejo seguro de errores sin exponer información sensible
- CORS configurado correctamente

## 📊 Rendimiento

- Lazy loading de componentes
- Optimización de imágenes
- Compresión de assets
- Cache estratégico
- Bundle splitting automático

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisar la documentación
2. Buscar en issues existentes
3. Crear un nuevo issue con detalles del problema

## 🙏 Agradecimientos

- React Team por el framework
- Comunidad de desarrolladores
- Contribuidores del proyecto

---

**¡Disfruta gestionando tus contactos con Agenda Personal! 🎉**
