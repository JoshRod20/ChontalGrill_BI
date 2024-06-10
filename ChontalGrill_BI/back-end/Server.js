const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");



const app = express();
const port = 5000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dayana2005",
    database: "chontal_grill2024"
})


db.connect((err) => {
    if (err) {
        console.error("Error de conexión a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos.");
    }
});

// Configuración de la conexión a la base de datos
const db2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dayana2005",
    database: "ChontalGrill_DM"
})


db2.connect((err) => {
    if (err) {
        console.error("Error de conexión a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos del data mart.");
    }
});

// Configurar middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Rutas
const CRUDCategoria = require("./routes/CRUDCategoria.js")(db);
const CRUDEmpleado = require("./routes/CRUDEmpleado.js")(db);
const CRUDMenu = require("./routes/CRUDMenu.js")(db);
const CRUDCliente = require("./routes/CRUDCliente.js")(db);
const CRUDTipo_Orden = require("./routes/CRUDTipo_Orden.js")(db);
const CRUDReservacion = require("./routes/CRUDReservacion.js")(db);
const CRUDComentarios = require("./routes/CRUDComentarios.js")(db);
const CRUDOrden = require("./routes/CRUDOrden.js")(db);
const CRUDDetalle_Orden = require("./routes/CRUDDetalle_Orden.js")(db);
const AutenticacionEmpleado = require("./routes/CRUDLogin.js")(db);
const MetodoPago = require("./routes/CRUDMetodo_Pago.js")(db);



app.use("/categoria", CRUDCategoria);
app.use("/empleado", CRUDEmpleado);
app.use("/menu", CRUDMenu);
app.use("/cliente", CRUDCliente);
app.use("/tipo_orden", CRUDTipo_Orden);
app.use("/reservacion", CRUDReservacion);
app.use("/comentarios", CRUDComentarios);
app.use("/orden", CRUDOrden);
app.use("/detalle_orden", CRUDDetalle_Orden);
app.use("/autenticacion_empleado", AutenticacionEmpleado);
app.use("/metodopago", MetodoPago);


// Importar y usar rutas para la segunda base de datos
const estadisticas = require("./routes/estadisticas.js")(db2); // Pasa la instancia de la segunda base de datos a crudRoutesDb2
app.use("/estadisticas", estadisticas);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});
