//La conexión a la base de datos queda aisalada.

import pg from "pg";
const {Pool} = pg;
import dotenv from "dotenv"

//configurar dotenv
dotenv.config()

const pool =new Pool({
    user: process.env.DB_USER,
    host:process.env.DB_HOST,
    database: process.env.DB, //nombre de database
    password: process.env.DB_PASS,
    port:process.env.DB_PORT
})
    pool.connect(function(err){
        if(err) throw err;
        console.log("conectado");


});




export default pool;