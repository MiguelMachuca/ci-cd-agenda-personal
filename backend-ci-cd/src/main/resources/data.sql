-- Datos de inicialización para la base de datos H2

-- Insertar categorías de ejemplo
INSERT INTO categorias (id, nombre, color, descripcion) VALUES 
(1, 'Familia', '#FF6B6B', 'Contactos de familiares cercanos'),
(2, 'Trabajo', '#4ECDC4', 'Compañeros de trabajo y jefes'),
(3, 'Amigos', '#45B7D1', 'Amigos personales'),
(4, 'Médicos', '#96CEB4', 'Profesionales de la salud'),
(5, 'Servicios', '#FFEAA7', 'Servicios varios y emergencias');

-- Insertar contactos de ejemplo
INSERT INTO contactos (id, nombre, apellido, telefono, email, direccion, fecha_nacimiento, notas, favorito, categoria_id, fecha_creacion, fecha_actualizacion) VALUES 
(1, 'Juan', 'Pérez', '555-0101', 'juan.perez@email.com', 'Calle Principal 123', '1985-03-15', 'Hermano mayor', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'María', 'García', '555-0102', 'maria.garcia@trabajo.com', 'Oficina Central 456', '1990-07-22', 'Jefa de proyecto', false, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Carlos', 'López', '555-0103', 'carlos.lopez@email.com', 'Avenida Norte 789', '1988-11-08', 'Amigo de la universidad', true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Dr. Ana', 'Martínez', '555-0104', 'ana.martinez@clinica.com', 'Centro Médico 321', '1975-05-12', 'Cardióloga', false, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Bomberos', '', '911', '', 'Estación Central', NULL, 'Emergencias', false, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Resetear las secuencias de ID para que los próximos registros tengan IDs correctos
ALTER TABLE categorias ALTER COLUMN id RESTART WITH 6;
ALTER TABLE contactos ALTER COLUMN id RESTART WITH 6;
