// CREACION DE CLASE USUARIO PARA UTILIZAR LOS METODOS FUERA

import pool from "../../../routes/conect.js";
export class Usuario {
    constructor(nombre,apellido,edad,correo,contraseña) {
        this.nombre = '';
        this.apellido = '';
        this.edad = '';
        this.correo = '';
        this.contraseña = '';
    }

    //debe ir sin function solo async y el nombre de la funcion
    async autenticar(username, password, done) {
        
        try {
            const res = await pool.query(`SELECT correo, contraseña, id, nombre from usuarios where correo LIKE $1`, [username])
            let usuario
            usuario = res.rows[0]
            if (username == usuario.correo && password == usuario.contraseña) { // utilizar el this.
            return done(null, { id: usuario.id, name: usuario.nombre})
            }
            return done(null, false)
        } catch (error) {
            throw error
        }}

        //crear usuario
async agregarUsuario(nombre, apellido, edad, correo, contraseña) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('INSERT INTO usuarios (nombre, apellido, edad, correo, contraseña) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nombre, apellido, edad, correo, contraseña]);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;

    } finally {
      client.release();
    }
}
}

