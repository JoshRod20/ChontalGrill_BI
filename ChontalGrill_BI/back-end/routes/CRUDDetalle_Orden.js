const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Detalle_Orden';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result);
      }
    });
  });
    
  
  router.post('/CreateOrden', (req, res) => {
    const { ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, ID_Metodo_Pago, detalle} = req.body;
    const Fecha_Hora = new Date();
  
      // Insertar la compra
      const sqlOrden = 'INSERT INTO orden ( ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, ID_Metodo_Pago, Fecha_Hora) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(sqlOrden, [ID_Cliente, ID_Empleado, Id_Tipo_Orden, Estado, ID_Metodo_Pago, Fecha_Hora], (err, result) => {
        if (err) {
          console.error('Error al insertar la orden:', err);
          return res.status(500).json({ error: 'Error al insertar la orden' });
        }
  
          const ID_Orden = result.insertId;
  
          // Insertar el detalle de compra
          const sqlDetalle = 'INSERT INTO detalle_orden (ID_Menu, Cantidad, Precio, ID_Orden) VALUES ?';
          const values = detalle.map((item) => [item.ID_Menu, item.Cantidad, item.Precio, ID_Orden]);
          db.query(sqlDetalle, [values], (err, result) => {
            if (err) {
              console.error('Error al insertar detalle de orden:', err);
              return res.status(500).json({ error: 'Error al insertar detalle de orden' });
            }
    
            // Devolver respuesta exitosa
            res.status(201).json({ message: 'Orden y detalle de venta agregados con éxito' });
          });
        });
      });
  //Invoke-RestMethod -Uri "http://localhost:5000/detalle_orden/create" -Method POST -ContentType "application/json" -Body '{"ID_Menu": 3, "ID_Orden": 2, "Cantidad": 3}'

  router.get('/readCliente', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT ID_Cliente, Nombres FROM cliente';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla cliente' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/readEmpleado', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT ID_Empleado, Nombres FROM empleado';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla empleado' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/readMenu', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT ID_Menu, Nombre, Precio FROM menu';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla menu' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/readTipoOrden', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT Id_Tipo_Orden, Tipo FROM tipo_orden';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla tipo_orden' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/readMetodoPago', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT ID_Metodo_Pago, Descripcion FROM metodo_de_pago ';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla metodo_pago' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  return router;
};



  

//Invoke-RestMethod -Uri "http://localhost:5000/detalle_orden/delete/5" -Method DELETE
