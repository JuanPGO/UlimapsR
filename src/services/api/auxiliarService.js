import { supabase } from '../supabase/client.js'

export class AuxiliarService {
  // Cargar tipos
  static async getTipos() {
    try {
      const { data, error } = await supabase
        .from('tipo')
        .select('nombre_tipo as nombreTipo')
        .order('nombre_tipo')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo tipos:', error)
      return { data: null, error }
    }
  }

  // Cargar tipos de vehículo únicos
  static async getTiposVehiculo() {
    try {
      const { data, error } = await supabase
        .from('parqueadero')
        .select('vehiculo')
        .order('vehiculo')

      if (error) throw error
      
      // Obtener valores únicos
      const vehiculosUnicos = [...new Set(data?.map(item => item.vehiculo) || [])]
      const formattedData = vehiculosUnicos.map(vehiculo => ({ vehiculo }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo tipos de vehículo:', error)
      return { data: null, error }
    }
  }

  // Cargar puntos exteriores para select
  static async getPuntosExteriorSelect() {
    try {
      const { data, error } = await supabase
        .from('punto_interes_exterior')
        .select('nombre')
        .order('nombre')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo puntos exteriores:', error)
      return { data: null, error }
    }
  }

  // Cargar estructuras para select
  static async getEstructurasSelect() {
    try {
      const { data, error } = await supabase
        .from('estructura')
        .select('bloque')
        .order('bloque')

      if (error) throw error
      
      // Obtener valores únicos
      const bloquesUnicos = [...new Set(data?.map(item => item.bloque) || [])]
      const formattedData = bloquesUnicos.map(bloque => ({ bloque }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo estructuras:', error)
      return { data: null, error }
    }
  }

  // Cargar pisos para select
  static async getPisosSelect() {
    try {
      const { data, error } = await supabase
        .from('piso')
        .select('plano')
        .order('plano')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error obteniendo pisos:', error)
      return { data: null, error }
    }
  }
}