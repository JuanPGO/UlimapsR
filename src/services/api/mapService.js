import { supabase } from '../supabase/client.js'

export class MapaService {
  // Obtener puntos exteriores activos para el mapa
  static async getPuntosExterioresActivos() {
    try {
      const { data, error } = await supabase
        .from('punto_interes_exterior')
        .select(`
          id_punto_exterior as id,
          nombre,
          latitud,
          longitud,
          activo
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
      // Obtener puntos exteriores
      const { data: puntos, error: errorPuntos } = await this.getPuntosExterioresActivos()
      if (errorPuntos) throw errorPuntos

      if (!puntos || puntos.length === 0) {
        return { data: { puntos: [], estructuras: {}, imagenes: {} }, error: null }
      }

      // Cargar estructuras e imágenes en paralelo
      const estructurasPromises = puntos.map(punto => 
        this.getEstructuraPorPunto(punto.id)
      )
      const imagenesPromises = puntos.map(punto => 
        this.getPrimeraImagenPorPunto(punto.id)
      )

      const [estructurasResults, imagenesResults] = await Promise.all([
        Promise.all(estructurasPromises),
        Promise.all(imagenesPromises)
      ])

      // Formatear resultados
      const estructuras = {}
      const imagenes = {}

      puntos.forEach((punto, index) => {
        if (estructurasResults[index].data) {
          estructuras[punto.id] = estructurasResults[index].data
        }
        if (imagenesResults[index].data) {
          imagenes[punto.id] = imagenesResults[index].data
        }
      })

      return {
        data: {
          puntos,
          estructuras,
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