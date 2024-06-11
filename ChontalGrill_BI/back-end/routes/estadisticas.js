const express = require("express");
const router = express.Router();

module.exports = (db) => {
  /*URL para usar el Thunder Client http://localhost:5000/estadisticas/ordenestolaesporanio*/

  /*Ventas totales por año*/
  router.get("/ordenestotalesporanio", (req, res) => {
    const sql = `SELECT 
    Anio, 
    SUM(Cantidad) AS Cantidad
FROM 
    H_Orden
JOIN 
    DIM_Tiempo ON H_Orden .ID_Tiempo = DIM_Tiempo.ID_Tiempo
GROUP BY 
    Anio;`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros" });
      } else {
        res.status(200).json(results);
      }
    });
  });

  /*Ordenes totales por mes de un año específico*/
  router.get("/ordenespormesdeanio", (req, res) => {
    const sql = `SELECT 
    Mes, 
    SUM(Cantidad) AS Cantidad
FROM 
    H_Orden 
JOIN 
    DIM_Tiempo ON H_Orden .ID_Tiempo = DIM_Tiempo.ID_Tiempo
WHERE 
    Anio = 2024
GROUP BY 
    Mes;`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros" });
      } else {
        res.status(200).json(results);
      }
    });
  });

  /*Ordenes totales por dia de un mes y año especificos */
  router.get("/ordenespordiayanio", (req, res) => {
    const sql = `SELECT 
    Dia, 
    SUM(Cantidad) AS Cantidad
FROM 
    H_Orden 
JOIN 
    DIM_Tiempo ON H_Orden .ID_Tiempo = DIM_Tiempo.ID_Tiempo
WHERE 
    Anio = 2024 AND Mes = 5
GROUP BY 
    Dia;`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros" });
      } else {
        res.status(200).json(results);
      }
    });
  });

  /*ordenes totales por pedido*/
  router.get("/ordenestotalesporpedido", (req, res) => {
    const sql = `SELECT 
  m.ID_Menu, 
  m.Nombre, 
  SUM(ho.Cantidad) AS Cantidad, 
  SUM(ho.Monto) AS Monto
FROM 
  H_Orden ho
JOIN 
  DIM_Menu m ON ho.ID_Menu = m.ID_Menu
GROUP BY 
  m.ID_Menu, m.Nombre;`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros" });
      } else {
        res.status(200).json(results);
      }
    });
  });

  /*Ordenes por producto y por mes*/
  router.get("/ordenesporproductoymes", (req, res) => {
    const sql = `SELECT 
      m.Nombre,
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
      m.Nombre, t.Mes, t.Anio
  ORDER BY 
      t.Anio, t.Mes, Cantidad DESC
  LIMIT 15;`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros" });
      } else {
        res.status(200).json(results);
      }
    });
  });



  router.get("/ordenesporproductoymes2", (req, res) => {
    const sql = `SELECT 
      m.Nombre,
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
      m.Nombre, t.Mes, t.Anio
  ORDER BY 
      t.Anio, t.Mes, Cantidad DESC;`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros" });
      } else {
        res.status(200).json(results);
      }
    });
  });

  /*Top 5 pedidos más vendidos por cantidad*/
  /*router.get("/pedidosvendidoscant", (req, res) => {
    const sql = `SELECT 
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
LIMIT 5;`;

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros" });
      } else {
        res.status(200).json(results);
      }
    });
  });*/

  return router;
};
