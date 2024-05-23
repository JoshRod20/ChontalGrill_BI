USE chontal_grill2024;
DROP DATABASE chontal_grill2024;

SELECT * FROM orden;
SELECT * FROM detalle_orden;
SELECT * FROM categoria;
SELECT * FROM cliente;
SELECT * FROM empleado;
SELECT * FROM menu;
SELECT * FROM tipo_orden;
SELECT * FROM metodo_de_pago;
DELETE FROM metodo_de_pago
WHERE `Descripcion`;


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

-- Insertar datos en la tabla Categoria
INSERT INTO categoria (NombreC) VALUES 
('Entradas'),
('Platos Fuertes'),
('Asados'),
('Sopas'),
('Surtidos'),
('Hamburguesas'),
('Mariscos'),
('Menú ejecutivo'),
('Postres'),
('Bebidas'),
('Cervezas y Licores (Nacionales y extranjeros)');

-- Insertar datos en la tabla Cliente
INSERT INTO cliente (Cedula, Nombres, Apellidos, Telefono, Correo, Contraseña) VALUES 
('1262012031000J', 'Josh', 'Rodriguez', '88599564', 'rodriguezjosh2003@gmail.com', '1234'),
('1230512970000E', 'Eliam', 'Rodriguez', '57559390', 'elimarod@gmail.com', '1234');

INSERT INTO menu ( ID_Categoria, Nombre, Descripcion, Precio)
VALUES ( 2, 'Fajitas de pollo empanizadas', 'Con salsa rosada', 280),
(1, 'Salchipapas', 'Salchipapas con queso Chedar', 200),
(6, 'Hamburguesas', 'Hamburguesa de pollo a la plancha', 200); 
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
('Transferencia Bancaria'),
('Pago móvil'),
('Cheque');

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (2, 2, 3, 'COMPLETADA', '2024-03-15', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 4, 200) ;

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 4, 3, 'EN PROCESO', '2024-03-17', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 1, 230);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 3, 4, 'COMPLETADA', '2024-03-18', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 20, 250);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (2, 1, 3, 'COMPLETADA', '2024-03-22', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 50, 250);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 2, 4, 'EN PROCESO', '2024-04-02', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 150, 250);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (2, 4, 5, 'COMPLETADA', '2024-04-04', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 25, 210);








-- Editar
INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (2, 4, 5, 'COMPLETADA', '2024-04-08', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 25, 210);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (5, 7, 2, 'EN PROGRESO', '2024-04-13', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 15, 150);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (3, 6, 3, 'PENDIENTE', '2024-04-26', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (4, @ID_Orden, 30, 180);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 2, 1, 'COMPLETADA', '2024-05-07', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 20, 200);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (4, 8, 4, 'EN PROGRESO', '2024-05-08', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (5, @ID_Orden, 10, 100);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (6, 3, 5, 'COMPLETADA', '2024-05-11', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 8, 168);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (7, 1, 2, 'PENDIENTE', '2024-05-15', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 12, 120);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (8, 5, 3, 'EN PROGRESO', '2024-05-21', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (4, @ID_Orden, 22, 132);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (9, 2, 1, 'COMPLETADA', '2024-05-23', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 18, 180);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (10, 7, 4, 'PENDIENTE', '2024-05-25', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (5, @ID_Orden, 35, 350);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (11, 6, 5, 'EN PROGRESO', '2024-05-27', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 28, 235.2);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (12, 4, 2, 'COMPLETADA', '2024-05-29', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 14, 140);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (13, 3, 3, 'PENDIENTE', '2024-06-01', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (4, @ID_Orden, 19, 114);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (14, 8, 1, 'EN PROGRESO', '2024-06-05', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 17, 170);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (15, 1, 4, 'COMPLETADA', '2024-06-08', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (5, @ID_Orden, 11, 110);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (16, 5, 5, 'PENDIENTE', '2024-06-11', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 23, 193.8);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (17, 2, 2, 'EN PROGRESO', '2024-06-16', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 16, 160);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (18, 7, 3, 'COMPLETADA', '2024-06-21', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (4, @ID_Orden, 21, 126);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (19, 6, 1, 'PENDIENTE', '2024-06-22', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 13, 130);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (20, 3, 4, 'EN PROGRESO', '2024-06-23', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (5, @ID_Orden, 27, 270);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (21, 1, 5, 'COMPLETADA', '2024-06-24', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 32, 268.8);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (22, 4, 2, 'PENDIENTE', '2024-06-25', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 29, 290);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (23, 8, 3, 'EN PROGRESO', '2024-06-26', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (4, @ID_Orden, 14, 84);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (24, 3, 1, 'COMPLETADA', '2024-06-27', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 18, 180);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (25, 7, 4, 'PENDIENTE', '2024-06-28', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (5, @ID_Orden, 23, 220);
