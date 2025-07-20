import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { StructureDetailService } from '../services/api/structureDetailService.js'

export const useStructureDetail = () => {
  const { id } = useParams()
  const [data, setData] = useState({
    puntoExterior: null,
    imagenes: [],
    estructura: null,
    pisos: [],
    puntosInteriores: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Paginación para puntos interiores
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  // Cálculos de paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.puntosInteriores.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(data.puntosInteriores.length / itemsPerPage)

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber)
  }, [])

  const cargarDatos = useCallback(async () => {
    if (!id) {
      setError('ID no proporcionado')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await StructureDetailService.cargarDatosCompletos(parseInt(id))
      
      if (result.error) {
        throw result.error
      }

      if (!result.puntoExterior) {
        throw new Error('Punto exterior no encontrado')
      }

      setData(result)
    } catch (error) {
      console.error('Error cargando datos completos:', error)
      return {
        puntoExterior: null,
        imagenes: [],
        estructura: null,
        pisos: [],
        puntosInteriores: [],
        parqueadero: null,
        esEstructura: false,
        esParqueadero: false,
        soloMostrarFotos: false,
        error
      }
    } finally {
      setLoading(false)
    }
  }, [id])

  const renderTableRows = useCallback(() => {
    return currentItems.map((punto, index) => (
      <tr key={punto.id_punto_interior}>
        <td className="contenido text-center">{indexOfFirstItem + index + 1}</td>
        <td className="contenido text-center">{punto.nombreTipo || 'N/A'}</td>
        <td className="contenido text-center">{punto.nombre}</td>
        <td className="contenido text-center">{punto.nivel || 'N/A'}</td>
      </tr>
    ))
  }, [currentItems, indexOfFirstItem])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  // Reset pagination when data changes
  useEffect(() => {
    setCurrentPage(1)
  }, [data.puntosInteriores])

  return {
    // Data
    puntoExterior: data.puntoExterior,
    imagenes: data.imagenes,
    estructura: data.estructura,
    pisos: data.pisos,
    puntosInteriores: data.puntosInteriores,
    soloMostrarFotos: data.soloMostrarFotos,
    
    // Estado
    loading,
    error,
    
    // Paginación
    currentPage,
    currentItems,
    totalPages,
    itemsPerPage,
    paginate,
    renderTableRows,
    
    // Funciones
    cargarDatos
  }
}