import { supabase } from '../supabase/client.js'

export class StructureDetailService {
  // Obtener punto exterior por ID
  static async getPuntoExteriorById(id) {
    try {
      const { data, error } = await supabase
        .from('punto_interes_exterior')
        .select('*')
        .eq('id_punto_exterior', id)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo punto exterior:', error)
      return { data: null, error }
    }
  }

  // Obtener todas las imágenes de un punto
  static async getAllImagenesByPunto(idPuntoExterior) {
    try {
      const { data, error } = await supabase
        .from('imagen')
        .select('id_imagen, nombre')
        .eq('id_punto_exterior', idPuntoExterior)
        .order('id_imagen')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo imágenes:', error)
      return { data: null, error }
    }
  }

  // Obtener estructura por punto exterior
  static async getEstructuraByPunto(idPuntoExterior) {
    try {
      const { data, error } = await supabase
        .from('estructura')
        .select('id_estructura, bloque')
        .eq('id_punto_exterior', idPuntoExterior)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo estructura:', error)
      return { data: null, error }
    }
  }

  // Obtener pisos de una estructura
  static async getPisosByPunto(idPuntoExterior) {
    try {
      const { data, error } = await supabase
        .from('piso')
        .select(`
          id_piso,
          nivel,
          plano,
          estructura!inner(id_estructura, id_punto_exterior)
        `)
        .eq('estructura.id_punto_exterior', idPuntoExterior)
        .order('nivel')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo pisos:', error)
      return { data: null, error }
    }
  }

  // Obtener puntos interiores activos
  static async getPuntosInterioresByPunto(idPuntoExterior) {
    try {
      // Primero obtenemos la estructura asociada al punto exterior
      const { data: estructura, error: estructuraError } = await supabase
        .from('estructura')
        .select('id_estructura')
        .eq('id_punto_exterior', idPuntoExterior)
        .single()

      if (estructuraError && estructuraError.code !== 'PGRST116') {
        throw estructuraError
      }

      // Si no hay estructura, no hay puntos interiores
      if (!estructura) {
        return { data: [], error: null }
      }

      // Ahora obtenemos los puntos interiores de esa estructura
      const { data, error } = await supabase
        .from('punto_interes_interior')
        .select(`
          id_punto_interior,
          nombre,
          activo,
          tipo!inner(nombre_tipo),
          piso!inner(nivel, id_estructura)
        `)
        .eq('activo', true)
        .eq('piso.id_estructura', estructura.id_estructura)
        // Removemos el .order() de aquí porque no funciona con joins

      if (error) throw error
      
      // Formatear datos
      const formattedData = data?.map(item => ({
        id_punto_interior: item.id_punto_interior,
        nombre: item.nombre,
        nombreTipo: item.tipo?.nombre_tipo,
        nivel: item.piso?.nivel,
        activo: item.activo
      }))

      // Ordenar los datos por nivel de piso en JavaScript
      const sortedData = formattedData?.sort((a, b) => {
        // Convertir niveles a números para ordenamiento correcto
        const nivelA = parseInt(a.nivel) || 0
        const nivelB = parseInt(b.nivel) || 0
        return nivelA - nivelB
      })

      return { data: sortedData, error: null }
    } catch (error) {
      console.error('Error obteniendo puntos interiores:', error)
      return { data: null, error }
    }
  }

  // Cargar todos los datos de una estructura de una vez
  static async cargarDatosCompletos(idPuntoExterior) {
    try {
      const [
        puntoResult,
        imagenesResult,
        estructuraResult,
        pisosResult,
        puntosInterioresResult
      ] = await Promise.all([
        this.getPuntoExteriorById(idPuntoExterior),
        this.getAllImagenesByPunto(idPuntoExterior),
        this.getEstructuraByPunto(idPuntoExterior),
        this.getPisosByPunto(idPuntoExterior),
        this.getPuntosInterioresByPunto(idPuntoExterior)
      ])

      return {
        puntoExterior: puntoResult.data,
        imagenes: imagenesResult.data || [],
        estructura: estructuraResult.data,
        pisos: pisosResult.data || [],
        puntosInteriores: puntosInterioresResult.data || [],
        error: null
      }
    } catch (error) {
      console.error('Error cargando datos completos:', error)
      return {
        puntoExterior: null,
        imagenes: [],
        estructura: null,
        pisos: [],
        puntosInteriores: [],
        error
      }
    }
  }
}