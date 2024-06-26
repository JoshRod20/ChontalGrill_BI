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
('1230512970000E', 'Eliam', 'Rodriguez', '57559390', 'elimarod@gmail.com', '1234'),
('0010102021003M', 'Alejandro Antonio', 'Avilez Baldelomar', '84327156', 'aleantionio656@gmail.com', '2345'),
('0012105001002K', 'Estiven Isauc', 'Rocha Molina', '85649237', 'stivnica@gmail.com', '3456'),
('1211605031004W', 'Nohemi Sarahi', 'Gaitan Flores', '81234568', 'gaitansarahi7@gmail.com', '4567'),
('1212502071000V', 'Arelys Isamara', 'Gaitan Flores', '87491032', 'senkosan250920@gmail.com', '7891'),
('0012303011005F', 'Maria Fernanda', 'Galeano Perez', '82947365', 'marifer29@gmail.com', '8910'),
('1212104001006M', 'Juan Carlos', 'Martínez López', '89756320', 'juancarlosm20@yahoo.com', '9101'),
('0011505051007F', 'Ana Beatriz', 'Torres Mendoza', '85103947', 'anatorres2024@hotmail.com', '1011'),
('1210706981008M', 'Luis Alberto', 'García Rodríguez', '86742105', 'luisgarcia4@gmail.com', '0112'),
('0011707891009F', 'Sofía Elena', 'Ramírez Silva', '89475621', 'sofiam4@gmail.com', '1112'),
('0011108881000M', 'Carlos Andrés', 'Morales Jiménez', '82356904', 'carlosmorales02@hotmail.com', '1121'),
('0012407001001F', 'Mariana Isabel', 'Vega Cruz', '88203947', 'marianavega024@yahoo.com', '1213'),
('1260901991002M', 'David Eduardo', 'Ruiz Ortega', '84652983', 'davidruiz20@gmail.com', '2131'),
('0021202011003F', 'Gabriela María', 'Pineda Rivas', '87903146', 'gabrielap14@gmail.com', '1314'),
('0012303031004M', 'Alejandro José', 'Torres Valle', '85839274', 'alejandrotorres84@yahoo.com', '3141'),
('0011104011005F', 'Verónica Alejandra', 'López Ruiz', '81507329', 'verolopez924@hotmail.com', '1415'),
('0012505861006M', 'Fernando Antonio', 'Gutiérrez Lara', '83420568', 'fernandog094@gmail.com', '4151'),
('0010606851007F', 'Natalia Fernanda', 'Blanco Gómez', '87294013', 'nataliab724@gmail.com', '1516'),
('0012307011008M', 'Ricardo Emilio', 'Castillo Orozco', '89645207', 'ricardoc123@hotmail.com', '5161'),
('1213008041009F', 'Daniela Lucía', 'Herrera Salinas', '88901352', 'danielah754@yahoo.com', '1617');

