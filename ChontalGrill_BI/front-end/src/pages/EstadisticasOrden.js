import React, { useEffect, useState } from 'react';  // Importación de React, useEffect y useState desde 'react'
import Header from '../components/Header';  // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import jsPDF from 'jspdf';  
import Chart from 'chart.js/auto';  
import '../styles/App.css';  
import html2canvas from 'html2canvas';

    function Estadisticas({ rol }) {

        const [ordenes, setOrdenes] = useState([]); // Debes declarar una constante para cada gráfico para la declaración del estado 'ordenes' y su función 'setOrdenes' a través de useState, con un valor inicial de un array vacío

        const [myChart, setMyChart] = useState(null); // Declara del estado 'myChart' y su función 'setMyChart' a través de useState, con un valor inicial de 'null' para cada gráfico

         // Gráfico 2 //////////////////////////////////////////////////////////////////////////////////////////////
        useEffect(() => {
            fetch('http://localhost:5000/estadisticas/ordenestotalesporanio')  // Realiza una solicitud GET al servidor para obtener las órdenes
              .then((response) => response.json())  // Convierte la respuesta a formato JSON
              .then((data) => setOrdenes(data))  // Almacena las órdenes en el estado 'ordenes'
              .catch((error) => console.error('Error al obtener las órdenes:', error));  // Manejo de errores en caso de fallar la solicitud
        }, []);  
    
        useEffect(() => {
            if (ordenes.length > 0) {  //Define la constante que declaraste arribla 'ordenes'
              const ord = document.getElementById('myChart');  // Obtiene el elemento canvas con el ID 'myChart'
        
                if (myChart !== null) { //Define la constante según cada gráfico, ya sea 'myChart' o 'myChart1'
                    myChart.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
                }
    
        
                const año = ordenes.map((orden) => orden.Anio);  // Extrae las órdenes realizadas en el año
                const cantidad = ordenes.map((orden) => orden.Cantidad); // Extrae la cantidad total de órdenes por año
    
                const estadistica1 = new Chart(ord, {  // Crea un nuevo gráfico de tipo 'bar' o barras con Chart.js y le asignas el elemento canvas
                    type: 'bar',
                    data: {
                    labels: año,  // Asigna las órdenes como etiquetas para el eje X
                    datasets: [{
                      label: 'Cantidad de órdenes por año',  // Etiqueta para la leyenda del gráfico
                      data: cantidad,  // Asigna las cantidades de órdenes por año para la visualización
                      backgroundColor: 'rgba(51, 214, 18, 0.843)',  // Define el color de fondo de las barras, puede ser cualquiera
                      borderColor: 'rgba(51, 214, 18, 0)',  // Define el color del borde de las barras, del mismo color
                      borderWidth: 1  // Define el ancho del borde de las barras, como prefieraws
                    }]
                },
                options: {
                    scales: {
                    y: {
                        beginAtZero: true  // Comienza el eje Y desde cero
                    }
                    }
                }
                });
                setMyChart(estadistica1); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
            }
            }, [ordenes]);

            //Reporte 1
            const generarReporteAlmacenImg1 = async () => {
                try {
                     // Utiliza html2canvas para capturar el contenido del elemento con el ID 'myChart' y obtener un objeto canvas o gráfico en imagen
                    const canvas = await html2canvas(document.getElementById('myChart'));
                    // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
                    const pdf = new jsPDF();
                    const imgData = canvas.toDataURL('image/png');
                    // Añade un texto al documento PDF
                    pdf.text("Reporte de cantidad de órdenes por año", 50, 10);
                    // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
                    pdf.addImage(imgData, 'PNG', 10, 20, 120, 120);

                    fetch('http://localhost:5000/estadisticas/ordenestotalesporanio') // Realiza una solicitud GET al servidor para obtener las órdenes
                    .then((response) => response.json())  // Convierte la respuesta a formato JSON
                    .then((ordenes) => {
                    let y = 150; // Posición inicial en el eje Y dentro del documento PDF
            
                    ordenes.forEach((orden) => {  // Itera sobre las órdenes para generar el reporte
                        pdf.text(`Año: ${orden.Anio}`, 20, y);  // Agrega el año al documento PDF
                        pdf.text(`Cantidad total de órdenes por año: ${orden.Cantidad}`, 20, y + 10);  // Agrega la cantidad del órdenes por año al documento PDF
            
                        y += 30; // Incrementa la posición Y para la siguiente línea
                        if (y >= 280) { // Si alcanza el final de la página, crea una nueva página
                            pdf.addPage();
                        y = 15; // Reinicia la posición Y en la nueva página
                        }
                    });
            
                        pdf.save("reporte_ordenes_por_año.pdf");  // Descargar el documento PDF con el nombre 'reporte_ordenes_por_año.pdf'
                    })

                    } catch (error) {
                        // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
                    console.error('Error al generar el reporte con imagen:', error);
                    }
                };

                return(
                    <div>
                    <Header rol={ rol } />  
            
                    <Container className="margen-conten" responsive>
            
                    <Row className="g-3">
            
                            <Col sm="6" md="6" lg="6">
                            <Card>
                            <Card.Body>
                                <Card.Title className='title'>Cantidad de órdenes por año</Card.Title>
                                <canvas id="myChart"  height="120"></canvas>
                            </Card.Body>
                            <Card.Body>
                                <Button onClick={generarReporteAlmacenImg1}>
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

