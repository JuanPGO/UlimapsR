import { BaseService } from './baseService.js'
import { supabase } from '../supabase/client.js'

export class ParqueaderoService extends BaseService {
  constructor() {
    super('parqueadero')
  }

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('parqueadero')
        .select(`
          id_parqueadero,
          punto_interes_exterior(nombre),
          vehiculo,
          tipo(nombre_tipo)
        `)
        .order('id_parqueadero', { ascending: true })

      if (error) throw error
      
      const formattedData = data?.map(item => ({
        id: item.id_parqueadero,
        nombre: item.punto_interes_exterior?.nombre,
        vehiculo: item.vehiculo,
        nombre_tipo: item.tipo?.nombre_tipo
      }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo parqueaderos:', error)
      return { data: null, error }
    }
  }

  async create(data) {
    // Buscar IDs necesarios
    const { data: puntoExt } = await supabase
      .from('punto_interes_exterior')
      .select('id_punto_exterior')
      .eq('nombre', data.nombre)
      .single()

    const { data: tipo } = await supabase
      .from('tipo')
      .select('id_tipo')
      .eq('nombre_tipo', data.nombre_tipo)
      .single()

    if (!puntoExt || !tipo) {
      throw new Error('Punto exterior o tipo no encontrado')
    }

    const createData = {
      id_parqueadero: data.id,
      id_punto_exterior: puntoExt.id_punto_exterior,
      vehiculo: data.vehiculo,
      id_tipo: tipo.id_tipo
    }

    return super.create(createData)
  }

  async update(id, data) {
    // Similar lógica para update
    const { data: puntoExt } = await supabase
      .from('punto_interes_exterior')
      .select('id_punto_exterior')
      .eq('nombre', data.nombre)
      .single()

    const { data: tipo } = await supabase
      .from('tipo')
      .select('id_tipo')
      .eq('nombre_tipo', data.nombre_tipo)
      .single()

    const updateData = {
      id_punto_exterior: puntoExt?.id_punto_exterior,
      vehiculo: data.vehiculo,
      id_tipo: tipo?.id_tipo
    }

    return super.update(id, updateData, 'id_parqueadero')
  }

  async delete(id) {
    return super.delete(id, 'id_parqueadero')
  }
}