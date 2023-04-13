import pool from "../../../routes/conect.js";
export class Usuario {
    constructor(nombre,apellido,edad,correo,contraseña) {
        this.nombre = '';
        this.apellido = '';
        this.edad = '';
        this.correo = '';
        this.contraseña = '';
    }

    // borré el function
    async autenticar(username, password, done) {
        let usuario
        try {
            const res = await pool.query(`SELECT correo, contraseña, id, nombre from usuarios where correo LIKE $1`, [username])
            usuario = res.rows[0]
            if (username == usuario.correo && password == usuario.contraseña) {
                this.nombre = usuario.nombre
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


        // passport.use(new PassPortLocal(autenticarUsuario)); QUE PASA CON ESTO?




//    // ________________________
//     async setUsuario(nombre, apellido,edad,correo,contraseña) {
//         try {
//             const resul = await pool.query(`INSERT INTO usuario (nombre, apellido, edad, correo, contraseña) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [nombre, apellido, edad, correo, contraseña])
//             console.log(`Usuario ${resul.rows[0].usuario} registrado con éxito`)
//         }
//         catch (e) {
//             throw e;
//         }
//     }

//     async getUsuario(usuario, password) {
//         try {
//             const res = await pool.query('SELECT * FROM registrousuario where usuario = $1 and password = $2', [usuario, CryptoJS.SHA256(password).toString()])
//             if (res.rows.length === 0) {
//                 return { success: false, message: 'Nombre de usuario o contraseña incorrectos' };
//             } else {
//                 this.usuario = usuario;
//                 this.password = CryptoJS.SHA256(password).toString();
//                 return {
//                     success: true,
//                     usuario: res.rows[0].usuario
//                 }
//             }
//         } catch (err) {
//             return { success: false, message: 'Ocurrió un error en la base de datos' };
//         }
//     }

//     async login() {
//         try {
//           return { success: true };
//         } catch (err) {
//           return { success: false, message: 'Ocurrió un error durante la autenticación' };
//         }
//       }
//     }

