import { supabase } from '../supabase/client.js'

export class ImagenService {

  async getAll() {
    try {
      const { data, error } = await supabase
        .from('imagen')
        .select(`
          id_imagen,
          nombre,
          punto_interes_exterior(nombre)
        `)
        .order('id_imagen')

      if (error) throw error
      
      const formattedData = data?.map(item => ({
        id: item.id_imagen,
        nombre: item.nombre,
        puntoExterior: item.punto_interes_exterior?.nombre
      }))

      return { data: formattedData, error: null }
    } catch (error) {
      console.error('Error obteniendo imágenes:', error)
      return { data: null, error }
    }
  }

  async create(data) {
    try {
      const { data: puntoExtResult, error: puntoExtError } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior')
        .eq('nombre', data.puntoExterior)
        .limit(1)

      if (puntoExtError) {
        return { data: null, error: puntoExtError }
      }

      if (!puntoExtResult || puntoExtResult.length === 0) {
        throw new Error('Punto exterior no encontrado')
      }

      const createData = {
        id_imagen: data.id,
        nombre: data.nombre,
        id_punto_exterior: puntoExtResult[0].id_punto_exterior
      }

      const { data: result, error } = await supabase
        .from('imagen')
        .insert(createData)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error creando imagen:', error)
      return { data: null, error }
    }
  }

  async update(id, data) {
    try {
      const { data: puntoExtResult } = await supabase
        .from('punto_interes_exterior')
        .select('id_punto_exterior')
        .eq('nombre', data.puntoExterior)
        .limit(1)

      const updateData = {
        nombre: data.nombre,
        id_punto_exterior: puntoExtResult?.[0]?.id_punto_exterior
      }

      const { data: result, error } = await supabase
        .from('imagen')
        .update(updateData)
        .eq('id_imagen', id)
        .select()

      if (error) throw error
      return { data: result, error: null }
    } catch (error) {
      console.error('Error actualizando imagen:', error)
      return { data: null, error }
    }
  }

  async delete(id) {
    try {
      const { data, error } = await supabase
        .from('imagen')
        .delete()
        .eq('id_imagen', id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error eliminando imagen:', error)
      return { data: null, error }
    }
  }
}