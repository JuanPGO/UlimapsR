import { supabase } from '../supabase/client.js'

export class MapaService {
  // Obtener puntos exteriores activos para el mapa
  static async getPuntosExterioresActivos() {
    try {
      const { data, error } = await supabase
        .from('punto_interes_exterior')
        .select(`
          id_punto_exterior,
          nombre,
          latitud,
          longitud,
          activo,
          estructura(id_estructura, bloque),
          parqueadero(id_parqueadero, vehiculo)
        `)
        .eq('activo', true)
        .order('nombre')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo puntos exteriores activos:', error)
      return { data: null, error }
    }
  }

  // Obtener estructura de un punto específico
  static async getEstructuraPorPunto(idPuntoExterior) {
    try {
      const { data, error } = await supabase
        .from('estructura')
        .select('bloque, id_estructura')
        .eq('id_punto_exterior', idPuntoExterior)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo estructura:', error)
      return { data: null, error }
    }
  }

  // Obtener primera imagen de un punto específico
  static async getPrimeraImagenPorPunto(idPuntoExterior) {
    try {
      const { data, error } = await supabase
        .from('imagen')
        .select('nombre')
        .eq('id_punto_exterior', idPuntoExterior)
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo imagen:', error)
      return { data: null, error }
    }
  }

  // Cargar todos los datos del mapa de una vez
  static async cargarDatosMapa() {
    try {
      // Obtener puntos exteriores con sus estructuras y parqueaderos en una sola consulta
      const { data: puntosConInfo, error: errorPuntos } = await supabase
        .from('punto_interes_exterior')
        .select(`
          id_punto_exterior,
          nombre,
          latitud,
          longitud,
          activo,
          estructura(id_estructura, bloque),
          parqueadero(id_parqueadero, vehiculo)
        `)
        .eq('activo', true)
        .order('nombre')

      if (errorPuntos) throw errorPuntos

      if (!puntosConInfo || puntosConInfo.length === 0) {
        return { data: { puntos: [], estructuras: {}, parqueaderos: {}, imagenes: {} }, error: null }
      }

      // Separar puntos, estructuras y parqueaderos
      const puntos = puntosConInfo.map(punto => ({
        id_punto_exterior: punto.id_punto_exterior,
        nombre: punto.nombre,
        latitud: punto.latitud,
        longitud: punto.longitud,
        activo: punto.activo
      }))

      const estructuras = {}
      const parqueaderos = {}

      puntosConInfo.forEach(punto => {
        if (punto.estructura) {
          estructuras[punto.id_punto_exterior] = punto.estructura
        }
        if (punto.parqueadero) {
          parqueaderos[punto.id_punto_exterior] = punto.parqueadero
        }
      })

      // Cargar imágenes para todos los puntos
      const imagenesPromises = puntos.map(punto => 
        this.getPrimeraImagenPorPunto(punto.id_punto_exterior)
      )

      const imagenesResults = await Promise.all(imagenesPromises)

      // Formatear resultados de imágenes
      const imagenes = {}
      puntos.forEach((punto, index) => {
        if (imagenesResults[index].data) {
          imagenes[punto.id_punto_exterior] = imagenesResults[index].data
        }
      })

      return {
        data: {
          puntos,
          estructuras,
          parqueaderos,
          imagenes
        },
        error: null
      }
    } catch (error) {
      console.error('Error cargando datos del mapa:', error)
      return { data: null, error }
    }
  }
}