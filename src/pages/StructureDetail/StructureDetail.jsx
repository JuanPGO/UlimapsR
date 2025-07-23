import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Carousel, CarouselItem, Tabs, Tab, Table, Pagination } from 'react-bootstrap'
import { useStructureDetail } from '../../hooks/useStructureDetail.jsx'
import './StructureDetail.css'

const StructureDetail = () => {
    const {
        puntoExterior,
        imagenes,
        pisos,
        soloMostrarFotos,
        loading,
        error,
        currentPage,
        currentItems,
        totalPages,
        paginate,
        renderTableRows
    } = useStructureDetail()

    // Función para calcular el rango de páginas a mostrar
    const getPageRange = (currentPage, totalPages, maxPagesToShow = 5) => {
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        
        // Ajustar si estamos muy cerca del final
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        return { startPage, endPage };
    };

    if (loading) {
        return (
            <div className="contenedorMore">
                <div className="loading-container-structure">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p>Cargando información de la estructura...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="contenedorMore">
                <div className="error-container">
                    <h3 className="text-light">Error</h3>
                    <p className="text-light">{error}</p>
                    <Link to="/map" className="btn btn-light">
                        Volver al mapa
                    </Link>
                </div>
            </div>
        )
    }

    if (!puntoExterior) {
        return (
            <div className="contenedorMore">
                <div className="error-container">
                    <h3 className="text-light">Estructura no encontrada</h3>
                    <Link to="/map" className="btn btn-light">
                        Volver al mapa
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="contenedorMore">
            {/* Header */}
            <div className="contenedor-interior5">
                <div className="mainTitulo">
                    <div className="boton-navEstructura">
                        <Link to="/map">
                            <FontAwesomeIcon 
                                icon={faArrowRightFromBracket} 
                                rotation={180} 
                                style={{ color: '#810613' }}
                            />
                        </Link>
                    </div>
                    <span>{puntoExterior.nombre}</span>
                </div>
            </div>

            {/* Content */}
            <div className="contenedor-interior6">
                {soloMostrarFotos ? (
                    // Si solo debe mostrar fotos (parqueaderos, canchas, entradas)
                    <Tabs defaultActiveKey="fotos" id="simple-tabs" className="mb-3 tabs" fill>
                        <Tab eventKey="fotos" title="Fotos" className="tab-pane">
                            {imagenes && imagenes.length > 0 ? (
                                <Carousel className="carouselContainerImages">
                                    {imagenes.map((imagen) => (
                                        <CarouselItem key={imagen.id_imagen}>
                                            <img 
                                                src={`/assets/images/fotos/exterior/${imagen.nombre}.jpg`} 
                                                className="d-block w-100" 
                                                alt={`Imagen ${imagen.id_imagen}`}
                                                onError={(e) => {
                                                    console.error(`Error loading image: ${imagen.nombre}`)
                                                    e.target.src = '/assets/images/placeholder.jpg'
                                                }}
                                            />
                                        </CarouselItem>
                                    ))}
                                </Carousel>
                            ) : (
                                <div className="no-images-placeholder">
                                    <span>No hay imágenes disponibles</span>
                                </div>
                            )}
                        </Tab>
                    </Tabs>
                ) : (
                    // Si es estructura completa, mostrar todas las tabs
                    <Tabs defaultActiveKey="fotos" id="structure-tabs" className="mb-3 tabs" fill>
                        {/* Tab de Fotos */}
                        <Tab eventKey="fotos" title="Fotos">
                            {imagenes && imagenes.length > 0 ? (
                                <Carousel className="carouselContainerImages">
                                    {imagenes.map((imagen) => (
                                        <CarouselItem key={imagen.id_imagen}>
                                            <img 
                                                src={`/assets/images/fotos/exterior/${imagen.nombre}.jpg`} 
                                                className="d-block w-100" 
                                                alt={`Imagen ${imagen.id_imagen}`}
                                                onError={(e) => {
                                                    console.error(`Error loading image: ${imagen.nombre}`)
                                                    e.target.src = '/assets/images/placeholder.jpg'
                                                }}
                                            />
                                        </CarouselItem>
                                    ))}
                                </Carousel>
                            ) : (
                                <div className="no-images-placeholder">
                                    <span>No hay imágenes disponibles</span>
                                </div>
                            )}
                        </Tab>

                        {/* Tab de Planos */}
                        <Tab eventKey="planos" title="Planos">
                            {pisos && pisos.length > 0 ? (
                                <Carousel className="carouselContainerPisos">
                                    {pisos.map((piso) => (
                                        <CarouselItem key={piso.id_piso}>
                                            <img 
                                                src={`/assets/images/fotos/interior/${piso.plano}.png`} 
                                                className="d-block w-100" 
                                                alt={`Plano piso ${piso.id_piso}`}
                                                onError={(e) => {
                                                    console.error(`Error loading floor plan: ${piso.plano}`)
                                                    e.target.src = '/assets/images/placeholder.jpg'
                                                }}
                                            />
                                            <h3>Piso: {piso.nivel || 'No especificado'}</h3>
                                        </CarouselItem>
                                    ))}
                                </Carousel>
                            ) : (
                                <div className="no-images-placeholder">
                                    <span>No hay planos disponibles</span>
                                </div>
                            )}
                        </Tab>

                        {/* Tab de Puntos de Interés */}
                        <Tab eventKey="puntosInteres" title="Puntos Interés">
                            <div className="table-container">
                                <div className="table-wrapper">
                                    <Table className="tablePuntos">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '10%' }} className="text-center">#</th>
                                                <th style={{ width: '15%' }} className="text-center">Tipo</th>
                                                <th style={{ width: '55%' }} className="text-center">Punto Interés</th>
                                                <th style={{ width: '15%' }} className="text-center">Piso</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderTableRows()}
                                            {currentItems.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        No hay puntos de interés disponibles
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                                
                                {/* Paginación Mejorada */}
                                {totalPages > 1 && (
                                    <div className="pagination-container">
                                        <Pagination>
                                            <Pagination.First 
                                                onClick={() => paginate(1)}
                                                disabled={currentPage === 1}
                                            />
                                            <Pagination.Prev 
                                                onClick={() => paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            />
                                            
                                            {/* Mostrar "..." si hay páginas antes del rango */}
                                            {(() => {
                                                const { startPage, endPage } = getPageRange(currentPage, totalPages);
                                                const pages = [];
                                                
                                                // Añadir "..." si startPage > 1
                                                if (startPage > 1) {
                                                    pages.push(
                                                        <Pagination.Ellipsis key="start-ellipsis" disabled />
                                                    );
                                                }
                                                
                                                // Añadir páginas en el rango
                                                for (let i = startPage; i <= endPage; i++) {
                                                    pages.push(
                                                        <Pagination.Item
                                                            key={i}
                                                            active={i === currentPage}
                                                            onClick={() => paginate(i)}
                                                        >
                                                            {i}
                                                        </Pagination.Item>
                                                    );
                                                }
                                                
                                                // Añadir "..." si endPage < totalPages
                                                if (endPage < totalPages) {
                                                    pages.push(
                                                        <Pagination.Ellipsis key="end-ellipsis" disabled />
                                                    );
                                                }
                                                
                                                return pages;
                                            })()}
                                            
                                            <Pagination.Next 
                                                onClick={() => paginate(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            />
                                            <Pagination.Last 
                                                onClick={() => paginate(totalPages)}
                                                disabled={currentPage === totalPages}
                                            />
                                        </Pagination>
                                    </div>
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                )}
            </div>
        </div>
    )
}

export default StructureDetail