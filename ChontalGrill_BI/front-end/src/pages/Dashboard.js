import Header from '../components/Header';  // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import '../styles/App.css';  

function Dashboard({ rol }) {  // Declaración del componente Estadisticas con el argumento 'rol'

const imprimirEstadisticas = () => {
    console.log("Imprimiendo estadísticas...");
    }

    return(
        <div>
        <Header rol={ rol } />  

        <Container className="margen-conten" responsive>

            <Row className="g-3 justify-content-center">
            
            <Col sm="12" md="12" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title>Estado ChontalGrill</Card.Title>

                    <div className="d-flex justify-content-center">
                        <iframe title="REPORTE CHONTALGRILL" width="1024" height="804" 
    src="https://app.fabric.microsoft.com/view?r=eyJrIjoiMjdlMjI3OTYtOTM0Mi00MzcxLThiZTQtYWRkNjM3YmYyMjlhIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>
                    </div>

                    <Button onClick={imprimirEstadisticas}>
                    Generar reporte con imagen
                    </Button>
                </Card.Body>
                </Card>
            </Col>

            </Row>
        </Container>

        </div>
    );
    }

    export default Dashboard; // Exporta el componente Estadisticas para su uso en otras partes de la aplicación
