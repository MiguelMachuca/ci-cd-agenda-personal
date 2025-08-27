#!/bin/bash

# Script para build y ejecución de Docker para Agenda de Contactos
# Autor: Agenda de Contactos
# Versión: 1.0.0

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Agenda de Contactos - Docker${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [OPCIÓN]"
    echo ""
    echo "Opciones:"
    echo "  build     Construir la imagen Docker"
    echo "  run       Ejecutar el contenedor"
    echo "  start     Iniciar con docker-compose"
    echo "  stop      Detener con docker-compose"
    echo "  restart   Reiniciar con docker-compose"
    echo "  logs      Mostrar logs del contenedor"
    echo "  clean     Limpiar contenedores e imágenes"
    echo "  help      Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  $0 build    # Construir imagen"
    echo "  $0 start    # Iniciar aplicación"
    echo "  $0 logs     # Ver logs"
}

# Función para construir la imagen
build_image() {
    print_message "Construyendo imagen Docker..."
    
    # Verificar que Docker esté ejecutándose
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker no está ejecutándose. Inicia Docker Desktop primero."
        exit 1
    fi
    
    # Construir la imagen
    docker build -t agenda-contactos:latest .
    
    if [ $? -eq 0 ]; then
        print_message "Imagen construida exitosamente: agenda-contactos:latest"
    else
        print_error "Error al construir la imagen"
        exit 1
    fi
}

# Función para ejecutar con docker-compose
start_app() {
    print_message "Iniciando aplicación con docker-compose..."
    
    # Verificar que docker-compose esté disponible
    if ! command -v docker-compose &> /dev/null; then
        print_error "docker-compose no está instalado"
        exit 1
    fi
    
    # Iniciar servicios
    docker-compose up -d
    
    print_message "Aplicación iniciada. Accede a:"
    echo "  - API: http://localhost:8080/api/contactos"
    echo "  - H2 Console: http://localhost:8080/h2-console"
    echo "  - Logs: $0 logs"
}

# Función para detener con docker-compose
stop_app() {
    print_message "Deteniendo aplicación..."
    docker-compose down
    print_message "Aplicación detenida"
}

# Función para reiniciar
restart_app() {
    print_message "Reiniciando aplicación..."
    docker-compose restart
    print_message "Aplicación reiniciada"
}

# Función para mostrar logs
show_logs() {
    print_message "Mostrando logs del contenedor..."
    docker-compose logs -f agenda-app
}

# Función para limpiar
clean_docker() {
    print_warning "¿Estás seguro de que quieres limpiar todo? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_message "Limpiando contenedores, imágenes y volúmenes..."
        docker-compose down -v --rmi all
        docker system prune -f
        print_message "Limpieza completada"
    else
        print_message "Limpieza cancelada"
    fi
}

# Función principal
main() {
    print_header
    
    case "${1:-help}" in
        build)
            build_image
            ;;
        run)
            print_message "Ejecutando contenedor directamente..."
            docker run -p 8080:8080 agenda-contactos:latest
            ;;
        start)
            start_app
            ;;
        stop)
            stop_app
            ;;
        restart)
            restart_app
            ;;
        logs)
            show_logs
            ;;
        clean)
            clean_docker
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Opción desconocida: $1"
            show_help
            exit 1
            ;;
    esac
}

# Ejecutar función principal
main "$@"
