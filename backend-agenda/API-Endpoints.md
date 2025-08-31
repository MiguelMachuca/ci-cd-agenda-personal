# 🚀 API Endpoints - Agenda de Contactos

Documentación completa de todos los endpoints disponibles en la API REST de Agenda de Contactos.

## 📍 **Base URL**
```
http://localhost:8080/api
```

## 🔗 **Endpoints de Contactos**

### **Base Path:** `/api/contactos`

| Método | Endpoint | Descripción | Parámetros | Body | Respuesta |
|--------|----------|-------------|------------|------|-----------|
| **GET** | `/api/contactos` | Obtener todos los contactos paginados | `pagina` (default: 0)<br>`tamaño` (default: 10) | - | `Page<ContactoResponse>` |
| **GET** | `/api/contactos/{id}` | Obtener contacto por ID | `id` (Long) | - | `ContactoResponse` |
| **POST** | `/api/contactos` | Crear nuevo contacto | - | `ContactoRequest` | `ContactoResponse` |
| **PUT** | `/api/contactos/{id}` | Actualizar contacto existente | `id` (Long) | `ContactoRequest` | `ContactoResponse` |
| **DELETE** | `/api/contactos/{id}` | Eliminar contacto | `id` (Long) | - | `204 No Content` |
| **GET** | `/api/contactos/buscar` | Buscar contactos por término | `termino` (String) | - | `List<ContactoResponse>` |
| **GET** | `/api/contactos/categoria/{categoria}` | Obtener contactos por categoría | `categoria` (String) | - | `List<ContactoResponse>` |
| **GET** | `/api/contactos/favoritos` | Obtener contactos favoritos | - | - | `List<ContactoResponse>` |
| **PATCH** | `/api/contactos/{id}/favorito` | Cambiar estado de favorito | `id` (Long) | `{"favorito": boolean}` | `ContactoResponse` |

---

## 🏷️ **Endpoints de Categorías**

### **Base Path:** `/api/categorias`

| Método | Endpoint | Descripción | Parámetros | Body | Respuesta |
|--------|----------|-------------|------------|------|-----------|
| **GET** | `/api/categorias` | Obtener todas las categorías | - | - | `List<Categoria>` |
| **GET** | `/api/categorias/{id}` | Obtener categoría por ID | `id` (Long) | - | `Categoria` |
| **GET** | `/api/categorias/nombre/{nombre}` | Obtener categoría por nombre | `nombre` (String) | - | `Categoria` |
| **POST** | `/api/categorias` | Crear nueva categoría | - | `Categoria` | `Categoria` |
| **PUT** | `/api/categorias/{id}` | Actualizar categoría existente | `id` (Long) | `Categoria` | `Categoria` |
| **DELETE** | `/api/categorias/{id}` | Eliminar categoría | `id` (Long) | - | `204 No Content` |
| **GET** | `/api/categorias/buscar` | Buscar categorías por término | `termino` (String) | - | `List<Categoria>` |
| **GET** | `/api/categorias/existe/{nombre}` | Verificar si existe categoría | `nombre` (String) | - | `Boolean` |

---

## 📋 **Modelos de Datos**

### **ContactoRequest** (POST/PUT Contactos)
```json
{
  "nombre": "string (requerido, 2-50 chars)",
  "apellido": "string (opcional, max 50 chars)",
  "telefono": "string (requerido, 7-15 chars)",
  "email": "string (opcional, formato email válido)",
  "direccion": "string (opcional, max 200 chars)",
  "fechaNacimiento": "date (opcional, formato YYYY-MM-DD)",
  "notas": "string (opcional, max 500 chars)",
  "favorito": "boolean (opcional, default false)",
  "categoriaId": "long (opcional, ID de categoría)"
}
```

