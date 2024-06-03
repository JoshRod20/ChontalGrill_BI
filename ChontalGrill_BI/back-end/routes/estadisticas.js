const express = require('express');
const router = express.Router();


module.exports = (db) => {

  /*URL para usar el Thunder Client http://localhost:5000/estadisticas/ordenestolaesporanio*/

  /*Ventas totales por año*/
  router.get('/ordenestotalesporanio', (req, res) => {
    const sql =
    `SELECT 
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
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  

/*Ordenes totales por mes de un año específico*/
  router.get('/ordenespormesdeanio', (req, res) => {
    const sql =
    `SELECT 
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
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(results);
      }
    });
  });


/*Ordenes totales por dia de un mes y año especificos */
  router.get('/ordenespordiayanio', (req, res) => {
    const sql =
    `SELECT 
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
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(results);
      }
    });
  });





/*ordenes totales por pedido*/
router.get('/ordenestotalesporpedido', (req, res) => {
  const sql =
  `SELECT 
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
      console.error('Error al leer registros:', err);
      res.status(500).json({ error: 'Error al leer registros' });
    } else {
      res.status(200).json(results);
    }
  });
});





/*Ordenes totales por categoria de pedido*/
router.get('/ordenestotalesporanio', (req, res) => {
  const sql =
  `SELECT 
      m.NombreC,
      SUM(ho.Cantidad) AS Cantidad
  FROM 
      H_Orden ho
  JOIN 
      DIM_Menu m ON ho.ID_Menu = m.ID_Menu
  GROUP BY 
      m.NombreC
  ORDER BY 
    Cantidad DESC;`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al leer registros:', err);
      res.status(500).json({ error: 'Error al leer registros' });
    } else {
      res.status(200).json(results);
    }
  });
});



/*Ordenes por producto y por mes*/
router.get('/ordenesporproductoymes', (req, res) => {
  const sql =
    `SELECT 
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
      console.error('Error al leer registros:', err);
      res.status(500).json({ error: 'Error al leer registros' });
    } else {
      res.status(200).json(results);
    }
  });
});


/*Top´5 órdenes por cantidad....*/
router.get('/topordenescantidad', (req, res) => {
  const sql =
  `SELECT 
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
      console.error('Error al leer registros:', err);
      res.status(500).json({ error: 'Error al leer registros' });
    } else {
      res.status(200).json(results);
    }
  });
});



/*Top 5 pedidos más vendidos por cantidad*/
router.get('/pedidosvendidoscant', (req, res) => {
  const sql =
  `SELECT 
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
      console.error('Error al leer registros:', err);
      res.status(500).json({ error: 'Error al leer registros' });
    } else {
      res.status(200).json(results);
    }
  });
});
  /*router.post('/create', (req, res) => {
    const { ID_Categoria, Nombre, Descripcion, Precio, Imagen } = req.body;
    const sql = `INSERT INTO Menu (ID_Categoria, Nombre, Descripcion, Precio, Imagen) VALUES (?, ?, ?, ?, FROM_BASE64(?))`;
    const values = [ID_Categoria, Nombre, Descripcion, Precio, Imagen];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });

  router.put('/update/:id', (req, res) => {
    const ID_Menu = req.params.id;
    const { ID_Categoria, Nombre, Descripcion, Precio, Imagen } = req.body;
    const sql = `UPDATE Menu SET ID_Categoria = ?, Nombre = ?, Descripcion = ?, Precio = ?, Imagen = FROM_BASE64(?) WHERE ID_Menu = ?`;
    const values = [ID_Categoria, Nombre, Descripcion, Precio, Imagen, ID_Menu];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  router.delete('/delete/:id', (req, res) => {
    const ID_Menu = req.params.id;
    const sql = 'DELETE FROM Menu WHERE ID_Menu = ?';
    db.query(sql, [ID_Menu], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });*/

  return router;
};


