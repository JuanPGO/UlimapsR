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
        .select('id_imagen:id, nombre')
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
      const { data, error } = await supabase
        .from('punto_interes_interior')
        .select(`
          id_punto_interior:id,
          nombre,
          activo,
          tipo(nombre_tipo),
          piso(nivel, estructura!inner(id_punto_exterior))
        `)
        .eq('activo', true)
        .eq('piso.estructura.id_punto_exterior', idPuntoExterior)
        .order('piso.nivel', 'nombre')

      if (error) throw error
      
      // Formatear datos
      const formattedData = data?.map(item => ({
        id: item.id,
        nombre: item.nombre,
        nombreTipo: item.tipo?.nombre_tipo,
        nivel: item.piso?.nivel,
        activo: item.activo
      }))

      return { data: formattedData, error: null }
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