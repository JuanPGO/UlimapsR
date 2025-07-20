import { BaseService } from './baseService.js'
import { supabase } from '../supabase/client.js'

export class ImagenService extends BaseService {
  constructor() {
    super('imagen')
  }

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('imagen')
        .select(`
          id_imagen as id,
          nombre,
          punto_interes_exterior(nombre)
        `)
        .order('id_imagen')

      if (error) throw error
      
      const formattedData = data?.map(item => ({
        id: item.id,
        nombre: item.nombre,
        punto_exterior: item.punto_interes_exterior?.nombre
      }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo imágenes:', error)
      return { data: null, error }
    }
  }

  async create(data) {
    try {
      const { data: puntoExt } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior')
        .eq('nombre', data.puntoExterior)
        .single()

      if (!puntoExt) {
        throw new Error('Punto exterior no encontrado')
      }

      const createData = {
        id_imagen: data.id,
        nombre: data.nombre,
        id_punto_exterior: puntoExt.id_punto_exterior
      }

      return super.create(createData)
    } catch (error) {
      console.error('Error creando imagen:', error)
      return { data: null, error }
    }
  }

  async update(id, data) {
    try {
      const { data: puntoExt } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior')
        .eq('nombre', data.puntoExterior)
        .single()

      const updateData = {
        nombre: data.nombre,
        id_punto_exterior: puntoExt?.id_punto_exterior
      }

      return super.update(id, updateData, 'id_imagen')
    } catch (error) {
      console.error('Error actualizando imagen:', error)
      return { data: null, error }
    }
  }

  async delete(id) {
    return super.delete(id, 'id_imagen')
  }
}