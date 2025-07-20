import { BaseService } from './baseService.js'
import { supabase } from '../supabase/client.js'

export class PisoService extends BaseService {
  constructor() {
    super('piso')
  }

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('piso')
        .select(`
          id_piso,
          nivel,
          estructura(bloque, punto_interes_exterior(nombre)),
          plano
        `)
        .order('id_piso')

      if (error) throw error
      
      const formattedData = data?.map(item => ({
        id: item.id_piso,
        nivel: item.nivel,
        bloque: item.estructura?.bloque,
        nombre: item.estructura?.punto_interes_exterior?.nombre,
        plano: item.plano
      }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo pisos:', error)
      return { data: null, error }
    }
  }

  async create(data) {
    try {
      // Buscar ID de estructura por bloque
      const { data: estructura } = await supabase
        .from('estructura')
        .select('id_estructura')
        .eq('bloque', data.bloque)
        .single()

      if (!estructura) {
        throw new Error('Estructura no encontrada')
      }

      const createData = {
        id_piso: data.id,
        nivel: data.nivel,
        id_estructura: estructura.id_estructura,
        plano: data.plano
      }

      return super.create(createData)
    } catch (error) {
      console.error('Error creando piso:', error)
      return { data: null, error }
    }
  }

  async update(id, data) {
    try {
      const { data: estructura } = await supabase
        .from('estructura')
        .select('id_estructura')
        .eq('bloque', data.bloque)
        .single()

      const updateData = {
        nivel: data.nivel,
        id_estructura: estructura?.id_estructura,
        plano: data.plano
      }

      return super.update(id, updateData, 'id_piso')
    } catch (error) {
      console.error('Error actualizando piso:', error)
      return { data: null, error }
    }
  }

  async delete(id) {
    return super.delete(id, 'id_piso')
  }
}