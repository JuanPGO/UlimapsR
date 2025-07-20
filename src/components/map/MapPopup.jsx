// src/components/map/MapPopup.jsx
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faRoute } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const MapPopup = ({ punto, estructura, parqueadero, imagen, selectedDestination, activeMarkerId, onStartNavigation }) => {
  return (
    <div className="contenedorPop">
      <div className="headerPop">
        <span>{punto.nombre}</span>
      </div>
      <div className="bodyPop">
        {imagen ? (
          <div className="imagePop">
            <img 
              src={`/assets/images/fotos/exterior/${imagen.nombre}.jpg`} 
              alt={punto.nombre}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'flex'
              }}
            />
            <div className="placeholder-image" style={{ display: 'none' }}>
              Sin imagen disponible
            </div>
          </div>
        ) : (
          <div className="imagePop">
            <div className="placeholder-image">
              Sin imagen disponible
            </div>
          </div>
        )}
        
        <div className="infoPop">
          <div className="nomPop">
            {estructura && estructura.bloque ? (
              <span className="bloquePop">
                {estructura.bloque}
              </span>
            ) : parqueadero ? (
              <span className="parqueaderoPop">
                Parqueadero - {parqueadero.vehiculo}
              </span>
            ) : (
              <span>{punto.nombre}</span>
            )}
          </div>
          <div className="buttonPop">
            <Link 
              to={`/structure/${punto.id_punto_exterior}`} 
              className="boton-out no-underline"
            >
              <button>
                <FontAwesomeIcon icon={faInfo} />
                <span>Ver más</span>
              </button>
            </Link>
            {(!selectedDestination || activeMarkerId !== punto.id_punto_exterior) && (
              <button
                onClick={() => onStartNavigation(punto)}
                className="route-button"
              >
                <FontAwesomeIcon icon={faRoute} />
                <span>Ir aquí</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

MapPopup.propTypes = {
  punto: PropTypes.shape({
    id_punto_exterior: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    latitud: PropTypes.number.isRequired,
    longitud: PropTypes.number.isRequired
  }).isRequired,
  estructura: PropTypes.shape({
    bloque: PropTypes.string
  }),
  parqueadero: PropTypes.shape({
    vehiculo: PropTypes.string
  }),
  imagen: PropTypes.shape({
    nombre: PropTypes.string
  }),
  selectedDestination: PropTypes.object,
  activeMarkerId: PropTypes.number,
  onStartNavigation: PropTypes.func.isRequired
}

export default MapPopup