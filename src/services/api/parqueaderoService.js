import { supabase } from '../supabase/client.js'

export class ParqueaderoService {

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
    try {
      // Buscar IDs necesarios (sin .single())
      const { data: puntoExtResult, error: puntoExtError } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior')
        .eq('nombre', data.nombre)
        .limit(1)

      if (puntoExtError) {
        return { data: null, error: puntoExtError }
      }

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
        id_parqueadero: data.id,
        id_punto_exterior: puntoExtResult[0].id_punto_exterior,
        vehiculo: data.vehiculo,
        id_tipo: tipoResult[0].id_tipo
      }

      const { data: result, error } = await supabase
        .from('parqueadero')
        .insert(createData)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error creando parqueadero:', error)
      return { data: null, error }
    }
  }

  async update(id, data) {
    try {
      // Similar lógica para update (sin .single())
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
        id_punto_exterior: puntoExtResult?.[0]?.id_punto_exterior,
        vehiculo: data.vehiculo,
        id_tipo: tipoResult?.[0]?.id_tipo
      }

      const { data: result, error } = await supabase
        .from('parqueadero')
        .update(updateData)
        .eq('id_parqueadero', id)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error actualizando parqueadero:', error)
      return { data: null, error }
    }
  }

  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('parqueadero')
        .delete()
        .eq('id_parqueadero', id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error eliminando parqueadero:', error)
      return { data: null, error }
    }
  }
}