import { useState } from 'react';
import './CRUD.css';
import { useNavigate } from 'react-router-dom';
import { Nav, NavDropdown, Table, Pagination, Modal, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faKey, faMapLocationDot, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCRUD } from '../../hooks/useCRUD.js';
import { useAuth } from '../../context/AuthContext.jsx';

const CRUD = () => {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const {
        datos,
        loading,
        tipoSeleccionado,
        tituloSeleccionado,
        tiposOptions,
        puntoExtOptions,
        estructuraOptions,
        pisoOptions,
        tiposVOptions,
        crearItem,
        actualizarItem,
        eliminarItem,
        cambiarEstado,
        handleSelectChange
    } = useCRUD();

    // Estados locales para UI
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // Configuraciones
    const encabezados = {
        '1.1': ['ID', 'Nombre', 'Latitud', 'Longitud', 'Activo'],
        '1.2': ['ID', 'Estructura', 'Nombre', 'Tipo'],
        '1.3': ['ID', 'Nombre', 'Vehiculo', 'Tipo'],
        '1.4': ['ID', 'Nivel', 'Estructura', 'Punto Exterior', 'Plano'],
        '1.5': ['ID', 'Nombre', 'Activo', 'Tipo', 'Estructura', 'Plano'],
        '1.6': ['ID', 'Nombre', 'Punto Exterior']
    };

    const formFields = {
        '1.1': [
            { name: 'ID', type: 'number', key: 'id'},
            { name: 'Nombre', type: 'text', key: 'nombre' },
            { name: 'Latitud', type: 'number', key: 'latitud'},
            { name: 'Longitud', type: 'number', key: 'longitud'},
            { name: 'Activo', type: 'select', key: 'activo', options: [
                { value: true, label: 'Activo' },
                { value: false, label: 'Inactivo' }
            ]},
            { name: 'ID Mapa', type: 'select', key: 'id_mapa', options: [
                { value: 1, label: 'Mapa Principal' }
            ]}
        ],
        '1.2': [
            { name: 'ID', type: 'number', key: 'id'},
            { name: 'Bloque', type: 'text', key: 'bloque' },
            { name: 'Punto Exterior', type: 'select', key: 'nombre', options: puntoExtOptions.map(pe => ({ value: pe.nombre, label: pe.nombre }))},
            { name: 'Tipo', type: 'select', key: 'nombre_tipo', options: tiposOptions.map(t => ({ value: t.nombre_tipo, label: t.nombre_tipo })) }
        ],
        '1.3': [
            { name: 'ID', type: 'number', key: 'id'},
            { name: 'Punto Exterior', type: 'select', key: 'nombre', options: puntoExtOptions.map(pe => ({ value: pe.nombre, label: pe.nombre }))},
            { name: 'Vehiculo', type: 'select', key: 'vehiculo', options: tiposVOptions.map(t => ({ value: t.vehiculo, label: t.vehiculo })) },
            { name: 'Tipo', type: 'select', key: 'nombre_tipo', options: tiposOptions.map(t => ({ value: t.nombre_tipo, label: t.nombre_tipo })) }
        ],
        '1.4': [
            { name: 'ID', type: 'number', key: 'id'},
            { name: 'Nivel', type: 'text', key: 'nivel' },
            { name: 'Estructura', type: 'select', key: 'bloque', options: estructuraOptions.map(es => ({ value: es.bloque, label: es.bloque }))},
            { name: 'Plano', type: 'text', key: 'plano' }
        ],
        '1.5': [
            { name: 'ID', type: 'number', key: 'id'},
            { name: 'Nombre', type: 'text', key: 'nombre' },
            { name: 'Activo', type: 'select', key: 'activo', options: [
                { value: true, label: 'Activo' },
                { value: false, label: 'Inactivo' }
            ]},
            { name: 'Tipo', type: 'select', key: 'nombre_tipo', options: tiposOptions.map(t => ({ value: t.nombre_tipo, label: t.nombre_tipo })) },
            { name: 'Plano', type: 'select', key: 'plano', options: pisoOptions.map(pi => ({ value: pi.plano, label: pi.plano }))}
        ],
        '1.6': [
            { name: 'ID', type: 'number', key: 'id'},
            { name: 'Nombre', type: 'text', key: 'nombre' },
            { name: 'Punto Exterior', type: 'select', key: 'puntoExterior', options: puntoExtOptions.map(pe => ({ value: pe.nombre, label: pe.nombre }))}
        ]
    };

    // Lógica de paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(datos.length / itemsPerPage);

    // Manejadores
    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    const handleShowModal = () => {
        const initialFormData = {};
        formFields[tipoSeleccionado].forEach(field => {
            initialFormData[field.key] = '';
        });
        setFormData(initialFormData);
        setFormErrors({});
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleShowEditModal = (item) => {
        setSelectedItem(item);
        const formattedData = {};
        Object.keys(item).forEach(key => {
            formattedData[key] = item[key];
        });
        setFormData(formattedData);
        setFormErrors({});
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);

    const handleShowDeleteModal = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? e.target.checked : value
        }));
    };

    const validateForm = (data, fields) => {
        const errors = {};
        fields.forEach(field => {
            if (!data[field.key] && data[field.key] !== 0 && data[field.key] !== false) {
                errors[field.key] = 'Este campo es requerido';
            }
        });
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm(formData, formFields[tipoSeleccionado]);
        if (!isValid) return;

        const result = await crearItem(formData);
        if (result.success) {
            handleCloseModal();
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm(formData, formFields[tipoSeleccionado]);
        if (!isValid) return;

        const result = await actualizarItem(selectedItem.id, formData);
        if (result.success) {
            handleCloseEditModal();
        }
    };

    const handleDelete = async () => {
        const result = await eliminarItem(itemToDelete.id);
        if (result.success) {
            handleCloseDeleteModal();
        }
    };

    const handleChangeEstado = async (item) => {
        // Verificar que el item tenga un ID válido
        const itemId = item.id || item.id_punto_exterior || item.id_punto_interior;
        
        if (!itemId) {
            toast.error('Error: ID del elemento no encontrado');    
            return;
        }
        
        const nuevoEstado = item.activo === true ? false : true;
        await cambiarEstado(itemId, nuevoEstado);
    };

    const renderFormField = (field, isEdit = false) => {
        const value = formData[field.key] || '';
        const error = formErrors[field.key];

        if (field.type === 'select') {
            return (
                <Form.Group key={field.key} className="mb-3">
                    <Form.Label>{field.name}</Form.Label>
                    <Form.Select
                        name={field.key}
                        value={value}
                        onChange={handleInputChange}
                        isInvalid={!!error}
                        disabled={isEdit && field.name === 'ID'}
                    >
                        <option value="">Seleccione {field.name}</option>
                        {field.options?.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                </Form.Group>
            );
        }

        return (
            <Form.Group key={field.key} className="mb-3">
                <Form.Label>{field.name}</Form.Label>
                <Form.Control
                    type={field.type}
                    name={field.key}
                    value={value}
                    onChange={handleInputChange}
                    isInvalid={!!error}
                    disabled={isEdit && field.name === 'ID'}
                    step={field.type === 'number' ? 'any' : undefined}
                />
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </Form.Group>
        );
    };

    return (
        <div className="contenedorCrud">
            {/* Header */}
            <div className="navHeader">
                <Nav className="me-auto">
                    <NavDropdown title={<FontAwesomeIcon icon={faBars} />} id="nav-dropdown">
                        <NavDropdown.Item eventKey="1.1" onClick={() => handleSelectChange('1.1')}>
                            Puntos Interes Exterior
                        </NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.2" onClick={() => handleSelectChange('1.2')}>
                            Estructuras
                        </NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.3" onClick={() => handleSelectChange('1.3')}>
                            Parqueaderos
                        </NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.4" onClick={() => handleSelectChange('1.4')}>
                            Pisos
                        </NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.5" onClick={() => handleSelectChange('1.5')}>
                            Puntos Interes Interior
                        </NavDropdown.Item>
                        <NavDropdown.Item eventKey="1.6" onClick={() => handleSelectChange('1.6')}>
                            Imágenes
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <div className="navTitulo">
                    <h1>{tituloSeleccionado}</h1>
                </div>

                <div className="navExit">
                    <FontAwesomeIcon 
                        icon={faMapLocationDot} 
                        className="me-3" 
                        style={{ cursor: 'pointer', color: 'white' }}
                        onClick={() => navigate('/map')}
                    />
                    <FontAwesomeIcon 
                        icon={faArrowRightFromBracket} 
                        style={{ cursor: 'pointer', color: 'white' }}
                        onClick={handleLogout}
                    />
                </div>
            </div>

            {/* Contenido principal */}
            <div className="crudContent">
                {/* Botón crear */}
                <div className="mb-3">
                    <Button variant="success" onClick={handleShowModal}>
                        Crear {tituloSeleccionado}
                    </Button>
                </div>

                {/* Tabla */}
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    {encabezados[tipoSeleccionado]?.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        {Object.values(item).map((value, i) => (
                                            <td key={i}>
                                                {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value}
                                            </td>
                                        ))}
                                        <td>
                                            <FontAwesomeIcon 
                                                icon={faPen} 
                                                className="me-2" 
                                                style={{ cursor: 'pointer', color: '#007bff' }}
                                                onClick={() => handleShowEditModal(item)}
                                            />
                                            {(['1.1', '1.5'].includes(tipoSeleccionado)) && (
                                                <FontAwesomeIcon 
                                                    icon={faKey} 
                                                    className="me-2" 
                                                    style={{ cursor: 'pointer', color: item.activo ? '#28a745' : '#dc3545' }}
                                                    onClick={() => handleChangeEstado(item)}
                                                />
                                            )}
                                            <FontAwesomeIcon 
                                                icon={faTrash} 
                                                style={{ cursor: 'pointer', color: '#dc3545' }}
                                                onClick={() => handleShowDeleteModal(item)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Paginación */}
                        <Pagination className="justify-content-center">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Pagination.Item
                                    key={i + 1}
                                    active={i + 1 === currentPage}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </>
                )}
            </div>

            {/* Modal Crear */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Crear {tituloSeleccionado}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreateSubmit}>
                    <Modal.Body>
                        {formFields[tipoSeleccionado]?.map(field => renderFormField(field))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Creando...' : 'Crear'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal Editar */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar {tituloSeleccionado}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        {formFields[tipoSeleccionado]?.map(field => renderFormField(field, true))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Actualizando...' : 'Actualizar'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal Eliminar */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro que desea eliminar este elemento?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={loading}>
                        {loading ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default CRUD;