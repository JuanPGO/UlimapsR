// src/components/map/RoutingControl.jsx
import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import L from 'leaflet'
import 'leaflet-routing-machine'
import PropTypes from 'prop-types'

const RoutingControl = ({ userLocation, destination, onCancelRoute }) => {
  const map = useMap()
  const routingControlRef = useRef(null)

  useEffect(() => {
    if (!userLocation || !destination) return

    // Limpiar cualquier control de ruta existente
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current)
    }

    // Crear nuevo control de ruta
    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(destination.lat, destination.lng)
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      createMarker: () => null, // No crear marcadores automáticos
      lineOptions: {
        styles: [{ 
          color: '#2563eb', 
          weight: 4, 
          opacity: 0.7 
        }]
      },
      show: false, // No mostrar instrucciones
      autoRoute: true
    }).addTo(map)

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current)
        routingControlRef.current = null
      }
    }
  }, [map, userLocation, destination])

  const handleCancelRoute = () => {
    // Limpiar control de ruta
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current)
      routingControlRef.current = null
    }

    // Eliminar todas las capas de ruta del mapa
    map.eachLayer((layer) => {
      if (layer instanceof L.Routing.Control || layer instanceof L.Routing.Line) {
        map.removeLayer(layer)
      }
    })

    // Restablecer el mapa a su vista inicial
    map.setView([4.806004, -75.760249], 20)

    onCancelRoute()
  }

  return destination && (
    <div className="leaflet-control-container">
      <div className="leaflet-bottom leaflet-right">
        <div className="leaflet-control leaflet-bar">
          <button
            onClick={handleCancelRoute}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
            title="Cancelar ruta"
          >
            <FontAwesomeIcon icon={faTimes} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

RoutingControl.propTypes = {
  userLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  destination: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  onCancelRoute: PropTypes.func.isRequired
}

export default RoutingControl