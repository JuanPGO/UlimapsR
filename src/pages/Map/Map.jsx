// src/pages/Map/Map.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import 'react-toastify/dist/ReactToastify.css'

// Components
import LocationControl from '../../components/map/LocationControl.jsx'
import RoutingControl from '../../components/map/RoutingControl.jsx'
import MapPopup from '../../components/map/MapPopup.jsx'

// Hooks
import { useMap } from '../../hooks/useMap.js'

// Styles
import './Map.css'

// Configurar icono personalizado
const customIcon = new L.Icon({
    iconUrl: '/assets/images/botones/locationDot.png',
    iconSize: [25, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -32],
})

const Map = () => {
    const {
        puntosExteriores,
        estructuras,
        parqueaderos, // Agregar esta línea
        imagenes,
        userLocation,
        selectedDestination,
        activeMarkerId,
        loading,
        UNIVERSIDAD_COORDS,
        handleLocationFound,
        handleStartNavigation,
        handleCancelRoute,
        showInfoToast
    } = useMap()

    if (loading) {
        return (
            <div className="contenedor-bienvenidamap">
                <div className="loading-container">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando mapa...</span>
                    </div>
                    <p>Cargando mapa del campus...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="contenedor-bienvenidamap">
            {/* Header Navigation */}
            <div className="navegacionDiv">
                <div className="boton-regreso">
                    <Link to="/">
                        <FontAwesomeIcon 
                            icon={faArrowRightFromBracket} 
                            rotation={180} 
                            style={{ color: 'white' }}
                        />
                    </Link>
                </div>
            </div>

            {/* Map Container */}
            <div className="mapa">
                <MapContainer 
                    scrollWheelZoom={true} 
                    center={[UNIVERSIDAD_COORDS.lat, UNIVERSIDAD_COORDS.lng]} 
                    zoom={20}
                    className="mapa-container"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* Control de ubicación */}
                    <LocationControl 
                        onLocationFound={handleLocationFound} 
                        showInfoToast={showInfoToast}
                    />
                    
                    {/* Control de rutas */}
                    {userLocation && selectedDestination && (
                        <RoutingControl 
                            userLocation={userLocation} 
                            destination={selectedDestination}
                            onCancelRoute={handleCancelRoute}
                        />
                    )}

                    {/* Marcadores de puntos exteriores */}
                    {puntosExteriores.map((punto) => (
                        punto.activo && (
                            <Marker 
                                key={punto.id_punto_exterior}
                                position={[punto.latitud, punto.longitud]} 
                                icon={customIcon}
                            >
                                <Popup>
                                    <MapPopup
                                        punto={punto}
                                        estructura={estructuras[punto.id_punto_exterior]}
                                        parqueadero={parqueaderos[punto.id_punto_exterior]}
                                        imagen={imagenes[punto.id_punto_exterior]}
                                        selectedDestination={selectedDestination}
                                        activeMarkerId={activeMarkerId}
                                        onStartNavigation={handleStartNavigation}
                                    />
                                </Popup>
                            </Marker>
                        )
                    ))}
                </MapContainer>
            </div>

            {/* Footer Navigation */}
            <div className="navegacionDiv2">
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className="map-toast-container"
                    toastClassName="map-toast"
                />
            </div>
        </div>
    )
}

export default Map