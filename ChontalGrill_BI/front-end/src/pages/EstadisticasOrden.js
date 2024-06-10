    import React, { useEffect, useState } from "react"; // Importación de React, useEffect y useState desde 'react'
    import Header from "../components/Header"; // Importación del componente Header desde la ruta '../components/Header'
    import { Button, Row, Col, Card, Container } from "react-bootstrap"; // Importación de componentes específicos desde 'react-bootstrap'
    import jsPDF from "jspdf";
    import Chart from "chart.js/auto";
    import "../styles/App.css";
    import html2canvas from "html2canvas";

    function Estadisticas({ rol }) {
    const [ordenes, setOrdenes] = useState([]); // Debes declarar una constante para cada gráfico para la declaración del estado 'ordenes' y su función 'setOrdenes' a través de useState, con un valor inicial de un array vacío

    const [myChart, setMyChart] = useState(null); // Declara del estado 'myChart' y su función 'setMyChart' a través de useState, con un valor inicial de 'null' para cada gráfico

    // Gráfico 2 //////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch("http://localhost:5000/estadisticas/ordenestotalesporanio") // Realiza una solicitud GET al servidor para obtener las órdenes
        .then((response) => response.json()) // Convierte la respuesta a formato JSON
        .then((data) => setOrdenes(data)) // Almacena las órdenes en el estado 'ordenes'
        .catch((error) => console.error("Error al obtener las órdenes:", error)); // Manejo de errores en caso de fallar la solicitud
    }, []);

    useEffect(() => {
        if (ordenes.length > 0) {
        //Define la constante que declaraste arribla 'ordenes'
        const ord = document.getElementById("myChart"); // Obtiene el elemento canvas con el ID 'myChart'

        if (myChart !== null) {
            //Define la constante según cada gráfico, ya sea 'myChart' o 'myChart1'
            myChart.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
        }

        const año = ordenes.map((orden) => orden.Anio); // Extrae las órdenes realizadas en el año
        const cantidad = ordenes.map((orden) => orden.Cantidad); // Extrae la cantidad total de órdenes por año

        const estadistica1 = new Chart(ord, {
            // Crea un nuevo gráfico de tipo 'bar' o barras con Chart.js y le asignas el elemento canvas
            type: "bar",
            data: {
            labels: año, // Asigna las órdenes como etiquetas para el eje X
            datasets: [
                {
                label: "Cantidad de órdenes por año", // Etiqueta para la leyenda del gráfico
                data: cantidad, // Asigna las cantidades de órdenes por año para la visualización
                backgroundColor: "rgba(51, 214, 18, 0.843)", // Define el color de fondo de las barras, puede ser cualquiera
                borderColor: "rgba(51, 214, 18, 0)", // Define el color del borde de las barras, del mismo color
                borderWidth: 1, // Define el ancho del borde de las barras, como prefieraws
                },
            ],
            },
            options: {
            scales: {
                y: {
                beginAtZero: true, // Comienza el eje Y desde cero
                },
            },
            },
        });
        setMyChart(estadistica1); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
        }
    }, [ordenes]);

    //Reporte 1
    const generarReporteAlmacenImg1 = async () => {
        try {
        // Utiliza html2canvas para capturar el contenido del elemento con el ID 'myChart' y obtener un objeto canvas o gráfico en imagen
        const canvas = await html2canvas(document.getElementById("myChart"));
        // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        // Añade un texto al documento PDF
        pdf.text("Reporte de cantidad de órdenes por año", 50, 10);
        // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
        pdf.addImage(imgData, "PNG", 10, 20, 120, 120);

        fetch("http://localhost:5000/estadisticas/ordenestotalesporanio") // Realiza una solicitud GET al servidor para obtener las órdenes
            .then((response) => response.json()) // Convierte la respuesta a formato JSON
            .then((ordenes) => {
            let y = 150; // Posición inicial en el eje Y dentro del documento PDF

            ordenes.forEach((orden) => {
                // Itera sobre las órdenes para generar el reporte
                pdf.text(`Año: ${orden.Anio}`, 20, y); // Agrega el año al documento PDF
                pdf.text(
                `Cantidad total de órdenes por año: ${orden.Cantidad}`,
                20,
                y + 10
                ); // Agrega la cantidad del órdenes por año al documento PDF

                y += 30; // Incrementa la posición Y para la siguiente línea
                if (y >= 280) {
                // Si alcanza el final de la página, crea una nueva página
                pdf.addPage();
                y = 15; // Reinicia la posición Y en la nueva página
                }
            });

            pdf.save("reporte_ordenes_por_año.pdf"); // Descargar el documento PDF con el nombre 'reporte_ordenes_por_año.pdf'
            });
        } catch (error) {
        // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
        console.error("Error al generar el reporte con imagen:", error);
        }
    };

    const [ordenes2, setOrdenes2] = useState([]); // Estado 'ordenes2' con su función 'setOrdenes2'
    const [myChart2, setMyChart2] = useState(null); // Estado 'myChart2' con su función 'setMyChart2'

    useEffect(() => {
        fetch("http://localhost:5000/estadisticas/ordenespormesdeanio")
        .then((response) => response.json())
        .then((data) => setOrdenes2(data))
        .catch((error) => console.error("Error al obtener las órdenes:", error));
    }, []);

    useEffect(() => {
        if (ordenes2.length > 0) {
        const ord = document.getElementById("myChart2");

        if (myChart2 !== null) {
            myChart2.destroy();
        }

        const mes = ordenes2.map((orden2) => orden2.Mes);
        const cantidad = ordenes2.map((orden2) => orden2.Cantidad);

        const estadistica2 = new Chart(ord, {
            type: "bar",
            data: {
            labels: mes,
            datasets: [
                {
                label: "Cantidad de órdenes por mes",
                data: cantidad,
                backgroundColor: "rgba(51, 214, 18, 0.843)",
                borderColor: "rgba(51, 214, 18, 0)",
                borderWidth: 1,
                },
            ],
            },
            options: {
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });

        setMyChart2(estadistica2);
        }
    }, [ordenes2]);

    const generarReporteAlmacenImg0 = async () => {
        try {
        const canvas = await html2canvas(document.getElementById("myChart2"));
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        pdf.text("Reporte de cantidad de órdenes por mes", 50, 10);
        pdf.addImage(imgData, "PNG", 10, 20, 120, 120);

        fetch("http://localhost:5000/estadisticas/ordenespormesdeanio")
            .then((response) => response.json())
            .then((ordenes2) => {
            let y = 150;

            ordenes2.forEach((orden) => {
                pdf.text(`Mes: ${orden.Mes}`, 20, y);
                pdf.text(
                `Cantidad total de órdenes por mes: ${orden.Cantidad}`,
                20,
                y + 10
                );

                y += 30;
                if (y >= 280) {
                pdf.addPage();
                y = 15;
                }
            });

            pdf.save("reporte_ordenes_por_mes.pdf");
            });
        } catch (error) {
        console.error("Error al generar el reporte con imagen:", error);
        }
    };

    const [ordenes3, setOrdenes3] = useState([]); // Estado 'ordenes2' con su función 'setOrdenes2'
    const [myChart3, setMyChart3] = useState(null); // Estado 'myChart2' con su función 'setMyChart2'

    useEffect(() => {
        fetch("http://localhost:5000/estadisticas/ordenespordiayanio")
        .then((response) => response.json())
        .then((data) => setOrdenes3(data))
        .catch((error) => console.error("Error al obtener las órdenes:", error));
    }, []);

    useEffect(() => {
        if (ordenes3.length > 0) {
        const ord = document.getElementById("myChart3");

        if (myChart3 !== null) {
            myChart3.destroy();
        }

        const dia = ordenes3.map((orden3) => orden3.Dia);
        const cantidad = ordenes3.map((orden3) => orden3.Cantidad);

        const estadistica3 = new Chart(ord, {
            type: "bar",
            data: {
            labels: dia,
            datasets: [
                {
                label: "Cantidad de órdenes por dia",
                data: cantidad,
                backgroundColor: "rgba(51, 214, 18, 0.843)",
                borderColor: "rgba(51, 214, 18, 0)",
                borderWidth: 1,
                },
            ],
            },
            options: {
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });

        setMyChart3(estadistica3);
        }
    }, [ordenes3]);

    const generarReporteAlmacenImg3 = async () => {
        try {
        const canvas = await html2canvas(document.getElementById("myChart3"));
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        pdf.text("Reporte de cantidad de órdenes por dia", 50, 10);
        pdf.addImage(imgData, "PNG", 10, 20, 120, 120);

        fetch("http://localhost:5000/estadisticas/ordenespordiayanio")
            .then((response) => response.json())
            .then((ordenes2) => {
            let y = 150;

            ordenes2.forEach((orden) => {
                pdf.text(`Dia: ${orden.Dia}`, 20, y);
                pdf.text(
                `Cantidad total de órdenes por dia: ${orden.Cantidad}`,
                20,
                y + 10
                );

                y += 30;
                if (y >= 280) {
                pdf.addPage();
                y = 15;
                }
            });

            pdf.save("reporte_ordenes_por_dia.pdf");
            });
        } catch (error) {
        console.error("Error al generar el reporte con imagen:", error);
        }
    };

    const [ordenes4, setOrdenes4] = useState([]);
    const [myChart4, setMyChart4] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/estadisticas/ordenestotalesporpedido")
        .then((response) => response.json())
        .then((data) => setOrdenes4(data))
        .catch((error) => console.error("Error al obtener las órdenes:", error));
    }, []);

    useEffect(() => {
        if (ordenes4.length > 0) {
        const ord = document.getElementById("myChart4");

        if (myChart4 !== null) {
            myChart4.destroy();
        }

        const pedido = ordenes4.map((orden4) => orden4.Nombre);
        const cantidad = ordenes4.map((orden4) => orden4.Cantidad);

        const estadistica4 = new Chart(ord, {
            type: "bar",
            data: {
            labels: pedido,
            datasets: [
                {
                label: "Cantidad de órdenes totales por pedido",
                data: cantidad,
                backgroundColor: "rgba(51, 214, 18, 0.843)",
                borderColor: "rgba(51, 214, 18, 0)",
                borderWidth: 1,
                },
            ],
            },
            options: {
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });

        setMyChart4(estadistica4);
        }
    }, [ordenes4]);

    const generarReporteAlmacenImg4 = async () => {
        try {
        const canvas = await html2canvas(document.getElementById("myChart4"));
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        pdf.text("Reporte de cantidad de órdenes totales por pedido", 50, 10);
        pdf.addImage(imgData, "PNG", 10, 20, 120, 120);

        fetch("http://localhost:5000/estadisticas/ordenestotalesporpedido")
            .then((response) => response.json())
            .then((ordenes4) => {
            let y = 150;

            ordenes4.forEach((orden) => {
                pdf.text(`Pedido: ${orden.Pedido}`, 20, y);
                pdf.text(
                `Cantidad total de órdenes por pedido: ${orden.Cantidad}`,
                20,
                y + 10
                );

                y += 30;
                if (y >= 280) {
                pdf.addPage();
                y = 15;
                }
            });

            pdf.save("reporte_ordenes_por_pedido.pdf");
            });
        } catch (error) {
        console.error("Error al generar el reporte con imagen:", error);
        }
    };

    const [ordenes5, setOrdenes5] = useState([]); // Estado 'ordenes5' con su función 'setOrdenes5'
    const [myChart5, setMyChart5] = useState(null); // Estado 'myChart5' con su función 'setMyChart5'

    useEffect(() => {
        fetch("http://localhost:5000/estadisticas/ordenesporproductoymes")
        .then((response) => response.json())
        .then((data) => setOrdenes5(data))
        .catch((error) => console.error("Error al obtener las órdenes:", error));
    }, []);

    useEffect(() => {
        if (ordenes5.length > 0) {
        const ord = document.getElementById("myChart5");

        if (myChart5 !== null) {
            myChart5.destroy();
        }

        const nombreC = ordenes5.map((orden5) => orden5.Nombre);
        const cantidad = ordenes5.map((orden5) => orden5.Cantidad);

        const estadistica5 = new Chart(ord, {
            type: "pie",
            data: {
            labels: nombreC,
            datasets: [
                {
                label: "Cantidad de órdenes totales por año",
                data: cantidad,
                backgroundColor: "rgba(51, 214, 18, 0.843)",
                borderColor: "rgba(51, 214, 18, 0)",
                borderWidth: 1,
                },
            ],
            },
            options: {
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });

        setMyChart5(estadistica5);
        }
    }, [ordenes5]);

    const generarReporteAlmacenImg5 = async () => {
        try {
        const canvas = await html2canvas(document.getElementById("myChart5"));
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        pdf.text("Reporte de cantidad de órdenes totales por año", 50, 10);
        pdf.addImage(imgData, "PNG", 10, 20, 120, 120);

        fetch("http://localhost:5000/estadisticas/ordenesporproductoymes")
            .then((response) => response.json())
            .then((ordenes5) => {
            let y = 150;

            ordenes5.forEach((orden) => {
                pdf.text(`Nombre: ${orden.NombreC}`, 20, y);
                pdf.text(
                `Cantidad total de órdenes: ${orden.Cantidad}`,
                20,
                y + 10
                );

                y += 30;
                if (y >= 280) {
                pdf.addPage();
                y = 15;
                }
            });

            pdf.save("reporte_ordenes_por_anio.pdf");
            });
        } catch (error) {
        console.error("Error al generar el reporte con imagen:", error);
        }
    };

    const [ordenes6, setOrdenes6] = useState([]); // Estado 'ordenes5' con su función 'setOrdenes5'
    const [myChart6, setMyChart6] = useState(null); // Estado 'myChart5' con su función 'setMyChart5'

    useEffect(() => {
        fetch("http://localhost:5000/estadisticas/topordenescantidad")
        .then((response) => response.json())
        .then((data) => setOrdenes6(data))
        .catch((error) => console.error("Error al obtener las órdenes:", error));
    }, []);

    useEffect(() => {
        if (ordenes6.length > 0) {
        const ord = document.getElementById("myChart6");

        if (myChart6 !== null) {
            myChart6.destroy();
        }

        const nombre = ordenes6.map((orden6) => orden6.Nombre);
        const cantidad = ordenes6.map((orden6) => orden6.Cantidad);

        const estadistica6 = new Chart(ord, {
            type: "bar",
            data: {
            labels: nombre,
            datasets: [
                {
                label: "Top órdenes totales",
                data: cantidad,
                backgroundColor: "rgba(51, 214, 18, 0.843)",
                borderColor: "rgba(51, 214, 18, 0)",
                borderWidth: 1,
                },
            ],
            },
            options: {
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });

        setMyChart6(estadistica6);
        }
    }, [ordenes6]);

    const generarReporteAlmacenImg6 = async () => {
        try {
        const canvas = await html2canvas(document.getElementById("myChart6"));
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        pdf.text("Reporte de top de órdenes", 50, 10);
        pdf.addImage(imgData, "PNG", 10, 20, 120, 120);

        fetch("http://localhost:5000/estadisticas/topordenescantidad")
            .then((response) => response.json())
            .then((ordenes6) => {
            let y = 150;

            ordenes6.forEach((orden) => {
                pdf.text(`Nombre: ${orden.NombreC}`, 20, y);
                pdf.text(`Top de órdenes: ${orden.Cantidad}`, 20, y + 10);

                y += 30;
                if (y >= 280) {
                pdf.addPage();
                y = 15;
                }
            });

            pdf.save("reporte_top_ordenes_por_cantidad.pdf");
            });
        } catch (error) {
        console.error("Error al generar el reporte con imagen:", error);
        }
    };

    const [ordenes7, setOrdenes7] = useState([]);
    const [myChart7, setMyChart7] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/estadisticas/ordenesporproductoymes")
        .then((response) => response.json())
        .then((data) => setOrdenes7(data))
        .catch((error) => console.error("Error al obtener las órdenes:", error));
    }, []);

    useEffect(() => {
        if (ordenes6.length > 0) {
        const ord = document.getElementById("myChart7");

        if (myChart7 !== null) {
            myChart7.destroy();
        }

        const ordenesCantidad = ordenes7.map((orden7) => orden7.Mes);
        const cantidad = ordenes7.map((orden7) => orden7.Cantidad);

        const estadistica7 = new Chart(ord, {
            type: "bar",
            data: {
            labels: ordenesCantidad,
            datasets: [
                {
                label: "Órdenes producto",
                data: cantidad,
                backgroundColor: "rgba(51, 214, 18, 0.843)",
                borderColor: "rgba(51, 214, 18, 0)",
                borderWidth: 1,
                },
            ],
            },
            options: {
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });

        setMyChart7(estadistica7);
        }
    }, [ordenes7]);

    const generarReporteAlmacenImg7 = async () => {
        try {
        const canvas = await html2canvas(document.getElementById("myChart7"));
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        pdf.text("Reporte de top de órdenes", 50, 10);
        pdf.addImage(imgData, "PNG", 10, 20, 120, 120);

        fetch("http://localhost:5000/estadisticas/ordenesporproductoymes")
            .then((response) => response.json())
            .then((ordenes7) => {
            let y = 150;

            ordenes7.forEach((orden) => {
                pdf.text(`Nombre: ${orden.NombreC}`, 20, y);
                pdf.text(`Top de órdenes: ${orden.Cantidad}`, 20, y + 10);

                y += 30;
                if (y >= 280) {
                pdf.addPage();
                y = 15;
                }
            });

            pdf.save("reporte_ordenes_por_producto_mes.pdf");
            });
        } catch (error) {
        console.error("Error al generar el reporte con imagen:", error);
        }
    };


    return (
        <div>
        <Header rol={rol} />
        <Container className="margen-conten" responsive>
            <Row className="g-3">
            <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">
                    Cantidad de órdenes por año
                    </Card.Title>
                    <canvas id="myChart" height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg1}>
                    Imprimir PDF
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">
                    Cantidad de órdenes por mes
                    </Card.Title>
                    <canvas id="myChart2" height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg0}>
                    Imprimir PDF
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">Cantidad de órdenes por dia</Card.Title>
                    <canvas id="myChart3" height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg3}>
                    Imprimir PDF
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">Cantidad de órdenes totales por pedido</Card.Title>
                    <canvas id="myChart4" height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg4}>
                    Imprimir PDF
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">Cantidad de órdenes totales por pedido anio</Card.Title>
                    <canvas id="myChart5" height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg5}>
                    Imprimir PDF
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">Top órdenes totales</Card.Title>
                    <canvas id="myChart6" height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg6}>
                    Imprimir PDF
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">Órdenes por producto/mes</Card.Title>
                    <canvas id="myChart7" height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg7}>
                    Imprimir PDF
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
        </div>
    );
    }

    export default Estadisticas;
