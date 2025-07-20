// src/components/map/MapPopup.jsx
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faRoute } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const MapPopup = ({ 
  punto, 
  estructura, 
  imagen, 
  selectedDestination, 
  activeMarkerId, 
  onStartNavigation 
}) => {
  return (
    <div className="contenedorPop">
      <div className="headerPop">
        <span>{punto.nombre}</span>
      </div>
      <div className="bodyPop">
        <div className="imagePop">
          {imagen && imagen.nombre ? (
            <img 
              src={`/assets/images/fotos/exterior/${imagen.nombre}.jpg`} 
              alt={punto.nombre}
            />
          ) : (
            <div className="placeholder-image">
              <span>No hay imagen disponible</span>
            </div>
          )}
        </div>

        <div className="infoPop">
          <div className="nomPop">
            {estructura && estructura.bloque ? (
              <span className="bloquePop">
                {estructura.bloque}
              </span>
            ) : (
              <span>{punto.nombre}</span>
            )}
          </div>
          <div className="buttonPop">
            <Link 
              to={`/structure/${punto.id}`} 
              className="boton-out no-underline"
            >
              <button>
                <FontAwesomeIcon icon={faInfo} />
                <span>Ver más</span>
              </button>
            </Link>
            {(!selectedDestination || activeMarkerId !== punto.id) && (
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
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    latitud: PropTypes.number.isRequired,
    longitud: PropTypes.number.isRequired
  }).isRequired,
  estructura: PropTypes.shape({
    bloque: PropTypes.string
  }),
  imagen: PropTypes.shape({
    nombre: PropTypes.string
  }),
  selectedDestination: PropTypes.object,
  activeMarkerId: PropTypes.number,
  onStartNavigation: PropTypes.func.isRequired
}

export default MapPopup