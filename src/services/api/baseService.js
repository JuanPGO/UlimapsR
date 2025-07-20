import { supabase } from '../supabase/client.js'

export class BaseService {
  constructor(tableName) {
    this.tableName = tableName
  }

  async getAll(select = '*', orderBy = null) {
    try {
      let query = supabase.from(this.tableName).select(select)
      
      if (orderBy) {
        query = query.order(orderBy)
      }
      
      const { data, error } = await query
      if (error) throw error
      
      return { data, error: null }
    } catch (error) {
      console.error(`Error obteniendo datos de ${this.tableName}:`, error)
      return { data: null, error }
    }
  }

  async getById(id, idField = 'id') {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq(idField, id)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error(`Error obteniendo ${this.tableName} por ID:`, error)
      return { data: null, error }
    }
  }

  async create(createData) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(createData)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error(`Error creando ${this.tableName}:`, error)
      return { data: null, error }
    }
  }

  async update(id, updateData, idField = 'id') {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updateData)
        .eq(idField, id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error(`Error actualizando ${this.tableName}:`, error)
      return { data: null, error }
    }
  }

  async delete(id, idField = 'id') {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .delete()
        .eq(idField, id)
        .select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error(`Error eliminando ${this.tableName}:`, error)
      return { data: null, error }
    }
  }
}