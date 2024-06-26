const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Leer categorías
    router.get('/read', (req, res) => {
        db.query('CALL ObtenerCategorias()', (err, results) => {
            if (err) {
                console.error('Error al leer categorías:', err);
                return res.status(500).json({ error: 'Error al leer categorías' });
            }
            if (results.length > 0 && results[0].length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ error: 'No se encontraron categorías' });
            }
        });
    });

    // Crear categoría
    router.post('/create', (req, res) => {
        const { Nombre } = req.body;
        if (!Nombre) {
            return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
        }
        db.query('CALL InsertarCategoria(?)', [Nombre], (err, results) => {
            if (err) {
                console.error('Error al agregar categoría:', err);
                return res.status(500).json({ error: 'Error al agregar categoría' });
            }
            res.status(201).json({ message: 'Categoría agregada con éxito' });
        });
    });

    // Actualizar categoría
    router.put('/update/:id', (req, res) => {
        const ID_Categoria = parseInt(req.params.id);
        const { Nombre } = req.body;
        if (!Nombre) {
            return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
        }
        db.query('CALL ActualizarCategoria(?, ?)', [ID_Categoria, Nombre], (err, results) => {
            if (err) {
                console.error('Error al actualizar categoría:', err);
                return res.status(500).json({ error: 'Error al actualizar categoría' });
            }
            res.status(200).json({ message: 'Categoría actualizada con éxito' });
        });
    });

    // Eliminar categoría
    router.delete('/delete/:id', (req, res) => {
        const ID_Categoria = parseInt(req.params.id);
        db.query('CALL EliminarCategoria(?)', [ID_Categoria], (err, results) => {
            if (err) {
                console.error('Error al eliminar categoría:', err);
                return res.status(500).json({ error: 'Error al eliminar categoría' });
            }
            res.status(200).json({ message: 'Categoría eliminada con éxito' });
        });
    });

    // Buscar categoría por texto
    router.get('/buscarcategoria/:searchText', (req, res) => {
        const searchText = req.params.searchText;
        const sql = 'SELECT * FROM categoria WHERE NombreC LIKE ?';
        db.query(sql, [`%${searchText}%`], (err, results) => {
            if (err) {
                res.status(500).send({ message: 'Error en la consulta de la base de datos', error: err });
            } else {
                res.status(200).send(results);
            }
        });
    });

    return router;
};
