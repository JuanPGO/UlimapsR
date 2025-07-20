import { supabase } from '../supabase/client.js'

export class PuntoInteriorService {

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('punto_interes_interior')
        .select(`
          id_punto_interior,
          nombre,
          activo,
          tipo(nombre_tipo),
          piso(plano, estructura(bloque))
        `)
        .order('id_punto_interior')

      if (error) throw error
      
      const formattedData = data?.map(item => ({
        id: item.id_punto_interior,
        nombre: item.nombre,
        activo: item.activo,
        nombre_tipo: item.tipo?.nombre_tipo,
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
      // Buscar ID de tipo (sin .single())
      const { data: tipoResult, error: tipoError } = await supabase
        .from('tipo')
        .select('id_tipo')
        .eq('nombre_tipo', data.nombre_tipo)
        .limit(1)

      if (tipoError) {
        return { data: null, error: tipoError }
      }

      // Buscar ID de piso (sin .single())
      const { data: pisoResult, error: pisoError } = await supabase
        .from('piso')
        .select('id_piso')
        .eq('plano', data.plano)
        .limit(1)

      if (pisoError) {
        return { data: null, error: pisoError }
      }

      if (!tipoResult || tipoResult.length === 0) {
        throw new Error('Tipo no encontrado')
      }

      if (!pisoResult || pisoResult.length === 0) {
        throw new Error('Piso no encontrado')
      }

      const createData = {
        id_punto_interior: data.id,
        nombre: data.nombre,
        activo: data.activo,
        id_tipo: tipoResult[0].id_tipo,
        id_piso: pisoResult[0].id_piso
      }

      const { data: result, error } = await supabase
        .from('punto_interes_interior')
        .insert(createData)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error creando punto interior:', error)
      return { data: null, error }
    }
  }

  async update(id, data) {
    try {
      const { data: tipoResult } = await supabase
        .from('tipo')
        .select('id_tipo')
        .eq('nombre_tipo', data.nombre_tipo)
        .limit(1)

      const { data: pisoResult } = await supabase
        .from('piso')
        .select('id_piso')
        .eq('plano', data.plano)
        .limit(1)

      const updateData = {
        nombre: data.nombre,
        id_tipo: tipoResult?.[0]?.id_tipo,
        id_piso: pisoResult?.[0]?.id_piso
      }

      const { data: result, error } = await supabase
        .from('punto_interes_interior')
        .update(updateData)
        .eq('id_punto_interior', id)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error actualizando punto interior:', error)
      return { data: null, error }
    }
  }

  async updateEstado(id, activo) {
    try {
      const { data, error } = await supabase
        .from('punto_interes_interior')
        .update({ activo })
        .eq('id_punto_interior', id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error actualizando estado punto interior:', error)
      return { data: null, error }
    }
  }

  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('punto_interes_interior')
        .delete()
        .eq('id_punto_interior', id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error eliminando punto interior:', error)
      return { data: null, error }
    }
  }
}