import { supabase } from '../supabase/client.js'

export class EstructuraService {

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('estructura')
        .select(`
          id_estructura,
          bloque,
          punto_interes_exterior(nombre),
          tipo(nombre_tipo)
        `)
        .order('id_estructura', { ascending: true })

      if (error) throw error
      
      // Formatear datos para compatibilidad
      const formattedData = data?.map(item => ({
        id: item.id_estructura,
        bloque: item.bloque,
        nombre: item.punto_interes_exterior?.nombre,
        nombre_tipo: item.tipo?.nombre_tipo
      }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo estructuras:', error)
      return { data: null, error }
    }
  }

  async getAllWithJoins() {
    try {
      const { data, error } = await supabase
        .from('estructura')
        .select(`
          id_estructura,
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
    try {
      // Buscar ID de punto exterior por nombre (sin .single())
      const { data: puntoExtResult, error: puntoExtError } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior')
        .eq('nombre', data.nombre)
        .limit(1)

      if (puntoExtError) {
        return { data: null, error: puntoExtError }
      }

      // Buscar ID de tipo por nombre (sin .single())
      const { data: tipoResult, error: tipoError } = await supabase
        .from('tipo')
        .select('id_tipo')
        .eq('nombre_tipo', data.nombre_tipo)
        .limit(1)

      if (tipoError) {
        return { data: null, error: tipoError }
      }

      if (!puntoExtResult || puntoExtResult.length === 0) {
        throw new Error('Punto exterior no encontrado')
      }

      if (!tipoResult || tipoResult.length === 0) {
        throw new Error('Tipo no encontrado')
      }

      const createData = {
        id_estructura: data.id,
        bloque: data.bloque,
        id_punto_exterior: puntoExtResult[0].id_punto_exterior,
        id_tipo: tipoResult[0].id_tipo
      }

      const { data: result, error } = await supabase
        .from('estructura')
        .insert(createData)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error creando estructura:', error)
      return { data: null, error }
    }
  }

  async update(id, data) {
    try {
      // Similar lógica de búsqueda para update (sin .single())
      const { data: puntoExtResult } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior')
        .eq('nombre', data.nombre)
        .limit(1)

      const { data: tipoResult } = await supabase
        .from('tipo')
        .select('id_tipo')
        .eq('nombre_tipo', data.nombre_tipo)
        .limit(1)

      const updateData = {
        bloque: data.bloque,
        id_punto_exterior: puntoExtResult?.[0]?.id_punto_exterior,
        id_tipo: tipoResult?.[0]?.id_tipo
      }

      const { data: result, error } = await supabase
        .from('estructura')
        .update(updateData)
        .eq('id_estructura', id)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error actualizando estructura:', error)
      return { data: null, error }
    }
  }

  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('estructura')
        .delete()
        .eq('id_estructura', id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error eliminando estructura:', error)
      return { data: null, error }
    }
  }
}