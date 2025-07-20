import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { MapaService } from '../services/api/mapaService.js'

const UNIVERSIDAD_COORDS = { lat: 4.806004, lng: -75.760249 }
const MIN_DISTANCE = 300 // metros

export const useMap = () => {
  const [puntosExteriores, setPuntosExteriores] = useState([])
  const [estructuras, setEstructuras] = useState({})
  const [parqueaderos, setParqueaderos] = useState({}) // Agregar estado para parqueaderos
  const [imagenes, setImagenes] = useState({})
  const [userLocation, setUserLocation] = useState(null)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [activeMarkerId, setActiveMarkerId] = useState(null)
  const [loading, setLoading] = useState(true)

  // Funciones de toast
  const showErrorToast = useCallback((message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }, [])

  const showInfoToast = useCallback((message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: 'info-toast'
    })
  }, [])

  const showRouteInfoToast = useCallback((message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: 'route-toast'
    })
  }, [])

  // Calcular distancia entre dos puntos
  const calculateDistance = useCallback((point1, point2) => {
    const R = 6371e3 // Radio de la Tierra en metros
    const φ1 = point1.lat * Math.PI/180
    const φ2 = point2.lat * Math.PI/180
    const Δφ = (point2.lat - point1.lat) * Math.PI/180
    const Δλ = (point2.lng - point1.lng) * Math.PI/180

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return R * c
  }, [])

  // Manejar ubicación encontrada
  const handleLocationFound = useCallback((location) => {
    setUserLocation(location)
    showInfoToast("Ubicación encontrada")
  }, [showInfoToast])

  // Manejar inicio de navegación
  const handleStartNavigation = useCallback((punto) => {
    if (!userLocation) {
      showInfoToast('Por favor, activa tu ubicación primero')
      return
    }

    const distance = calculateDistance(userLocation, UNIVERSIDAD_COORDS)
    
    if (distance < MIN_DISTANCE) {
      showInfoToast('Si estás cerca o dentro de la Universidad te recomendamos preguntar o consultar nuestros puntos de interés')
      return
    }

    setSelectedDestination({
      lat: punto.latitud,
      lng: punto.longitud
    })
    setActiveMarkerId(punto.id_punto_exterior)
    showRouteInfoToast('Calculando ruta...')
  }, [userLocation, calculateDistance, showInfoToast, showRouteInfoToast])

  // Cancelar ruta
  const handleCancelRoute = useCallback(() => {
    setSelectedDestination(null)
    setActiveMarkerId(null)
    showInfoToast('Ruta cancelada')
  }, [showInfoToast])

  // Cargar datos del mapa
  const cargarDatosMapa = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await MapaService.cargarDatosMapa()
      
      if (error) {
        showErrorToast('Error al cargar datos del mapa')
        return
      }

      setPuntosExteriores(data.puntos || [])
      setEstructuras(data.estructuras || {})
      setParqueaderos(data.parqueaderos || {})
      setImagenes(data.imagenes || {})
    } catch (error) {
      console.error('Error:', error)
      showErrorToast('Error al cargar datos del mapa')
    } finally {
      setLoading(false)
    }
  }, [showErrorToast])

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatosMapa()
  }, [cargarDatosMapa])

  return {
    // Estado
    puntosExteriores,
    estructuras,
    parqueaderos,
    imagenes,
    userLocation,
    selectedDestination,
    activeMarkerId,
    loading,
    
    // Constantes
    UNIVERSIDAD_COORDS,
    
    // Funciones
    handleLocationFound,
    handleStartNavigation,
    handleCancelRoute,
    cargarDatosMapa,
    showInfoToast,
    showErrorToast,
    showRouteInfoToast
  }
}