### **ContactoResponse** (Respuesta de Contactos)
```json
{
  "id": "long",
  "nombre": "string",
  "apellido": "string",
  "telefono": "string",
  "email": "string",
  "direccion": "string",
  "fechaNacimiento": "date",
  "notas": "string",
  "favorito": "boolean",
  "categoria": "string (nombre de la categoría)",
  "fechaCreacion": "datetime",
  "fechaActualizacion": "datetime"
}
```

### **Categoria** (POST/PUT Categorías)
```json
{
  "nombre": "string (requerido, 2-50 chars, único)",
  "color": "string (opcional, formato hex #XXXXXX)",
  "descripcion": "string (opcional, max 200 chars)"
}
```

---

## 🔍 **Ejemplos de Uso**

### **1. Crear un Contacto**
```bash
curl -X POST http://localhost:8080/api/contactos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "apellido": "García",
    "telefono": "555-1234",
    "email": "juan.garcia@email.com",
    "categoriaId": 1
  }'
```

### **2. Obtener Contactos Paginados**
```bash
curl "http://localhost:8080/api/contactos?pagina=0&tamaño=5"
```

### **3. Buscar Contactos**
```bash
curl "http://localhost:8080/api/contactos/buscar?termino=juan"
```

### **4. Crear una Categoría**
```bash
curl -X POST http://localhost:8080/api/categorias \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Trabajo",
    "color": "#4ECDC4",
    "descripcion": "Contactos del trabajo"
  }'
```

### **5. Marcar como Favorito**
```bash
curl -X PATCH http://localhost:8080/api/contactos/1/favorito \
  -H "Content-Type: application/json" \
  -d '{"favorito": true}'
```

---

## 📊 **Códigos de Respuesta HTTP**

| Código | Descripción | Uso |
|--------|-------------|-----|
| **200** | OK | Respuesta exitosa |
| **201** | Created | Recurso creado exitosamente |
| **204** | No Content | Recurso eliminado exitosamente |
| **400** | Bad Request | Datos de entrada inválidos |
| **404** | Not Found | Recurso no encontrado |
| **500** | Internal Server Error | Error interno del servidor |

---

## 🔧 **Parámetros de Consulta**

### **Paginación**
- **`pagina`**: Número de página (base 0)
- **`tamaño`**: Tamaño de la página (máximo recomendado: 100)

### **Búsqueda**
- **`termino`**: Texto para buscar en nombre, apellido, teléfono o email

---

## 🌐 **CORS y Seguridad**

- **CORS**: Habilitado para todos los orígenes (`*`)
- **Validación**: Todos los endpoints POST/PUT validan datos de entrada
- **Seguridad**: Usuario no-root en Docker, configuración básica de Spring Security

---

## 📱 **Endpoints Adicionales**

### **H2 Console** (Solo desarrollo)
```
http://localhost:8080/h2-console
```

### **Health Check** (Automático)
```
http://localhost:8080/actuator/health
```

---

## 🚀 **Pruebas con Postman/Insomnia**

### **Colección de Pruebas**
1. **GET** `/api/contactos` - Listar contactos
2. **POST** `/api/categorias` - Crear categoría
3. **POST** `/api/contactos` - Crear contacto
4. **GET** `/api/contactos/{id}` - Obtener contacto
5. **PUT** `/api/contactos/{id}` - Actualizar contacto
6. **PATCH** `/api/contactos/{id}/favorito` - Marcar favorito
7. **DELETE** `/api/contactos/{id}` - Eliminar contacto

---

## 📝 **Notas Importantes**

- **Validación**: Todos los campos tienen validaciones automáticas
- **Relaciones**: Los contactos pueden estar asociados a categorías
- **Favoritos**: Los contactos pueden marcarse como favoritos
- **Auditoría**: Se registran fechas de creación y actualización
- **Búsqueda**: Búsqueda flexible por múltiples campos
- **Paginación**: Soporte completo para listas grandes

---

**¡Tu API está lista para ser consumida por cualquier frontend o aplicación! 🎉**
