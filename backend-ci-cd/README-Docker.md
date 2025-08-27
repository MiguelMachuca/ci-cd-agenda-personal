# 🐳 Agenda de Contactos - Docker

Este documento contiene las instrucciones para ejecutar la aplicación **Agenda de Contactos** usando Docker.

## 📋 Prerrequisitos

- **Docker** instalado y ejecutándose
- **Docker Compose** instalado
- **Java 11** (solo para desarrollo local)

### Verificar instalación:
```bash
docker --version
docker-compose --version
```

## 🚀 Inicio Rápido

### 1. Construir e iniciar la aplicación
```bash
# Dar permisos de ejecución al script (solo la primera vez)
chmod +x docker-build.sh

# Construir e iniciar todo
./docker-build.sh build
./docker-build.sh start
```

### 2. Verificar que esté funcionando
```bash
# Ver logs
./docker-build.sh logs

# Verificar estado
docker-compose ps
```

### 3. Acceder a la aplicación
- **API REST**: http://localhost:8080/api/contactos
- **H2 Console**: http://localhost:8080/h2-console
- **Base de datos**: H2 en memoria

## 🛠️ Comandos Disponibles

El script `docker-build.sh` proporciona los siguientes comandos:

| Comando | Descripción |
|---------|-------------|
| `build` | Construir la imagen Docker |
| `start` | Iniciar con docker-compose |
| `stop` | Detener con docker-compose |
| `restart` | Reiniciar la aplicación |
| `logs` | Mostrar logs en tiempo real |
| `clean` | Limpiar contenedores e imágenes |
| `help` | Mostrar ayuda |

### Ejemplos de uso:
```bash
# Construir imagen
./docker-build.sh build

# Iniciar aplicación
./docker-build.sh start

# Ver logs
./docker-build.sh logs

# Detener aplicación
./docker-build.sh stop

# Limpiar todo
./docker-build.sh clean
```

## 🔧 Configuración Manual

### Construir imagen manualmente:
```bash
docker build -t agenda-contactos:latest .
```

### Ejecutar contenedor manualmente:
```bash
docker run -p 8080:8080 agenda-contactos:latest
```

### Usar docker-compose manualmente:
```bash
# Iniciar
docker-compose up -d

# Detener
docker-compose down

# Ver logs
docker-compose logs -f agenda-app

# Reconstruir
docker-compose up --build -d
```

## 📁 Estructura de Archivos Docker

```
├── Dockerfile                 # Configuración de la imagen Docker
├── docker-compose.yml         # Orquestación de servicios
├── .dockerignore             # Archivos a excluir del build
├── docker-build.sh           # Script de automatización
├── src/main/resources/
│   └── application-docker.properties  # Configuración para Docker
└── README-Docker.md          # Este archivo
```

## ⚙️ Configuración de Docker

### Dockerfile
- **Multi-stage build** para optimizar tamaño
- **OpenJDK 11** como base
- **Usuario no-root** para seguridad
- **Optimizaciones** de memoria y rendimiento

### Docker Compose
- **Puerto**: 8080
- **Volúmenes**: logs persistentes
- **Health checks**: monitoreo automático
- **Red**: red dedicada para la aplicación

### Variables de Entorno
```bash
SPRING_PROFILES_ACTIVE=docker
JAVA_OPTS=-Xmx512m -Xms256m
```

## 🗄️ Base de Datos

### H2 en Memoria (por defecto)
- **URL**: `jdbc:h2:mem:testdb`
- **Usuario**: `sa`
- **Contraseña**: `password`
- **Console**: http://localhost:8080/h2-console

### Datos de Inicialización
La aplicación incluye datos de ejemplo:
- 5 categorías predefinidas
- 5 contactos de ejemplo
- Configuración automática de secuencias

## 📊 Monitoreo y Logs

### Health Check
```bash
# Verificar estado del contenedor
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f agenda-app

# Ver logs de un servicio específico
docker-compose logs agenda-app
```

### Métricas de la Aplicación
- **Puerto**: 8080
- **Endpoints de salud**: automáticos
- **Logs**: configurados para Docker

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Puerto 8080 ocupado
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8081:8080"  # Usar puerto 8081 en host
```

#### 2. Error de permisos
```bash
# Dar permisos al script
chmod +x docker-build.sh
```

#### 3. Contenedor no inicia
```bash
# Ver logs de error
docker-compose logs agenda-app

# Reconstruir imagen
./docker-build.sh clean
./docker-build.sh build
./docker-build.sh start
```

#### 4. Problemas de memoria
```bash
# Ajustar memoria en docker-compose.yml
environment:
  - JAVA_OPTS=-Xmx1g -Xms512m
```

### Comandos de Diagnóstico
```bash
# Ver estado de contenedores
docker ps -a

# Ver uso de recursos
docker stats

# Ver información de la imagen
docker inspect agenda-contactos:latest

# Ver logs del sistema Docker
docker system df
```

## 🚀 Despliegue en Producción

### Consideraciones de Producción
1. **Base de datos externa** (PostgreSQL, MySQL)
2. **Variables de entorno** para configuración
3. **Secrets management** para credenciales
4. **Logging centralizado**
5. **Monitoreo y alertas**

### Ejemplo con PostgreSQL
```yaml
# En docker-compose.yml, descomenta:
postgres:
  image: postgres:13-alpine
  environment:
    POSTGRES_DB: agenda
    POSTGRES_USER: agenda_user
    POSTGRES_PASSWORD: agenda_pass
```

## 📚 Recursos Adicionales

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Spring Boot Docker Guide](https://spring.io/guides/gs/spring-boot-docker/)
- [H2 Database Console](http://www.h2database.com/html/quickstart.html)

## 🤝 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**¡Disfruta usando Agenda de Contactos con Docker! 🎉**
