import { supabase } from '../supabase/client.js'

export class PisoService {

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
      // Buscar ID de estructura por bloque (sin .single())
      const { data: estructuraResult, error: estructuraError } = await supabase
        .from('estructura')
        .select('id_estructura')
        .eq('bloque', data.bloque)
        .limit(1)

      if (estructuraError) {
        return { data: null, error: estructuraError }
      }

      if (!estructuraResult || estructuraResult.length === 0) {
        throw new Error('Estructura no encontrada')
      }

      const createData = {
        id_piso: data.id,
        nivel: data.nivel,
        id_estructura: estructuraResult[0].id_estructura,
        plano: data.plano
      }

      const { data: result, error } = await supabase
        .from('piso')
        .insert(createData)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error creando piso:', error)
      return { data: null, error }
    }
  }

  async update(id, data) {
    try {
      const { data: estructuraResult } = await supabase
        .from('estructura')
        .select('id_estructura')
        .eq('bloque', data.bloque)
        .limit(1)

      const updateData = {
        nivel: data.nivel,
        id_estructura: estructuraResult?.[0]?.id_estructura,
        plano: data.plano
      }

      const { data: result, error } = await supabase
        .from('piso')
        .update(updateData)
        .eq('id_piso', id)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error actualizando piso:', error)
      return { data: null, error }
    }
  }

  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('piso')
        .delete()
        .eq('id_piso', id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error eliminando piso:', error)
      return { data: null, error }
    }
  }
}