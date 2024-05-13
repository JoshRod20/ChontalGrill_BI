const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  // READ
  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Tipo_Orden';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Create
  router.post('/create', (req, res) => {
    const { Tipo, Descripcion, Nota_Especial, Numero_Mesa, Direccion } = req.body;
    if (!Tipo) {
      return res.status(400).json({ error: 'El campo Tipo es obligatorio' });
    }
    const sql = `
      INSERT INTO Tipo_Orden (Tipo, Descripcion, Nota_Especial, Numero_Mesa, Direccion)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [Tipo, Descripcion || null, Nota_Especial || null, Numero_Mesa || null, Direccion || null];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });

  // Update
  router.put('/update/:id', (req, res) => {
    const Id_Tipo_Orden = req.params.id;
    const { Tipo, Descripcion, Nota_Especial, Numero_Mesa, Direccion } = req.body;
    if (!Tipo) {
      return res.status(400).json({ error: 'El campo Tipo es obligatorio' });
    }
    const sql = `
      UPDATE Tipo_Orden
      SET Tipo = ?, Descripcion = ?, Nota_Especial = ?, Numero_Mesa = ?, Direccion = ?
      WHERE Id_Tipo_Orden = ?
    `;
    const values = [Tipo, Descripcion || null, Nota_Especial || null, Numero_Mesa || null, Direccion || null, Id_Tipo_Orden];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  // Delete
  router.delete('/delete/:id', (req, res) => {
    const Id_Tipo_Orden = req.params.id;
    const sql = 'DELETE FROM Tipo_Orden WHERE Id_Tipo_Orden = ?';
    db.query(sql, [Id_Tipo_Orden], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  return router;
};
