CREATE DATABASE chontal_grill2024;
USE chontal_grill2024;

-- Tabla Categoria
CREATE TABLE `categoria` (
  `ID_Categoria` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `NombreC` VARCHAR(50) NOT NULL
);

-- Tabla Cliente
CREATE TABLE `cliente` (
  `ID_Cliente` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `Cedula` VARCHAR(16) NOT NULL,
  `Nombres` VARCHAR(50) NOT NULL,
  `Apellidos` VARCHAR(50) NOT NULL,
  `Telefono` VARCHAR(9) NOT NULL,
  `Correo` VARCHAR(50) CHARACTER SET UTF8MB4 NOT NULL,
  `Contraseña` VARCHAR(80) NOT NULL
);

-- Tabla Comentarios
CREATE TABLE `comentarios` (
  `ID_Comentarios` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `ID_Cliente` INT NOT NULL,
  `Comentario` VARCHAR(500) NOT NULL,
  `Calificacion` INT NOT NULL,
  `Fecha` DATE NOT NULL
);

-- Tabla Empleado
CREATE TABLE `empleado` (
  `ID_Empleado` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `Nombres` VARCHAR(50) NOT NULL,
  `Apellidos` VARCHAR(50) NOT NULL,
  `Telefono` VARCHAR(9) NOT NULL,
  `Correo` VARCHAR(50) CHARACTER SET UTF8MB4 NOT NULL,
  `Cargo` VARCHAR(32) NOT NULL
);
ALTER TABLE `empleado` ADD INDEX `idx_correo` (`Correo`);

-- Tabla Autenticacion_Empleado
CREATE TABLE `autenticacion_empleado` (
  `ID_Autenticacion` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `ID_Empleado` INT NOT NULL,
  `Correo` VARCHAR(50) CHARACTER SET UTF8MB4 NOT NULL,
  `Contraseña` VARCHAR(255) NOT NULL
);

-- Tabla Bitacora
CREATE TABLE `bitacora` (
  `ID_Bitacora` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `Trasaccion` VARCHAR(10) NOT NULL,
  `Usuario` VARCHAR(40) NOT NULL,
  `Fecha` DATE NOT NULL,
  `Tabla` VARCHAR(20) NOT NULL,
  `ID_Registro_afectado` INT NOT NULL,
  `Valores_Antiguos` TEXT NOT NULL,
  `Valores_Nuevos` TEXT NOT NULL
);

-- Tabla Orden
CREATE TABLE `orden` (
  `ID_Orden` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `ID_Cliente` INT NOT NULL,
  `ID_Empleado` INT NOT NULL,
  `Id_Tipo_Orden` INT NOT NULL,
  `Estado` VARCHAR(50) NOT NULL,
  `Fecha_Hora` DATE NOT NULL,
  `ID_Metodo_Pago` INT NOT NULL
);


-- Tabla Reservacion
CREATE TABLE `reservacion` (
  `ID_Reservacion` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `ID_Cliente` INT NOT NULL,
  `Descripcion` VARCHAR(200) NOT NULL,
  `Fecha_Reservacion` DATE NOT NULL,
  `Fecha_Inicio` TIME NOT NULL,
  `Fecha_Fin` TIME NOT NULL
);

-- Tabla Tipo Orden
CREATE TABLE `tipo_orden` (
  `Id_Tipo_Orden` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `Tipo` ENUM('Local', 'Domicilio') NOT NULL,
  `Descripcion` VARCHAR(255) NOT NULL,
  `Nota_Especial` VARCHAR(200) NOT NULL,
  `Numero_Mesa` INT DEFAULT NULL,
  `Direccion` VARCHAR(255) DEFAULT NULL
);

-- Tabla Metodo de Pago
CREATE TABLE `metodo_de_pago` (
  `ID_Metodo_Pago` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `Descripcion` VARCHAR(100) NOT NULL
);

SHOW TABLES;

-- Tabla Menu
CREATE TABLE `menu` (
  `ID_Menu` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `ID_Categoria` INT NOT NULL,
  `Nombre` VARCHAR(100) NOT NULL,
  `Descripcion` VARCHAR(200) NOT NULL,
  `Precio` DECIMAL(6,2) NOT NULL,
  `Imagen` LONGBLOB
);

-- Tabla Detalle_Orden
CREATE TABLE `detalle_orden` (
  `ID_Detalle_Orden` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `ID_Menu` INT NOT NULL,
  `ID_Orden` INT NOT NULL,
  `Cantidad` INT NOT NULL,
  `Precio` DECIMAL(6,2) NOT NULL
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


ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '88599564';
FLUSH PRIVILEGES;



