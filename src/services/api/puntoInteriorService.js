import { BaseService } from './baseService.js'
import { supabase } from '../supabase/client.js'

export class PuntoInteriorService extends BaseService {
  constructor() {
    super('punto_interes_interior')
  }

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('punto_interes_interior')
        .select(`
          id_punto_interior as id,
          nombre,
          activo,
          tipo(nombre_tipo),
          piso(plano, estructura(bloque))
        `)
        .order('id_punto_interior')

      if (error) throw error
      
      const formattedData = data?.map(item => ({
        id: item.id,
        nombre: item.nombre,
        activo: item.activo,
        nombreTipo: item.tipo?.nombre_tipo,
        estructura: item.piso?.estructura?.bloque,
        plano: item.piso?.plano
      }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo puntos interior:', error)
      return { data: null, error }
    }
  }

  async create(data) {
    try {
      // Buscar ID de tipo
      const { data: tipo } = await supabase
        .from('tipo')
        .select('id_tipo')
        .eq('nombre_tipo', data.nombreTipo)
        .single()

      // Buscar ID de piso
      const { data: piso } = await supabase
        .from('piso')
        .select('id_piso')
        .eq('plano', data.plano)
        .single()

      if (!tipo || !piso) {
        throw new Error('Tipo o piso no encontrado')
      }

      const createData = {
        id_punto_interior: data.id,
        nombre: data.nombre,
        activo: data.activo,
        id_tipo: tipo.id_tipo,
        id_piso: piso.id_piso
      }

      return super.create(createData)
    } catch (error) {
      console.error('Error creando punto interior:', error)
      return { data: null, error }
    }
  }

  async update(id, data) {
    try {
      const { data: tipo } = await supabase
        .from('tipo')
        .select('id_tipo')
        .eq('nombre_tipo', data.nombreTipo)
        .single()

      const { data: piso } = await supabase
        .from('piso')
        .select('id_piso')
        .eq('plano', data.plano)
        .single()

      const updateData = {
        nombre: data.nombre,
        id_tipo: tipo?.id_tipo,
        id_piso: piso?.id_piso
      }

      return super.update(id, updateData, 'id_punto_interior')
    } catch (error) {
      console.error('Error actualizando punto interior:', error)
      return { data: null, error }
    }
  }

  async updateEstado(id, activo) {
    return super.update(id, { activo }, 'id_punto_interior')
  }

  async delete(id) {
    return super.delete(id, 'id_punto_interior')
  }
}