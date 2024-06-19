    import React, { useEffect, useState } from "react"; // Importación de React, useEffect y useState desde 'react'
    import Header from "../components/Header"; // Importación del componente Header desde la ruta '../components/Header'
    import { Button, Row, Col, Card, Container } from "react-bootstrap"; // Importación de componentes específicos desde 'react-bootstrap'
    import jsPDF from "jspdf";
    import Chart from "chart.js/auto";
    import "../styles/App.css";
    import html2canvas from "html2canvas";

    import emailjs from 'emailjs-com';
    import * as XLSX from 'xlsx';
    import { FaFilePdf } from "react-icons/fa6";
    import { MdEmail } from "react-icons/md";
    import { FaFileExcel  } from 'react-icons/fa6';

    function Estadisticas({ rol }) {
    const [ordenes, setOrdenes] = useState([]); // Debes declarar una constante para cada gráfico para la declaración del estado 'ordenes' y su función 'setOrdenes' a través de useState, con un valor inicial de un array vacío

    const [myChart, setMyChart] = useState(null); // Declara del estado 'myChart' y su función 'setMyChart' a través de useState, con un valor inicial de 'null' para cada gráfico


    const formatearOrdenestotalesporanio = (ordenesAnio) => {
        return ordenesAnio.map(ordenesAnio => {
        return `Anio: ${ordenesAnio.Anio} \nCantidad: ${ordenesAnio.Cantidad}`;
        }).join('\n\n');
    };

    const enviarCorreo = () => {
    const ordenesAnioFormateadas = formatearOrdenestotalesporanio(ordenes);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
    to_name: 'Josh',
    user_email: 'rodriguezjosh2003@gmail.com',
    message: ordenesAnioFormateadas,
    };
    

        // Envía el correo utilizando EmailJS
        emailjs.send('service_2zxzlyq', 'template_27rchdp', data, 'g9W1Ko36LLty8H8d-')
        .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
        })
        .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
        });
    };


    const exportarAExcel = () => {
        // Convertir los datos JSON a una hoja de trabajo de Excel
        const worksheet = XLSX.utils.json_to_sheet(ordenes);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordenes');

            // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'Cantidad de órdenes por año.xlsx');
};

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
                backgroundColor: [
                   // "rgba(255, 99, 132, 0.7)",   // Rojo
                    "rgba(54, 162, 235, 0.7)",   // Azul
                  // "rgba(255, 206, 86, 0.7)",   // Amarillo
                  //  "rgba(75, 192, 192, 0.7)",   // Verde claro
                  //  "rgba(153, 102, 255, 0.7)",  // Púrpura
                  //  "rgba(255, 159, 64, 0.7)",   // Naranja
                  //  "rgba(199, 199, 199, 0.7)",  // Gris claro
                  //  "rgba(83, 102, 255, 0.7)",   // Azul medio
                  //  "rgba(244, 67, 54, 0.7)",    // Rojo claro
                  //  "rgba(76, 175, 80, 0.7)",    // Verde
                  //  "rgba(255, 235, 59, 0.7)",   // Amarillo brillante
                  //  "rgba(121, 85, 72, 0.7)"     // Marrón
                ], // Define el color de fondo de las barras, puede ser cualquiera
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
        pdf.addImage(imgData, "PNG", 10, 20, 180, 120);

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

    const formatearordenespormesdeanio = (ordenes2) => {
        return ordenes2.map(orden2 => {
        return `Mes: ${orden2.Mes} \nCantidad: ${orden2.Cantidad}`;
        }).join('\n\n');
    };

    const enviarCorreo2 = () => {
    const ordenespormesdeanioFormateadas = formatearordenespormesdeanio(ordenes2);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
    to_name: 'Eliab',
    user_email: 'eliabjselvacruz51@gmail.com',
    message: ordenespormesdeanioFormateadas,
    };
    

        // Envía el correo utilizando EmailJS
        emailjs.send('service_2zxzlyq', 'template_27rchdp', data, 'g9W1Ko36LLty8H8d-')
        .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
        })
        .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
        });
    };

    const exportarAExcel2 = () => {
        // Convertir los datos JSON a una hoja de trabajo de Excel
        const worksheet = XLSX.utils.json_to_sheet(ordenes2);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordenes');

            // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'Cantidad de órdenes por mes.xlsx');
};

    //gráfico 2

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
                backgroundColor: [
                "rgba(153, 102, 255, 0.7)",  // Púrpura
                ],
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
        pdf.addImage(imgData, "PNG", 10, 20, 180, 120);

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


    const formatearordenespordiayanio = (ordenes3) => {
        return ordenes3.map(ordenes3 => {
        return `Dia: ${ordenes3.Dia} \nCantidad: ${ordenes3.Cantidad}`;
        }).join('\n\n');
    };

    const enviarCorreo3 = () => {
    const ordenespordiayanioFormateadas = formatearordenespordiayanio(ordenes3);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
    to_name: 'Josh',
    user_email: 'rodriguezjosh2003@gmail.com',
    message: ordenespordiayanioFormateadas,
    };
    

        // Envía el correo utilizando EmailJS
        emailjs.send('service_2zxzlyq', 'template_27rchdp', data, 'g9W1Ko36LLty8H8d-')
        .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
        })
        .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
        });
    };


    const exportarAExcel3 = () => {
        // Convertir los datos JSON a una hoja de trabajo de Excel
        const worksheet = XLSX.utils.json_to_sheet(ordenes3);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordenes');

            // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'Cantidad de órdenes por día.xlsx');
};


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
                backgroundColor: [
                    "rgba(255, 159, 64, 0.7)",   // Naranja
                ],
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
        pdf.addImage(imgData, "PNG", 10, 20, 180, 120);

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


    const formatearordenestotalesporpedido = (ordenes4) => {
        return ordenes4.map(ordenes4 => {
        return `ID_Menu: ${ordenes4.ID_Menu} \nNombre: ${ordenes4.Nombre} \nCantidad: ${ordenes4.Cantidad} \nMonto: ${ordenes4.Monto}`;
        }).join('\n\n');
    };

    const enviarCorreo4 = () => {
    const ordenestotalesporpedidoFormateadas = formatearordenestotalesporpedido(ordenes4);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
    to_name: 'Josh',
    user_email: 'rodriguezjosh2003@gmail.com',
    message: ordenestotalesporpedidoFormateadas,
    };
    

        // Envía el correo utilizando EmailJS
        emailjs.send('service_2zxzlyq', 'template_27rchdp', data, 'g9W1Ko36LLty8H8d-')
        .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
        })
        .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
        });
    };

    const exportarAExcel4 = () => {
        // Convertir los datos JSON a una hoja de trabajo de Excel
        const worksheet = XLSX.utils.json_to_sheet(ordenes4);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordenes');

            // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'Cantidad de órdenes totales por pedido.xlsx');
};

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
                backgroundColor: [
                    "rgba(76, 175, 80, 0.7)",    // Verde
                ],
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
        pdf.addImage(imgData, "PNG", 10, 20, 180, 120);

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


    const formatearordenesporproductoymes = (ordenes5) => {
        return ordenes5.map(ordenes5 => {
        return `Nombre: ${ordenes5.Nombre} \nCantidad: ${ordenes5.Cantidad} \nMes: ${ordenes5.Mes}`;
        }).join('\n\n');
    };

    const enviarCorreo5 = () => {
    const ordenesporproductoymesFormateadas = formatearordenesporproductoymes(ordenes5);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
    to_name: 'Josh',
    user_email: 'rodriguezjosh2003@gmail.com',
    message: ordenesporproductoymesFormateadas,
    };
    

        // Envía el correo utilizando EmailJS
        emailjs.send('service_2zxzlyq', 'template_27rchdp', data, 'g9W1Ko36LLty8H8d-')
        .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
        })
        .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
        });
    };

    const exportarAExcel5 = () => {
        // Convertir los datos JSON a una hoja de trabajo de Excel
        const worksheet = XLSX.utils.json_to_sheet(ordenes5);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordenes');

            // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, 'Cantidad de órdenes totales por pedido.xlsx');
};

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
            type: "bar",
            data: {
            labels: nombreC,
            datasets: [
                {
                label: "Cantidad de órdenes totales por año",
                data: cantidad,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.7)",   // Rojo
                ],
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
        pdf.addImage(imgData, "PNG", 10, 20, 180, 120);

        fetch("http://localhost:5000/estadisticas/ordenesporproductoymes2")
            .then((response) => response.json())
            .then((ordenes5) => {
            let y = 150;

            ordenes5.forEach((orden) => {
                pdf.text(`Nombre: ${orden.Nombre}`, 20, y);
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




    return (
        <div>
        <Header rol={rol} />
        <Container className="margen-conten" responsive>
            <Row className="g-3">
            <Col sm="12" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">
                    Cantidad de órdenes por año
                    </Card.Title>
                    <canvas id="myChart" height="120"></canvas>
                </Card.Body>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Button onClick={generarReporteAlmacenImg1} style={{ background: 'red' }}>
                    <FaFilePdf style={{ color: 'white' }} />
                    </Button>
                    <Button style={{ marginLeft: '6px' }} onClick={enviarCorreo} >
                    <MdEmail style={{ color: 'white' }}/>
                    </Button>
                    <Button variant="success" onClick={exportarAExcel} className="m-1">
                        <FaFileExcel style={{ color: 'white' }} />
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="12" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">
                    Cantidad de órdenes por mes
                    </Card.Title>
                    <canvas id="myChart2" height="120"></canvas>
                </Card.Body>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Button onClick={generarReporteAlmacenImg0} style={{ background: 'red' }}>
                    <FaFilePdf style={{ color: 'white' }} />
                    </Button>
                    <Button style={{ marginLeft: '6px' }} onClick={enviarCorreo2} >
                    <MdEmail style={{ color: 'white' }}/>
                    </Button>
                    <Button variant="success" onClick={exportarAExcel2} className="m-1">
                        <FaFileExcel style={{ color: 'white' }} />
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="12" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">Cantidad de órdenes por dia</Card.Title>
                    <canvas id="myChart3" height="120"></canvas>
                </Card.Body>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Button onClick={generarReporteAlmacenImg3} style={{ background: 'red' }}>
                    <FaFilePdf style={{ color: 'white' }} />
                    </Button>
                    <Button style={{ marginLeft: '6px' }} onClick={enviarCorreo3} >
                    <MdEmail style={{ color: 'white' }}/>
                    </Button>
                    <Button variant="success" onClick={exportarAExcel3} className="m-1">
                        <FaFileExcel style={{ color: 'white' }} />
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="12" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className="title">Cantidad de órdenes totales por pedido</Card.Title>
                    <canvas id="myChart4" height="120"></canvas>
                </Card.Body>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Button onClick={generarReporteAlmacenImg4} style={{ background: 'red' }}>
                    <FaFilePdf style={{ color: 'white' }} />
                    </Button>
                    <Button style={{ marginLeft: '6px' }} onClick={enviarCorreo4} >
                    <MdEmail style={{ color: 'white' }}/>
                    </Button>
                    <Button variant="success" onClick={exportarAExcel4} className="m-1">
                        <FaFileExcel style={{ color: 'white' }} />
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm="12" md="12" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title className="title">Top 15 Cantidad de órdenes totales por pedido/Año</Card.Title>
                    <canvas id="myChart5" height="120"></canvas>
                </Card.Body>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Button onClick={generarReporteAlmacenImg5} style={{ background: 'red' }}>
                    <FaFilePdf style={{ color: 'white' }} />
                    </Button>
                    <Button style={{ marginLeft: '6px' }} onClick={enviarCorreo5} >
                    <MdEmail style={{ color: 'white' }}/>
                    </Button>
                    <Button variant="success" onClick={exportarAExcel5} className="m-1">
                        <FaFileExcel style={{ color: 'white' }} />
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
