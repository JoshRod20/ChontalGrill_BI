Use ChontalGrill_DM;

-- Ordenes totales por año:
SELECT 
    Anio, 
    SUM(Cantidad) AS Cantidad
FROM 
    H_Orden
JOIN 
    DIM_Tiempo ON H_Orden .ID_Tiempo = DIM_Tiempo.ID_Tiempo
GROUP BY 
    Anio;


-- Ordenes totales por mes de un año específico (por ejemplo, 2024):
SELECT 
    Mes, 
    SUM(Cantidad) AS Cantidad
FROM 
    H_Orden 
JOIN 
    DIM_Tiempo ON H_Orden .ID_Tiempo = DIM_Tiempo.ID_Tiempo
WHERE 
    Anio = 2024
GROUP BY 
    Mes;


-- Ordenes totales por día de un mes y año específicos (por ejemplo, mayo de 2024):
SELECT 
    Dia, 
    SUM(Cantidad) AS Cantidad
FROM 
    H_Orden 
JOIN 
   DIM_Tiempo ON H_Orden .ID_Tiempo = DIM_Tiempo.ID_Tiempo
WHERE 
    Anio = 2024 AND Mes = 5
GROUP BY 
    Dia;


-- Ordenes totales por Pedidos:
SELECT 
    m.ID_Menu, 
    m.Nombre, 
    SUM(ho.Cantidad) AS Cantidad, 
    SUM(ho.Monto) AS Monto
FROM 
    H_Orden ho
JOIN 
    DIM_Menu m ON ho.ID_Menu = m.ID_Menu
GROUP BY 
    m.ID_Menu, m.Nombre;


-- Ordenes totales por categoría de Pedidos:
SELECT 
    m.NombreC,
    SUM(ho.Cantidad) AS Cantidad
FROM 
    H_Orden ho
JOIN 
    DIM_Menu m ON ho.ID_Menu = m.ID_Menu
GROUP BY 
    m.NombreC
ORDER BY 
    Cantidad DESC;


-- Ordenes por producto y por mes:
SELECT 
    m.NombreC,
    t.Mes,
    t.Anio,
    SUM(ho.Cantidad) AS Cantidad
FROM 
    H_Orden ho
JOIN 
    DIM_Menu m ON ho.ID_Menu = m.ID_Menu
JOIN 
    DIM_Tiempo t ON ho.ID_Tiempo = t.ID_Tiempo
GROUP BY 
    m.NombreC, t.Mes, t.Anio
ORDER BY 
    t.Anio, t.Mes, Cantidad DESC;

    
-- Top 5 Órdenes por cantidad:
SELECT 
    m.NombreC,
    SUM(ho.Cantidad) AS Cantidad
FROM 
    H_Orden ho
JOIN 
    DIM_Menu m ON ho.ID_Menu = m.ID_Menu
GROUP BY 
    m.NombreC
ORDER BY 
    Cantidad DESC
LIMIT 5;


-- Top 5 pedidos más vendidos por cantidad:
SELECT 
    m.Nombre,
    SUM(ho.Cantidad) AS Cantidad
FROM 
    H_Orden ho
JOIN 
    DIM_Menu m ON ho.ID_Menu = m.ID_Menu
GROUP BY 
    m.Nombre
ORDER BY 
    Cantidad DESC
LIMIT 5;