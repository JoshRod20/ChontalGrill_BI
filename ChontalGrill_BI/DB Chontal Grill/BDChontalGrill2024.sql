CREATE DATABASE chontal_grill2024;
USE chontal_grill2024;

-- Tabla Categoria
CREATE TABLE `categoria` (
  `ID_Categoria` INT AUTO_INCREMENT PRIMARY KEY,
  `Nombre` VARCHAR(50)
);

-- Tabla Cliente
CREATE TABLE `cliente` (
  `ID_Cliente` INT AUTO_INCREMENT PRIMARY KEY,
  `Cedula` VARCHAR(16),
  `Nombres` VARCHAR(50),
  `Apellidos` VARCHAR(50),
  `Telefono` VARCHAR(9),
  `Correo` VARCHAR(50) CHARACTER SET UTF8MB4,
  `Contraseña` VARCHAR(80)
);

-- Tabla Comentarios
CREATE TABLE `comentarios` (
  `ID_Comentarios` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Cliente` INT,
  `Comentario` VARCHAR(500),
  `Calificacion` INT,
  `Fecha` DATETIME
);

-- Tabla Empleado
CREATE TABLE `empleado` (
  `ID_Empleado` INT AUTO_INCREMENT PRIMARY KEY,
  `Nombres` VARCHAR(50),
  `Apellidos` VARCHAR(50),
  `Telefono` VARCHAR(9),
  `Correo` VARCHAR(50) CHARACTER SET UTF8MB4,
  `Cargo` VARCHAR(32)
);
ALTER TABLE `empleado` ADD INDEX `idx_correo` (`Correo`);

-- Tabla Autenticacion_Empleado
CREATE TABLE `autenticacion_empleado` (
  `ID_Autenticacion` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Empleado` INT,
  `Correo` VARCHAR(50) CHARACTER SET UTF8MB4,
  `Contraseña` VARCHAR(255)
);

-- Tabla Bitacora
CREATE TABLE `bitacora` (
  `ID_Bitacora` INT AUTO_INCREMENT PRIMARY KEY,
  `Trasaccion` VARCHAR(10) NOT NULL,
  `Usuario` VARCHAR(40) NOT NULL,
  `Fecha` DATETIME NOT NULL,
  `Tabla` VARCHAR(20) NOT NULL,
  `ID_Registro_afectado` INT,
  `Valores_Antiguos` TEXT,
  `Valores_Nuevos` TEXT
);

-- Tabla Orden
CREATE TABLE `orden` (
  `ID_Orden` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Cliente` INT,
  `ID_Empleado` INT,
  `Id_Tipo_Orden` INT,
  `Monto` DECIMAL(6,2),
  `Estado` VARCHAR(50),
  `Fecha_Hora` DATETIME,
  `ID_Metodo_Pago` INT
);

-- Tabla Reservacion
CREATE TABLE `reservacion` (
  `ID_Reservacion` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Cliente` INT,
  `Descripcion` VARCHAR(200),
  `Fecha_Reservacion` DATE,
  `Fecha_Inicio` TIME,
  `Fecha_Fin` TIME
);

-- Tabla Tipo Orden
CREATE TABLE `tipo_orden` (
  `Id_Tipo_Orden` INT AUTO_INCREMENT PRIMARY KEY,
  `Tipo` ENUM('Local', 'Domicilio'),
  `Descripcion` VARCHAR(255),
  `Nota_Especial` VARCHAR(200),
  `Numero_Mesa` INT DEFAULT NULL,
  `Direccion` VARCHAR(255) DEFAULT NULL
);

-- Tabla Metodo de Pago
CREATE TABLE `metodo_de_pago` (
  `ID_Metodo_Pago` INT AUTO_INCREMENT PRIMARY KEY,
  `Descripcion` VARCHAR(100)
);

SHOW TABLES;

SELECT * FROM metodo_de_pago;

DROP procedure VisualizarMetodosPago;



-- Tabla Menu
CREATE TABLE `menu` (
  `ID_Menu` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Categoria` INT,
  `Nombre` VARCHAR(100),
  `Descripcion` VARCHAR(200),
  `Precio` DECIMAL(6,2),
  `Imagen` LONGBLOB
);

-- Tabla Detalle_Orden
CREATE TABLE `detalle_orden` (
  `ID_Detalle_Orden` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Menu` INT,
  `ID_Orden` INT,
  `Cantidad` INT
);

