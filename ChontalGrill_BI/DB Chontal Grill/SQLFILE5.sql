use chontal_grill2024;
SELECT ID_Cliente, Nombres FROM cliente;
SELECT ID_Empleado, Nombres FROM empleado;
SELECT ID_Menu, Nombre, Precio FROM menu;
SELECT Id_Tipo_Orden, Tipo FROM tipo_orden;
SELECT ID_Metodo_Pago, Descripcion FROM metodo_de_pago;

select * from orden;
select * from detalle_orden;

SELECT
    OD.ID_Detalle_Orden AS ID_HOrden,
    o.ID_Orden,
    CONCAT(
        YEAR(o.Fecha_Hora), 
        LPAD(MONTH(o.Fecha_Hora), 2, '0'), 
        LPAD(DAY(o.Fecha_Hora), 2, '0')
    ) AS ID_Tiempo,
     o.ID_Tipo_Orden,
	 o.ID_Cliente,
    o.ID_Empleado,
     OD.ID_Menu,
    o.ID_Metodo_Pago,
	o.Estado,
    OD.Cantidad,
	OD.Precio,
	(OD.Cantidad * OD.Precio) AS Monto
FROM
    orden o
JOIN
    detalle_orden OD ON o.ID_Orden = OD.ID_Orden;

