USE chontal_grill2024;


SELECT * FROM orden;
SELECT * FROM categoria;
SELECT * FROM cliente;
SELECT * FROM reservacion;
SELECT * FROM tipo_orden;
SELECT * FROM metodo_de_pago;
DELETE FROM categoria
WHERE `ID_Categoria`;


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
('Transferencia Bancaria'),
('Pago móvil'),
('Cheque');

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (2, 2, 3, 'COMPLETADA', '2024-05-15', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 4, 200) ;

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 4, 3, 'EN PROCESO', '2024-05-17', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 1, 230);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 3, 4, 'COMPLETADA', '2024-05-18', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 20, 250);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (2, 1, 3, 'COMPLETADA', '2024-05-22', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 50, 250);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 2, 4, 'EN PROCESO', '2024-06-02', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 150, 250);