INSERT INTO menu ( ID_Categoria, Nombre, Descripcion, Precio) VALUES 
(1, 'Salchipapas', 'Salchipapas con queso Chedar', 200),
(1, 'Canasta de camarón', 'Canastas de plátano con camarones', 380),
(1, 'Canasta de res', 'Canastas de plátano con carne de res', 250),
(1, 'Nachos con carne', 'Tortillas de maíz con carne', 250),
(1, 'Chilaquiles', 'Totopos de maíz con carne de su preferencia', 250),
(1, 'Tostones con queso', 'Tostónes de plátano con queso', 150),
(1, 'Tostones con queso y salchichas', 'Tostónes de plátano con queso y salchichas', 200),
(2, 'Res a la plancha', 'Filete de res a la plancha', 300),
(2, 'Churrasco', 'Filete de res en salsa churrasco', 330),
(2, 'Jalapeño de res', 'Filete de res en salsa jalapeño', 350),
(2, 'Bisteck de res', 'Bisteck de res con arroz y tostónes', 330),
(2, 'Pollo a la plancha', 'Filete de pollo a la plancha', 280),
(2, 'Fajitas de pollo empanizadas', 'Con salsa rosada', 280),
(2, 'Filete de cerdo a la plancha', 'Filete de cerdo a la plancha', 300); 
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
VALUES (1, 1, 1, 'COMPLETADA', '2022-03-15', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 1, 200) ;

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (2, 2, 2, 'EN PROCESO', '2022-03-17', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 15, 230);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (3, 3, 1, 'COMPLETADA', '2022-03-18', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 20, 250);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (4, 4, 2, 'COMPLETADA', '2022-03-22', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (4, @ID_Orden, 50, 250);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (5, 1, 1, 'EN PROCESO', '2022-04-02', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (5, @ID_Orden, 150, 250);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (6, 2, 2, 'COMPLETADA', '2022-04-04', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (6, @ID_Orden, 25, 210);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (7, 3, 1, 'COMPLETADA', '2022-04-08', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (7, @ID_Orden, 25, 210);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (8, 4, 2, 'EN PROGRESO', '2024-04-13', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (8, @ID_Orden, 15, 150);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (9, 1, 1, 'PENDIENTE', '2024-04-26', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (9, @ID_Orden, 30, 180);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (10, 2, 2, 'COMPLETADA', '2024-05-07', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (10, @ID_Orden, 20, 200);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (11, 3, 1, 'EN PROGRESO', '2024-05-08', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (11, @ID_Orden, 10, 100);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (12, 4, 2, 'COMPLETADA', '2024-05-11', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (12, @ID_Orden, 8, 168);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (13, 1, 1, 'PENDIENTE', '2024-05-15', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (13, @ID_Orden, 12, 120);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (14, 2, 2, 'EN PROGRESO', '2024-05-21', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (14, @ID_Orden, 22, 132);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (15, 3, 1, 'COMPLETADA', '2024-05-23', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 18, 180);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (16, 4, 2, 'PENDIENTE', '2024-05-25', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 35, 350);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (17, 1, 1, 'EN PROGRESO', '2024-05-27', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 28, 235.2);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (18, 2, 2, 'COMPLETADA', '2024-05-29', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (4, @ID_Orden, 14, 140);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (19, 3, 1, 'PENDIENTE', '2024-06-01', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (5, @ID_Orden, 19, 114);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (20, 4, 2, 'EN PROGRESO', '2024-06-05', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (6, @ID_Orden, 17, 170);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (21, 1, 1, 'COMPLETADA', '2024-06-08', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (7, @ID_Orden, 11, 110);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (1, 2, 2, 'PENDIENTE', '2024-06-11', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (8, @ID_Orden, 23, 193.8);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (2, 3, 1, 'EN PROGRESO', '2024-06-16', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (9, @ID_Orden, 16, 160);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (4, 4, 2, 'COMPLETADA', '2024-06-21', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (10, @ID_Orden, 21, 126);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (5, 1, 1, 'PENDIENTE', '2024-06-22', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (11, @ID_Orden, 13, 130);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (6, 2, 2, 'EN PROGRESO', '2024-06-23', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (12, @ID_Orden, 27, 270);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (7, 3, 1, 'COMPLETADA', '2024-06-24', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (13, @ID_Orden, 32, 268.8);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (8, 4, 2, 'PENDIENTE', '2024-06-25', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (14, @ID_Orden, 29, 290);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (9, 1, 1, 'EN PROGRESO', '2024-06-26', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (1, @ID_Orden, 14, 84);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (10, 2, 2, 'COMPLETADA', '2024-06-27', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (2, @ID_Orden, 18, 180);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (11, 3, 1, 'PENDIENTE', '2024-06-28', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (3, @ID_Orden, 23, 220);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (12, 4, 2, 'COMPLETADA', '2024-07-1', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (4, @ID_Orden, 23, 220);

SELECT * FROM cliente;
SELECT * FROM empleado;
SELECT * FROM tipo_orden;
SELECT * FROM estado;
SELECT * FROM fecha_hora;
SELECT * FROM orden;
SELECT * FROM detalle_orden;
SELECT * FROM categoria;
SELECT * FROM menu;
SELECT * FROM metodo_de_pago;



INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (13, 1, 1, 'EN PROGRESO', '2024-07-07', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (5, @ID_Orden, 27, 270);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (14, 2, 2, 'COMPLETADA', '2024-07-10', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (6, @ID_Orden, 32, 270);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (15, 3, 1, 'PENDIENTE', '2024-07-14', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (7, @ID_Orden, 29, 290);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (16, 4, 2, 'EN PROGRESO', '2024-07-20', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (8, @ID_Orden, 14, 84);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (17, 1, 1, 'COMPLETADA', '2024-07-27', 2);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (9, @ID_Orden, 18, 180);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (18, 2, 1, 'PENDIENTE', '2024-07-30', 3);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (10, @ID_Orden, 23, 220);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (19, 3, 2, 'COMPLETADA', '2024-08-01', 4);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (11, @ID_Orden, 37, 220);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (20, 4, 2, 'PENDIENTE', '2024-08-08', 5);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (12, @ID_Orden, 20, 220);

INSERT INTO orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, Fecha_Hora, ID_Metodo_Pago)
VALUES (21, 1, 1, 'COMPLETADA', '2024-08-16', 1);
SET @ID_Orden = last_insert_id();
INSERT INTO detalle_orden (ID_Menu, ID_Orden, Cantidad, Precio)
VALUES (13, @ID_Orden, 16, 220);