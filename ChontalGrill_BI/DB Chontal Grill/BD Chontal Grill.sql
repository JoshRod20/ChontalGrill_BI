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


INSERT INTO metodo_de_pago (Descripcion) VALUES
('Efectivo'),
('Tarjeta de crédito'),
('Tarjeta de débito'),
('Transferencia bancaria'),
('Pago móvil'),
('Cheque');


ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '88599564';
FLUSH PRIVILEGES;

SELECT * FROM orden;
SELECT * FROM categoria;
SELECT * FROM cliente;
SELECT * FROM reservacion;
SELECT * FROM tipo_orden;
SELECT * FROM metodo_de_pago;
DELETE FROM categoria
WHERE `ID_Categoria`;

-- Insertar datos en la tabla Categoria
INSERT INTO categoria (NombreC) VALUES 
('Entradas'),
('Platos Principales'),
('Postres'),
('Bebidas');

-- Insertar datos en la tabla Cliente
INSERT INTO cliente (Cedula, Nombres, Apellidos, Telefono, Correo, Contraseña) VALUES 
('1262012031000J', 'Josh', 'Rodriguez', '88599564', 'rodriguezjosh2003@gmail.com', '1234'),
('1230512970000E', 'Eliam', 'Rodriguez', '57559390', 'elimarod@gmail.com', '1234');

INSERT INTO menu ( ID_Categoria, Nombre, Descripcion, Precio)
VALUES ( 4, 'Fajitas de pollo', 'Con salsa barbacoa', 150),
(2, 'Desayuno', 'Gallopinto con queso y tajadas de maduro', 100),
(3, 'Comida a la carta', 'Pollo en salsa de hongos', 230); 
SELECT * FROM menu;

-- Insertar datos en la tabla Reservacion
INSERT INTO reservacion (ID_Cliente, Descripcion, Fecha_Reservacion, Fecha_Inicio, Fecha_Fin) VALUES 
(1, 'Reserva para dos personas', '2024-05-10', '19:00:00', '21:00:00'),
(2, 'Reserva para cumpleaños', '2024-05-15', '20:00:00', '23:00:00');

-- Insertar datos en la tabla Tipo Orden
INSERT INTO tipo_orden (Tipo, Descripcion, Nota_Especial, Numero_Mesa, Direccion) VALUES 
('Local', 'Orden para consumo en el restaurante', 'Retiro', 3, NULL),
('Domicilio', 'Orden para entrega a domicilio', 'Entregar en la puerta trasera', NULL, 'Calle Principal, #123');

-- Insertar datos en la tabla Metodo de Pago
INSERT INTO metodo_de_pago (Descripcion) VALUES 
('Efectivo'),
('Tarjeta de Crédito'),
('Transferencia Bancaria');


INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (2, 2, 2, 'COMPLETADA', '2024-05-15', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 4, 200) ;

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 4, 1, 'EN PROCESO', '2024-05-17', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 1, 230);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 3, 1, 'COMPLETADA', '2024-05-18', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 20, 250);