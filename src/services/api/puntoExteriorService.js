import { BaseService } from './baseService.js'
import { supabase } from '../supabase/client.js'

export class PuntoExteriorService extends BaseService {
  constructor() {
    super('punto_interes_exterior')
  }

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior, nombre, latitud, longitud, activo')
        .order('id_punto_exterior')

      if (error) throw error
      
      // Mapear datos para consistencia con el frontend
      const formattedData = data?.map(item => ({
        id: item.id_punto_exterior, // Mapear a 'id' para consistencia
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
    // Verificar si el ID ya existe
    const { data: existing } = await super.getById(data.id, 'id_punto_exterior')
    if (existing) {
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

    return super.create(createData)
  }

  async update(id, data) {
    const updateData = {
      nombre: data.nombre,
      latitud: data.latitud,
      longitud: data.longitud,
      activo: data.activo
    }

    return super.update(id, updateData, 'id_punto_exterior')
  }

  async updateEstado(id, activo) {
    return super.update(id, { activo }, 'id_punto_exterior')
  }

  async delete(id) {
    return super.delete(id, 'id_punto_exterior')
  }
}