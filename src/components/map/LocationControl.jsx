import { useMap } from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import L from 'leaflet'
import PropTypes from 'prop-types'

const LocationControl = ({ onLocationFound, showInfoToast }) => {
  const map = useMap()

  const handleLocationClick = () => {
    map.locate({
      setView: true,
      maxZoom: 18
    })

    // Eliminar los listeners existentes antes de agregar nuevos
    map.off('locationfound')
    map.off('locationerror')
    
    map.on('locationfound', (e) => {
      showInfoToast("Buscando ubicación...")
      onLocationFound(e.latlng)
      
      const radius = e.accuracy / 2
      
      // Limpiar marcadores anteriores
      map.eachLayer((layer) => {
        if (layer._type === 'userLocation') {
          map.removeLayer(layer)
        }
      })

      const locationMarker = L.marker(e.latlng, {
        icon: L.divIcon({
          html: '<div style="background-color: #2563eb; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
          className: 'user-location-marker'
        })
      })
      locationMarker._type = 'userLocation'
      
      const accuracyCircle = L.circle(e.latlng, {
        radius: radius,
        color: '#2563eb',
        fillColor: '#2563eb',
        fillOpacity: 0.15,
        weight: 1
      })
      accuracyCircle._type = 'userLocation'

      locationMarker.addTo(map)
      accuracyCircle.addTo(map)
    })
    
    map.on('locationerror', (e) => {
      console.error('Error de ubicación:', e.message)
      showInfoToast('No se pudo obtener tu ubicación. Asegúrate de haber dado permisos de ubicación.')
    })
  }

  return (
    <div className="leaflet-control-container">
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control leaflet-bar">
          <button
            onClick={handleLocationClick}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
            title="Mi ubicación"
          >
            <FontAwesomeIcon icon={faLocationCrosshairs} className="text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

LocationControl.propTypes = {
  onLocationFound: PropTypes.func.isRequired,
  showInfoToast: PropTypes.func.isRequired
}

export default LocationControl