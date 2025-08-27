# 🐳 Docker Setup - Agenda de Contactos

Este proyecto incluye una configuración completa de Docker para ejecutar tanto el backend (Spring Boot) como el frontend (React) en contenedores.

## 📁 Estructura de Archivos

```
Proyecto Final/
├── backend-ci-cd/
│   ├── Dockerfile
│   └── .dockerignore
├── frontend-ci-cd/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .dockerignore
├── nginx/
│   ├── nginx.conf
│   └── ssl/
├── docker-compose.yml
└── DOCKER_README.md
```

## 🚀 Comandos de Docker

### **Desarrollo (sin nginx proxy)**

```bash
# Construir y ejecutar solo backend y frontend
docker-compose up --build backend frontend

# Ejecutar en segundo plano
docker-compose up -d --build backend frontend

# Ver logs
docker-compose logs -f backend frontend
```

### **Desarrollo Completo (con H2 database)**

```bash
# Construir y ejecutar todos los servicios de desarrollo
docker-compose --profile development up --build

# Ejecutar en segundo plano
docker-compose --profile development up -d --build
```

### **Producción (con nginx proxy)**

```bash
# Construir y ejecutar todos los servicios incluyendo nginx
docker-compose --profile production up --build

# Ejecutar en segundo plano
docker-compose --profile production up -d --build
```

### **Comandos Útiles**

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir imágenes
docker-compose build --no-cache

# Ver estado de los servicios
docker-compose ps

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🌐 Puertos y URLs

### **Desarrollo**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Console**: http://localhost:9092
- **H2 Console (backend)**: http://localhost:8080/h2-console

### **Producción (con nginx)**
- **Aplicación**: http://localhost
- **API**: http://localhost/api
- **H2 Console**: http://localhost/h2-console

## 🔧 Configuración

### **Variables de Entorno**

Copia `.env.example` a `.env` y ajusta las variables según tu entorno:

```bash
cp .env.example .env
```

### **Configuración del Backend**

El backend se ejecuta con las siguientes configuraciones:
- **Base de datos**: H2 en archivo persistente
- **Puerto**: 8080
- **Perfil**: docker
- **DDL**: create-drop (recrea las tablas al iniciar)

### **Configuración del Frontend**

El frontend se ejecuta con:
- **Servidor**: Nginx
- **Puerto**: 3000 (mapeado a 80 interno)
- **API URL**: http://localhost:8080/api

## 🛠️ Troubleshooting

### **Problemas Comunes**

1. **Puerto ya en uso**
   ```bash
   # Cambiar puertos en docker-compose.yml
   ports:
     - "8081:8080"  # Cambiar 8080 por 8081
   ```

2. **Error de permisos**
   ```bash
   # Dar permisos al directorio de datos
   sudo chown -R $USER:$USER ./data
   ```

3. **Contenedor no inicia**
   ```bash
   # Ver logs detallados
   docker-compose logs backend
   docker-compose logs frontend
   ```

4. **Problemas de red**
   ```bash
   # Recrear red de Docker
   docker-compose down
   docker network prune
   docker-compose up --build
   ```

### **Health Checks**

Los servicios incluyen health checks automáticos:
- **Backend**: Verifica endpoint `/api/contactos`
- **Frontend**: Verifica respuesta HTTP en puerto 80

## 📊 Monitoreo

### **Ver recursos de contenedores**
```bash
docker stats
```

### **Ver logs en tiempo real**
```bash
docker-compose logs -f
```

### **Acceder a contenedores**
```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh
```

## 🔒 Seguridad

### **Configuraciones de Seguridad**

- **Usuario no-root**: Los contenedores se ejecutan con usuarios no privilegiados
- **Headers de seguridad**: Nginx incluye headers de seguridad
- **CORS**: Configurado para permitir comunicación entre frontend y backend
- **SSL**: Configuración preparada para HTTPS (requiere certificados)

### **Para habilitar SSL**

1. Coloca certificados en `nginx/ssl/`
2. Descomenta configuración SSL en `nginx/nginx.conf`
3. Ejecuta con perfil de producción

## 🚀 Despliegue

### **Para Producción**

1. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con valores de producción
   ```

2. **Construir y ejecutar**
   ```bash
   docker-compose --profile production up -d --build
   ```

3. **Verificar servicios**
   ```bash
   docker-compose ps
   curl http://localhost/api/contactos
   ```

### **Para Desarrollo**

1. **Ejecutar servicios de desarrollo**
   ```bash
   docker-compose --profile development up --build
   ```

2. **Acceder a H2 Console**
   - URL: http://localhost:9092
   - JDBC URL: `jdbc:h2:file:./data/agenda`
   - Usuario: `sa`
   - Contraseña: `password`

## 📝 Notas Importantes

- **Datos persistentes**: Los datos se guardan en volúmenes de Docker
- **Logs**: Los logs se pueden ver con `docker-compose logs`
- **Reinicio automático**: Los servicios se reinician automáticamente
- **Red**: Todos los servicios están en la red `agenda-network`

## 🔄 Actualizaciones

Para actualizar la aplicación:

```bash
# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose build --no-cache

# Reiniciar servicios
docker-compose up -d
```
