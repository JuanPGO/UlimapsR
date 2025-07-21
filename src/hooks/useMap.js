import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { MapaService } from '../services/api/mapaService.js'

const UNIVERSIDAD_COORDS = { lat: 4.806004, lng: -75.760249 }

export const useMap = () => {
  const [puntosExteriores, setPuntosExteriores] = useState([])
  const [estructuras, setEstructuras] = useState({})
  const [parqueaderos, setParqueaderos] = useState({})
  const [imagenes, setImagenes] = useState({})
  const [userLocation, setUserLocation] = useState(null)
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

  // Manejar ubicación encontrada
  const handleLocationFound = useCallback((location) => {
    setUserLocation(location)
    showInfoToast("Ubicación encontrada")
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
    loading,
    
    // Constantes
    UNIVERSIDAD_COORDS,
    
    // Funciones
    handleLocationFound,
    cargarDatosMapa,
    showInfoToast,
    showErrorToast
  }
}