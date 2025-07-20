import { supabase } from '../supabase/client.js'

export class PuntoExteriorService {
  
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior, nombre, latitud, longitud, activo')
        .order('id_punto_exterior')

      if (error) throw error
      
      // Mapear datos para consistencia con el frontend
      const formattedData = data?.map(item => ({
        id: item.id_punto_exterior,
        nombre: item.nombre,
        latitud: item.latitud,
        longitud: item.longitud,
        activo: item.activo
      }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo puntos exteriores:', error)
      return { data: null, error }
    }
  }

  async create(data) {
    try {
      // Verificar si el ID ya existe (sin usar .single())
      const { data: existing, error: checkError } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior')
        .eq('id_punto_exterior', data.id)
        .limit(1)

      if (checkError) {
        return { data: null, error: checkError }
      }

      if (existing && existing.length > 0) {
        throw new Error(`El ID ${data.id} ya está en uso.`)
      }

      const createData = {
        id_punto_exterior: data.id,
        nombre: data.nombre,
        latitud: data.latitud,
        longitud: data.longitud,
        activo: data.activo,
        id_mapa: data.id_mapa || 1
      }

      const { data: result, error } = await supabase
        .from('punto_interes_exterior')
        .insert(createData)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error creando punto exterior:', error)
      return { data: null, error }
    }
  }

  async update(id, data) {
    try {
      const updateData = {
        nombre: data.nombre,
        latitud: data.latitud,
        longitud: data.longitud,
        activo: data.activo
      }

      const { data: result, error } = await supabase
        .from('punto_interes_exterior')
        .update(updateData)
        .eq('id_punto_exterior', id)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error actualizando punto exterior:', error)
      return { data: null, error }
    }
  }

  async updateEstado(id, activo) {
    try {
      const { data, error } = await supabase
        .from('punto_interes_exterior')
        .update({ activo })
        .eq('id_punto_exterior', id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error actualizando estado punto exterior:', error)
      return { data: null, error }
    }
  }

  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('punto_interes_exterior')
        .delete()
        .eq('id_punto_exterior', id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error eliminando punto exterior:', error)
      return { data: null, error }
    }
  }
}