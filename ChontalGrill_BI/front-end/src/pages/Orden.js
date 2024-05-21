import React , { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel, Table } from 'react-bootstrap';
import { FaSearch, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Header from '../components/Header';
import '../styles/App.css';

function Orden({ rol }) {

    const [formData, setFormData] = useState({
        ID_Cliente: '',
        ID_Empleado: '',
        ID_Menu: '',
        Precio: ''
    });

    const [Cantidad, setCantidad] = useState('');
    const [Estado, setEstado] = useState('');

    const [tipoOrdenes, setTipoOrden] = useState([]);
    const [Id_Tipo_Orden, setIdTipoOrden] = useState(''); 

    const [metodoPagos, setMetodoPago] = useState([]);
    const [ID_Metodo_Pago, setIDMetodoPago] = useState(''); 

    const [empleados, setEmpleados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [menus, setMenus] = useState([]);

    const [detallesOrden, setDetallesOrden] = useState([]);

    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
    const [showMenuModal, setShowMenuModal] = useState(false);

    const [selectedCliente, setSelectedCliente] = useState(null);
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const loadTipoOrden = () => {
        fetch('http://localhost:5000/detalle_orden/readTipoOrden')
            .then((response) => response.json())
            .then((data) => setTipoOrden(data))
            .catch((error) => console.error('Error al obtener los tipos de orden:', error));
        };

        const loadMetodoPago = () => {
            fetch('http://localhost:5000/detalle_orden/readMetodoPago')
                .then((response) => response.json())
                .then((data) => setMetodoPago(data))
                .catch((error) => console.error('Error al obtener los metodos de pago:', error));
            };

            useEffect(() => {
            loadTipoOrden();
            loadMetodoPago();
        }, []);

    const AgregarDetalleOrden = () => {
        if (selectedMenu && Cantidad) {
            const nuevoDetalle = {
                ID_Menu: selectedMenu.ID_Menu,
                Nombre: selectedMenu.Nombre,
                Precio: selectedMenu.Precio,
                Cantidad: Cantidad
            };
            setDetallesOrden([...detallesOrden, nuevoDetalle]);
            setCantidad('');
            setSelectedMenu('');
            } else {
            alert('Asegúrese de selecionar un menu o ingresar una cantidad.');
            }
        };
        
        const EliminarDetalle = (ID_Menu) => {
            const detallesActualizados = detallesOrden.filter(detalle => detalle.ID_Menu !== ID_Menu);
            setDetallesOrden(detallesActualizados);
        };

        const getCurrentTime = () => {
            const now = new Date();
            const Fecha_Hora = now.toISOString().split('T')[0];
            return { Fecha_Hora};
            };

        const filteredClientes = clientes.filter((cliente) => {
            // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
            const idcliente = cliente.ID_Cliente;
            const nombres = cliente.Nombres.toLowerCase(); 
            const search = searchQuery.toLowerCase();
            
            // Verifica si la cadena de búsqueda se encuentra en algún campo
            return (
                idcliente === (search) ||
                nombres.includes(search)
                );
            });

              //Manejo de carga y selección de Clientes --------------------------------------
    const loadClientes = () => {
        fetch('http://localhost:5000/detalle_orden/readCliente')
        .then((response) => response.json())
        .then((data) => setClientes(data))
        .catch((error) => console.error('Error al obtener los clientes:', error));
    };

    //Control de apertura de modal de Clientes
    const openClienteModal = () => {
        setShowClienteModal(true);
    };

    //Control de clierre de modal de Clientes
    const closeClienteModal = () => {
        setShowClienteModal(false);
        setSearchQuery('');
    };

    //Actualización de valor de variable de estado de Cliente selecionado
    const selectCliente = (cliente) => {
        setSelectedCliente(cliente);
        setFormData({
        ...formData,
        ID_Cliente: cliente.ID_Cliente,
        });
        closeClienteModal();
    };

    const filteredEmpleados = empleados.filter((empleado) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const idempleado = empleado.ID_Empleado;
        const nombres = empleado.Nombres.toLowerCase(); 
        const search = searchQuery.toLowerCase();
        
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
            idempleado === (search) ||
            nombres.includes(search)
            );
        });

          //Manejo de carga y selección de Clientes --------------------------------------
    const loadEmpleados = () => {
        fetch('http://localhost:5000/detalle_orden/readEmpleado')
        .then((response) => response.json())
        .then((data) => setEmpleados(data))
        .catch((error) => console.error('Error al obtener los empleados:', error));
    };

    //Control de apertura de modal de Clientes
    const openEmpleadoModal = () => {
        setShowEmpleadoModal(true);
    };

    //Control de clierre de modal de Clientes
    const closeEmpleadoModal = () => {
        setShowEmpleadoModal(false);
        setSearchQuery('');
    };

    //Actualización de valor de variable de estado de Cliente selecionado
    const selectEmpleado = (empleado) => {
        setSelectedEmpleado(empleado);
        setFormData({
        ...formData,
        ID_Empleado: empleado.ID_Empleado,
        });
        closeEmpleadoModal();
    };

    const filteredMenus = menus.filter((menu) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const idmenu = menu.ID_Menu;
        const nombre = menu.Nombre.toLowerCase(); 
        const search = searchQuery.toLowerCase();
        
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
            idmenu === (search) ||
            nombre.includes(search)
            );
        });

          //Manejo de carga y selección de Clientes --------------------------------------
    const loadMenus = () => {
        fetch('http://localhost:5000/detalle_orden/readMenu')
        .then((response) => response.json())
        .then((data) => setMenus(data))
        .catch((error) => console.error('Error al obtener los menus:', error));
    };

    //Control de apertura de modal de Clientes
    const openMenuModal = () => {
        setShowMenuModal(true);
    };

    //Control de clierre de modal de Clientes
    const closeMenuModal = () => {
        setShowMenuModal(false);
        setSearchQuery('');
    };

    //Actualización de valor de variable de estado de Cliente selecionado
    const selectMenu = (menu) => {
        setSelectedMenu(menu);
        setFormData({
        ...formData,
        ID_Menu: menu.ID_Menu,
        Precio:menu.Precio,
        });
        closeMenuModal();
    };

      //Carga de datos de Clientes, Empleados y Productos
    useEffect(() => {
    loadClientes ();
    loadEmpleados();
    loadMenus();
    }, []);

    const registrarOrden = () => {
        const { Fecha_Hora } = getCurrentTime(); // Obtener fecha actual
        if (selectedCliente && selectedEmpleado && detallesOrden.length > 0) {
            const data = {
            Fecha_Hora: Fecha_Hora,
            ID_Cliente: selectedCliente.ID_Cliente,
            ID_Empleado: selectedEmpleado.ID_Empleado,
            Id_Tipo_Orden: Id_Tipo_Orden,
            ID_Metodo_Pago: ID_Metodo_Pago,
            Estado: Estado,
            detalle: detallesOrden
            };
        
            fetch('http://localhost:5000/detalle_orden/CreateOrden', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                if (response.ok) {
                    // Aquí puedes mostrar un mensaje de éxito o reiniciar los estados
                    console.log('Orden registrada con éxito');
                    alert('¡Orden registrada con éxito!');
                    setIdTipoOrden ('');
                    setIDMetodoPago('');
                    setEstado('');
                    setDetallesOrden([]);
                    // Limpia otros estados según sea necesario
                } else {
                    // Aquí maneja el caso de error en la petición
                    console.error('Error al registrar la orden');
                }
                })
                .catch((error) => {
                // Aquí maneja los errores de red u otros
                console.error('Error en la solicitud:', error);
                });
            } else {
            alert('Asegúrese de completar la información necesaria para registrar la orden.');
            }
        };

        return(
            <div>
                <Header rol={ rol } />
            
                <Container className="margen-contenedor">
                    <Card className="global-margin-top">
                    <Card.Body>
                        <Card.Title className="mt-3 title">Registro de Orden</Card.Title>
                        <Form className="mt-3" >
                        <Row className="g-3">
            
                            <Col sm="12" md="4" lg="4">
                            <FloatingLabel controlId="ID_liente" label="Cliente">
                                <Form.Control
                                type="text"
                                placeholder="Seleccionar Cliente"
                                name="ID_Cliente"
                                value={selectedCliente ? selectedCliente.Nombres : ''}
                                readOnly
                                />
                                <div className="button-container">
                                <Button className="botones" variant="outline-primary" onClick={openClienteModal}>
                                    <FaSearch />
                                </Button>
                                </div>
                            </FloatingLabel>
                            </Col>
            
                            <Col sm="12" md="4" lg="4">
                            <FloatingLabel controlId="ID_Empleado" label="Empleado">
                                <Form.Control
                                type="text"
                                placeholder="Seleccionar Empleado"
                                name="ID_Empleado"
                                value={selectedEmpleado ? selectedEmpleado.Nombres : ''}
                                readOnly
                                />
                                <div className="button-container">
                                <Button className="botones" variant="outline-primary" onClick={openEmpleadoModal}>
                                    <FaSearch />
                                </Button>
                                </div>
                            </FloatingLabel>
                            </Col>
            
                            <Col sm="12" md="4" lg="4">
                            <FloatingLabel controlId="ID_Menu" label="Menú">
                                <Form.Control
                                type="text"
                                placeholder="Seleccionar Producto"
                                name="ID_Menu"
                                value={selectedMenu ? selectedMenu.Nombre : ''}
                                readOnly
                                />
                                <div className="button-container">
                                <Button className="botones" variant="outline-primary" onClick={openMenuModal}>
                                    <FaSearch />
                                </Button>
                                </div>
                            </FloatingLabel>
                            </Col>
            
                            <Col sm="12" md="2" lg="2" className="">
                            <FloatingLabel controlId="Cantidad" label="Cantidad">
                                <Form.Control 
                                type="number" 
                                placeholder="Cantidad"
                                value={Cantidad}
                                onChange={(e) => setCantidad(e.target.value)} 
                                />
                            </FloatingLabel>
                            </Col>
            
                            <Col sm="12" md="2" lg="2" className="d-flex align-items-center">
                            <Button onClick={AgregarDetalleOrden} variant="outline-success" size="lg">
                                <FaPlus />
                            </Button>
                            </Col>

                            <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Id_Tipo_Orden" label="Tipo de Orden">
                        <Form.Select
                        aria-label="Tipo de Orden"
                        value={Id_Tipo_Orden}
                        onChange={(e) => setIdTipoOrden(e.target.value)}
                        >
                        <option>Seleccione el tipo de orden</option>
                        {tipoOrdenes.map((tipoOrden) => (
                            <option key={tipoOrden.Id_Tipo_Orden} value={tipoOrden.Id_Tipo_Orden}>
                            {tipoOrden.Tipo}
                            </option>
                        ))}
                        </Form.Select>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="ID_Metodo_Pago" label="Método de Pago">
                        <Form.Select
                        aria-label="Método de Pago"
                        value={ID_Metodo_Pago}
                        onChange={(e) => setIDMetodoPago(e.target.value)}
                        >
                        <option>Seleccione el método de pago</option>
                        {metodoPagos.map((metodoPago) => (
                            <option key={metodoPago.ID_Metodo_Pago} value={metodoPago.ID_Metodo_Pago}>
                            {metodoPago.Descripcion}
                            </option>
                        ))}
                        </Form.Select>
                    </FloatingLabel>
                    </Col>


                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Estado" label="Estado">
                        <Form.Select 
                        aria-label="Estado"
                        value={Estado}
                        onChange={(e) => setEstado(e.target.value)}
                        >
                        <option>Seleccione el estado</option>
                        <option value="EN PROCESO">EN PROCESO</option>
                        <option value="COMPLETADA">COMPLETADA</option>
                        </Form.Select>
                    </FloatingLabel>
                    </Col>
            
                            <Col sm="12" md="1" lg="12">
                            <Card className="global-margin-top">
                                <Card.Body>
                                <Card.Title className="mt-3 title">Detalle de menús</Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {detallesOrden.map((detalle) => (
                                    <tr key={detalle.ID_Menu}>
                                        <td>{detalle.ID_Menu}</td>
                                        <td>{detalle.Nombre}</td>
                                        <td>C$ {detalle.Precio}</td>
                                        <td>{detalle.Cantidad} Unidades</td>
                                        <td>C$ {detalle.Cantidad * detalle.Precio}</td>
                                        <td className="align-button">
                                        <Button 
                                            size="sm"
                                            onClick={() => EliminarDetalle(detalle.ID_Menu)}
                                            variant="danger">
                                            
                                            <FaTrashAlt />
                                        </Button>
                                        </td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                </Card.Body>
                            </Card>
                            </Col>
            
                        </Row>
                        <div className="center-button">
                            <Button variant="outline-primary" onClick={registrarOrden} className="mt-3" size="lg">
                            Registrar
                            </Button>
                        </div>
                        </Form>
                    </Card.Body>
                    </Card>
                </Container>
            
                <Modal show={showClienteModal} onHide={closeClienteModal} centered scrollable size='md'>
                    <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row className="mb-3">
                        <Col sm="12" md="12" lg="12">
                        <FloatingLabel controlId="search" label="Buscar">
                            <Form.Control
                            type="text"
                            placeholder="Buscar"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            />
                        </FloatingLabel>
                        </Col>
                    </Row>
            
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredClientes.map((cliente) => (
                            <tr key={cliente.ID_Cliente} onClick={() => selectCliente(cliente)}>
                            <td>{cliente.Nombres}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Modal.Body>
                </Modal>

                <Modal show={showEmpleadoModal} onHide={closeEmpleadoModal} centered scrollable size='md'>
                    <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Empleado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row className="mb-3">
                        <Col sm="12" md="12" lg="12">
                        <FloatingLabel controlId="search" label="Buscar">
                            <Form.Control
                            type="text"
                            placeholder="Buscar"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            />
                        </FloatingLabel>
                        </Col>
                    </Row>
            
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredEmpleados.map((empleado) => (
                            <tr key={empleado.ID_Empleado} onClick={() => selectEmpleado(empleado)}>
                            <td>{empleado.Nombres}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Modal.Body>
                </Modal>

                <Modal show={showMenuModal} onHide={closeMenuModal} centered scrollable size='md'>
                    <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Menú</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Row className="mb-3">
                        <Col sm="12" md="12" lg="12">
                        <FloatingLabel controlId="search" label="Buscar">
                            <Form.Control
                            type="text"
                            placeholder="Buscar"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            />
                        </FloatingLabel>
                        </Col>
                    </Row>
            
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredMenus.map((menu) => (
                            <tr key={menu.ID_Menu} onClick={() => selectMenu(menu)}>
                            <td>{menu.Nombre}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </Modal.Body>
                </Modal>

                </div>
            );

    }
    
    export default Orden;