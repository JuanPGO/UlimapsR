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

  // Obtener parqueadero por punto exterior
  static async getParqueaderoByPunto(idPuntoExterior) {
    try {
      const { data, error } = await supabase
        .from('parqueadero')
        .select(`
          id_parqueadero,
          vehiculo,
          tipo(nombre_tipo)
        `)
        .eq('id_punto_exterior', idPuntoExterior)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo parqueadero:', error)
      return { data: null, error }
    }
  }

  // Determinar el tipo de punto y si debe mostrar solo fotos
  static async determinarTipoPunto(idPuntoExterior) {
    try {
      const { data: puntosConInfo, error } = await supabase
        .from('punto_interes_exterior')
        .select(`
          id_punto_exterior,
          estructura(id_estructura, bloque, tipo(id_tipo, nombre_tipo)),
          parqueadero(id_parqueadero, vehiculo)
        `)
        .eq('id_punto_exterior', idPuntoExterior)
        .single()

      if (error) throw error

      const tieneEstructura = puntosConInfo.estructura && puntosConInfo.estructura.length > 0
      const tieneParqueadero = puntosConInfo.parqueadero && puntosConInfo.parqueadero.length > 0

      // Tipos que solo deben mostrar fotos (no planos ni puntos de interés)
      const tiposSoloFotos = [5, 14] // 5: Escenario Deportivo, 14: Zona de ingreso
      
      let soloMostrarFotos = false
      let tipoEstructura = null

      if (tieneEstructura) {
        const estructura = puntosConInfo.estructura[0]
        tipoEstructura = estructura.tipo
        soloMostrarFotos = tiposSoloFotos.includes(estructura.tipo?.id_tipo)
      }

      return {
        data: {
          esEstructura: tieneEstructura,
          esParqueadero: tieneParqueadero,
          soloMostrarFotos: soloMostrarFotos || tieneParqueadero, // Parqueaderos también solo muestran fotos
          estructura: tieneEstructura ? puntosConInfo.estructura[0] : null,
          parqueadero: tieneParqueadero ? puntosConInfo.parqueadero[0] : null,
          tipoEstructura
        },
        error: null
      }
    } catch (error) {
      console.error('Error determinando tipo de punto:', error)
      return { data: null, error }
    }
  }

  // Cargar todos los datos de una estructura o parqueadero de una vez
  static async cargarDatosCompletos(idPuntoExterior) {
    try {
      // Primero determinar si es estructura o parqueadero
      const tipoResult = await this.determinarTipoPunto(idPuntoExterior)
      
      if (tipoResult.error || !tipoResult.data) {
        throw new Error('No se pudo determinar el tipo de punto')
      }

      const { esEstructura, esParqueadero, soloMostrarFotos } = tipoResult.data

      // Cargar datos básicos que siempre necesitamos
      const [puntoResult, imagenesResult] = await Promise.all([
        this.getPuntoExteriorById(idPuntoExterior),
        this.getAllImagenesByPunto(idPuntoExterior)
      ])

      let estructura = null
      let pisos = []
      let puntosInteriores = []
      let parqueadero = null

      if (esEstructura) {
        // Si es estructura, cargar datos básicos de estructura
        const estructuraResult = await this.getEstructuraByPunto(idPuntoExterior)
        estructura = estructuraResult.data

        // Solo cargar pisos y puntos interiores si no es un tipo que solo muestra fotos
        if (!soloMostrarFotos) {
          const [pisosResult, puntosInterioresResult] = await Promise.all([
            this.getPisosByPunto(idPuntoExterior),
            this.getPuntosInterioresByPunto(idPuntoExterior)
          ])
          pisos = pisosResult.data || []
          puntosInteriores = puntosInterioresResult.data || []
        }
      } else if (esParqueadero) {
        // Si es parqueadero, cargar datos de parqueadero
        const parqueaderoResult = await this.getParqueaderoByPunto(idPuntoExterior)
        parqueadero = parqueaderoResult.data
      }

      return {
        puntoExterior: puntoResult.data,
        imagenes: imagenesResult.data || [],
        estructura,
        pisos,
        puntosInteriores,
        parqueadero,
        esEstructura,
        esParqueadero,
        soloMostrarFotos,
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
        parqueadero: null,
        esEstructura: false,
        esParqueadero: false,
        soloMostrarFotos: false,
        error
      }
    }
  }
}