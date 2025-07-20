import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { PuntoExteriorService } from '../services/api/puntoExteriorService.js'
import { EstructuraService } from '../services/api/estructuraService.js'
import { ParqueaderoService } from '../services/api/parqueaderoService.js'
import { PisoService } from '../services/api/pisoService.js'
import { PuntoInteriorService } from '../services/api/puntoInteriorService.js'
import { ImagenService } from '../services/api/imagenService.js'
import { AuxiliarService } from '../services/api/auxiliarService.js'

const services = {
  '1.1': new PuntoExteriorService(),
  '1.2': new EstructuraService(),
  '1.3': new ParqueaderoService(),
  '1.4': new PisoService(),
  '1.5': new PuntoInteriorService(),
  '1.6': new ImagenService()
}

const tipos = {
  '1.1': { titulo: 'Puntos Interes Exterior' },
  '1.2': { titulo: 'Estructuras' },
  '1.3': { titulo: 'Parqueaderos' },
  '1.4': { titulo: 'Pisos' },
  '1.5': { titulo: 'Puntos Interes Interior' },
  '1.6': { titulo: 'Imágenes' }
}

export const useCRUD = () => {
  // Cache de datos por tipo de tabla
  const [datosCache, setDatosCache] = useState({})
  const [loading, setLoading] = useState(false)
  const [tipoSeleccionado, setTipoSeleccionado] = useState('1.1')
  const [tituloSeleccionado, setTituloSeleccionado] = useState('Puntos Interes Exterior')

  // Opciones para los selects
  const [tiposOptions, setTiposOptions] = useState([])
  const [puntoExtOptions, setPuntoExtOptions] = useState([])
  const [estructuraOptions, setEstructuraOptions] = useState([])
  const [pisoOptions, setPisoOptions] = useState([])
  const [tiposVOptions, setTiposVOptions] = useState([])

  // Obtener datos del cache actual
  const datos = datosCache[tipoSeleccionado] || []

  const cargarDatos = async (tipo = tipoSeleccionado) => {
    setLoading(true)
    try {
      const service = services[tipo]
      const { data, error } = await service.getAll()
      
      if (error) {
        toast.error('Error al cargar datos')
        return
      }
      
      // Actualizar solo el cache del tipo específico
      setDatosCache(prevCache => ({
        ...prevCache,
        [tipo]: data || []
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      toast.error('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  const cargarOpciones = async () => {
    try {
      // Cargar todas las opciones en paralelo
      const [
        tiposResult,
        vehiculosResult,
        puntosExtResult,
        estructurasResult,
        pisosResult
      ] = await Promise.all([
        AuxiliarService.getTipos(),
        AuxiliarService.getTiposVehiculo(),
        AuxiliarService.getPuntosExteriorSelect(),
        AuxiliarService.getEstructurasSelect(),
        AuxiliarService.getPisosSelect()
      ])

      // Mapear correctamente los nombres de campo
      setTiposOptions(tiposResult.data?.map(item => ({ 
        id_tipo: item.id_tipo, 
        nombre_tipo: item.nombre_tipo 
      })) || [])
      setTiposVOptions(vehiculosResult.data || [])
      setPuntoExtOptions(puntosExtResult.data?.map(item => ({ 
        id_punto_exterior: item.id_punto_exterior, 
        nombre: item.nombre 
      })) || [])
      setEstructuraOptions(estructurasResult.data || [])
      setPisoOptions(pisosResult.data?.map(item => ({ 
        id_piso: item.id_piso, 
        plano: item.plano 
      })) || [])
    } catch (error) {
      console.error('Error cargando opciones:', error)
    }
  }

  const crearItem = async (formData) => {
    setLoading(true)
    try {
      const service = services[tipoSeleccionado]
      const { error } = await service.create(formData)
      
      if (error) {
        toast.error(error.message || 'Error al crear elemento')
        return { success: false }
      }
      
      toast.success('Elemento creado exitosamente')
      
      // MEJORAR: Invalidar cache y recargar para asegurar datos frescos
      setDatosCache(prevCache => ({
        ...prevCache,
        [tipoSeleccionado]: [] // Limpiar cache actual
      }))
      await cargarDatos() // Recargar datos frescos
      
      return { success: true }
    } catch (error) {
      console.error('Error creando elemento:', error)
      toast.error(error.message || 'Error al crear elemento')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const actualizarItem = async (id, formData) => {
    setLoading(true)
    try {
      const service = services[tipoSeleccionado]
      const { error } = await service.update(id, formData)
      
      if (error) {
        toast.error('Error al actualizar elemento')
        return { success: false }
      }
      
      toast.success('Elemento actualizado exitosamente')
      
      // Invalidar cache y recargar
      setDatosCache(prevCache => ({
        ...prevCache,
        [tipoSeleccionado]: []
      }))
      await cargarDatos()
      
      return { success: true }
    } catch (error) {
      console.error('Error actualizando elemento:', error)
      toast.error('Error al actualizar elemento')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const eliminarItem = async (id) => {
    setLoading(true)
    try {
      const service = services[tipoSeleccionado]
      const { error } = await service.delete(id)
      
      if (error) {
        toast.error('Error al eliminar elemento')
        return { success: false }
      }
      
      toast.success('Elemento eliminado exitosamente')
      
      // Invalidar cache y recargar
      setDatosCache(prevCache => ({
        ...prevCache,
        [tipoSeleccionado]: []
      }))
      await cargarDatos()
      
      return { success: true }
    } catch (error) {
      console.error('Error eliminando elemento:', error)
      toast.error('Error al eliminar elemento')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const cambiarEstado = async (id, nuevoEstado) => {
    if (!['1.1', '1.5'].includes(tipoSeleccionado)) {
      toast.error('Cambio de estado no soportado para este tipo')
      return { success: false }
    }

    setLoading(true)
    try {
      const service = services[tipoSeleccionado]
      const { error } = await service.updateEstado(id, nuevoEstado)
      
      if (error) {
        toast.error('Error al cambiar estado')
        return { success: false }
      }
      
      toast.success(`Estado cambiado a ${nuevoEstado ? 'Activo' : 'Inactivo'}`)
      await cargarDatos() // Solo recarga la tabla actual
      return { success: true }
    } catch (error) {
      console.error('Error cambiando estado:', error)
      toast.error('Error al cambiar estado')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const handleSelectChange = (eventKey) => {
    setTipoSeleccionado(eventKey)
    setTituloSeleccionado(tipos[eventKey].titulo)
    
    // ELIMINAR esta lógica duplicada - el useEffect se encargará
    // if (!datosCache[eventKey]) {
    //   cargarDatos(eventKey)
    // }
  }

  // MANTENER solo este useEffect que maneja la carga
  useEffect(() => {
    cargarDatos()
  }, [tipoSeleccionado])

  useEffect(() => {
    cargarOpciones()
  }, [])

  return {
    // Estado
    datos,
    loading,
    tipoSeleccionado,
    setTipoSeleccionado,
    tituloSeleccionado,
    
    // Opciones
    tiposOptions,
    puntoExtOptions,
    estructuraOptions,
    pisoOptions,
    tiposVOptions,
    
    // Acciones
    cargarDatos,
    crearItem,
    actualizarItem,
    eliminarItem,
    cambiarEstado,
    handleSelectChange
  }
}