-- Relaciones entre las tablas
ALTER TABLE `comentarios` 
ADD CONSTRAINT `FK_Comentarios_Cliente` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`);

ALTER TABLE `menu` 
ADD CONSTRAINT `FK_Menu_Categoria` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`);

ALTER TABLE `detalle_orden` 
ADD CONSTRAINT `FK_DetalleOrden_Menu` FOREIGN KEY (`ID_Menu`) REFERENCES `menu` (`ID_Menu`);

ALTER TABLE `detalle_orden` 
ADD CONSTRAINT `FK_DetalleOrden_Orden` FOREIGN KEY (`ID_Orden`) REFERENCES `orden` (`ID_Orden`);

ALTER TABLE `orden` 
ADD CONSTRAINT `FK_Orden_Empleado` FOREIGN KEY (`ID_Empleado`) REFERENCES `empleado` (`ID_Empleado`);

ALTER TABLE `reservacion` 
ADD CONSTRAINT `FK_Reservacion_Cliente` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`);

ALTER TABLE `orden` 
ADD CONSTRAINT `FK_Orden_Cliente` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`);

ALTER TABLE `orden` 
ADD CONSTRAINT `FK_Orden_TipoOrden` FOREIGN KEY (`Id_Tipo_Orden`) REFERENCES `tipo_orden` (`Id_Tipo_Orden`);

ALTER TABLE `autenticacion_empleado` 
ADD CONSTRAINT `FK_Autenticacion_Empleado_ID_Empleado` FOREIGN KEY (`ID_Empleado`) REFERENCES `empleado` (`ID_Empleado`);

ALTER TABLE `autenticacion_empleado` 
ADD CONSTRAINT `FK_Autenticacion_Empleado_Correo` FOREIGN KEY (`Correo`) REFERENCES `empleado` (`Correo`);

ALTER TABLE `orden` 
ADD CONSTRAINT `FK_Orden_MetodoPago` FOREIGN KEY (`ID_Metodo_Pago`) REFERENCES `metodo_de_pago` (`ID_Metodo_Pago`);


INSERT INTO Empleado (Nombres, Apellidos, Telefono, Correo, Cargo) VALUES
('Carlos', 'Martinez', '8956-4545', 'carlos.admin@chontalgrill.com', 'Administrador'),
('Ana', 'Lopez', '7845-4963', 'ana.cajero@chontalgrill.com', 'Cajero'),
('Juan', 'Perez', '7825-9612', 'juan.mesero@chontalgrill.com', 'Mesero'),
('Maria', 'Gonzalez', '7829-4512', 'maria.jefedecocina@chontalgrill.com', 'Jefe de cocina');

-- Obtener los IDs de los empleados recién creados
SET @admin_id = (SELECT ID_Empleado FROM Empleado WHERE Correo = 'carlos.admin@chontalgrill.com');
SET @cajero_id = (SELECT ID_Empleado FROM Empleado WHERE Correo = 'ana.cajero@chontalgrill.com');
SET @mesero_id = (SELECT ID_Empleado FROM Empleado WHERE Correo = 'juan.mesero@chontalgrill.com');
SET @jefe_id = (SELECT ID_Empleado FROM Empleado WHERE Correo = 'maria.jefedecocina@chontalgrill.com');

-- Agregar información de autenticación para estos empleados en la tabla Autenticacion_Empleado
-- (Asegúrate de reemplazar 'contraseña123' con contraseñas reales y considera el uso de hashing para almacenar las contraseñas de manera segura)
INSERT INTO Autenticacion_Empleado (ID_Empleado, Correo, Contraseña) VALUES
(@admin_id, 'carlos.admin@chontalgrill.com', '1234'),
(@cajero_id, 'ana.cajero@chontalgrill.com', '1234'),
(@mesero_id, 'juan.mesero@chontalgrill.com', '1234'),
(@jefe_id, 'maria.jefedecocina@chontalgrill.com', '1234');

DROP TABLE metodo_de_pago;

INSERT INTO metodo_de_pago (Descripcion) VALUES
('Efectivo'),
('Tarjeta de crédito'),
('Tarjeta de débito'),
('Transferencia bancaria'),
('Pago móvil'),
('Cheque');


ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '88599564';
FLUSH PRIVILEGES;
