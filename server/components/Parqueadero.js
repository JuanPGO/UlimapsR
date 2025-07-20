import {connectToDB} from '../Conexion.js';

export class Parqueadero {

    // CREATE
    async createParqueadero(id_parqueadero, nombre, vehiculo, nombreTipo) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idPuntoExterior = await new Promise((resolve, reject) => {
                db.get('SELECT id_puntoExterior FROM puntoInteresExterior WHERE nombre = ?', [nombre], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_puntoExterior:', err);
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_puntoExterior',
                            error: err
                        });
                    } else {
                        resolve(row ? row.id_puntoExterior: null);
                    }
                });
            });

            const idTipo = await new Promise((resolve, reject) => {
                db.get('SELECT id_tipo FROM Tipo WHERE nombreTipo = ?', [nombreTipo], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_tipo:', err);
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_tipo',
                            error: err
                        });
                    } else {
                        resolve(row ? row.id_tipo : null);
                    }
                });
            });

            if (!idPuntoExterior) {
                throw new Error(`El punto exterior '${nombre}' no existe.`);
            }

            if (!idTipo) {
                throw new Error(`El tipo '${nombreTipo}' no existe.`);
            }

            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(*) as count FROM Parqueadero WHERE id_parqueadero = ?';
                
                db.get(sql, [id_parqueadero], (err, row) => {
                    if (err) {
                        reject({
                            type: 'DATABASE_ERROR',
                            message: 'Error al verificar el id_parqueadero',
                            error: err
                        });
                        return;
                    }
    
                    if (row.count > 0) {
                        // si el id existe
                        reject({
                            type: 'ID_EXISTS',
                            message: `El ID ${id_parqueadero} ya está en uso.`
                        });
                    } else {
                        const sql = 'INSERT INTO parqueadero (id_parqueadero,id_puntoExterior, vehiculo, id_tipo) VALUES (?,?,?,?)';
                        db.run(sql, [id_parqueadero,idPuntoExterior, vehiculo, idTipo], function(err) {
                            if (err) {
                                reject({
                                    type: 'INSERT_ERROR',
                                    message: 'Error al insertar el punto exterior',
                                    error: err
                                });
                            } else {
                                resolve('create');
                            }
                        });
                    }
                });
            });

        } finally {
            await db.close();
        }
    }

    // READ
    async readParqueaderos() {
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                db.all(
                    'SELECT p.id_parqueadero AS id, pe.nombre,p.vehiculo, t.nombreTipo  FROM Parqueadero p INNER JOIN PuntoInteresExterior pe ON pe.id_puntoExterior = p.id_puntoExterior INNER JOIN Tipo t ON p.id_tipo = t.id_tipo',
                    [],
                    (err, rows) => {
                        if (err) {
                            console.error('Error en la consulta SQL:', err);
                            reject(err);
                        } else {
                            console.log('Puntos de interés exterior encontrados:', rows);
                            resolve(rows);
                        }
                    }
                );
            });
        } finally {
            await db.close();
        }
    }

    // UPDATE
    async updateParqueadero(id, nombre, vehiculo, nombreTipo) {
        const db = await connectToDB();
        try {
            // Parte 1: Buscar los valores necesarios
            const idPuntoExterior = await new Promise((resolve, reject) => {
                db.get('SELECT id_puntoExterior FROM PuntoInteresExterior WHERE nombre = ?', [nombre], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_tipo:', err);
                        reject(err);
                    } else {
                        resolve(row ? row.id_puntoExterior : null);
                    }
                });
            });

            const idTipo = await new Promise((resolve, reject) => {
                db.get('SELECT id_tipo FROM Tipo WHERE nombreTipo = ?', [nombreTipo], (err, row) => {
                    if (err) {
                        console.error('Error al buscar id_tipo:', err);
                        reject(err);
                    } else {
                        resolve(row ? row.id_tipo : null);
                    }
                });
            });

            if (!idPuntoExterior) {
                throw new Error(`El punto exterior '${nombre}' no existe.`);
            }

            if (!idTipo) {
                throw new Error(`El tipo '${nombreTipo}' no existe.`);
            }

            // Parte 2: Realizar la actualización
            return new Promise((resolve, reject) => {
                const sql = `
                    UPDATE Parqueadero 
                    SET id_puntoExterior = ?, vehiculo = ?, id_tipo = ?
                    WHERE id_parqueadero = ?
                `;
                
                db.run(sql, [idPuntoExterior, vehiculo, idTipo, id], function(err) {
                    if (err) {
                        console.error('Error en la actualización de Estructura:', err);
                        reject(err);
                    } else {
                        console.log('Actualización exitosa. Filas afectadas:', this.changes);
                        resolve('update');
                    }
                });
            });
        } finally {
            await db.close();
        }
    }

    // DELETE
    async deleteParqueadero(id){
        const db = await connectToDB();
        try {
            return new Promise((resolve, reject) => {
                const sql = 'DELETE FROM Parqueadero WHERE id_parqueadero = ?;';
    
                db.run(sql, [id], function(err) {
                    if (err) {
                        console.error('Error en la consulta SQL:', err);
                        reject(err);
                    } else {
                        console.log('Eliminación exitosa. Filas afectadas:', this.changes);
                        resolve(this.changes > 0 ? 'delete' : 'not_found');
                    }
                });
            });
        } finally {
            await db.close();
        }
    }
}