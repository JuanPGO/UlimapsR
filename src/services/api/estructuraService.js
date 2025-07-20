import { BaseService } from './baseService.js'

export class EstructuraService extends BaseService {
  constructor() {
    super('estructura')
  }

  async getAll() {
    return super.getAll(`
      e.id_estructura:id,
      e.bloque,
      pe.nombre,
      t.nombre_tipo as "nombreTipo"
    `, 'e.bloque')
  }

  async getAllWithJoins() {
    try {
      const { data, error } = await this.supabase
        .from('estructura')
        .select(`
          id_estructura:id,
          bloque,
          punto_interes_exterior(nombre),
          tipo(nombre_tipo)
        `)
        .order('bloque')

      if (error) throw error
      
      // Formatear datos para compatibilidad
      const formattedData = data?.map(item => ({
        id: item.id,
        bloque: item.bloque,
        nombre: item.punto_interes_exterior?.nombre,
        nombreTipo: item.tipo?.nombre_tipo
      }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo estructuras con joins:', error)
      return { data: null, error }
    }
  }

  async create(data) {
    // Buscar ID de punto exterior por nombre
    const { data: puntoExt } = await this.supabase
      .from('punto_interes_exterior')
      .select('id_punto_exterior')
      .eq('nombre', data.nombre)
      .single()

    // Buscar ID de tipo por nombre
    const { data: tipo } = await this.supabase
      .from('tipo')
      .select('id_tipo')
      .eq('nombre_tipo', data.nombreTipo)
      .single()

    if (!puntoExt || !tipo) {
      throw new Error('Punto exterior o tipo no encontrado')
    }

    const createData = {
      id_estructura: data.id,
      bloque: data.bloque,
      id_punto_exterior: puntoExt.id_punto_exterior,
      id_tipo: tipo.id_tipo
    }

    return super.create(createData)
  }

  async update(id, data) {
    // Similar lógica de búsqueda para update
    const { data: puntoExt } = await this.supabase
      .from('punto_interes_exterior')
      .select('id_punto_exterior')
      .eq('nombre', data.nombre)
      .single()

    const { data: tipo } = await this.supabase
      .from('tipo')
      .select('id_tipo')
      .eq('nombre_tipo', data.nombreTipo)
      .single()

    const updateData = {
      bloque: data.bloque,
      id_punto_exterior: puntoExt?.id_punto_exterior,
      id_tipo: tipo?.id_tipo
    }

    return super.update(id, updateData, 'id_estructura')
  }

  async delete(id) {
    return super.delete(id, 'id_estructura')
  }
}