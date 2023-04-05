import { Router } from "express";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator"
import passport from "passport";
import PassportLocal from "passport-local" // te permite guardar la info hasta finalizada la sesion.
import session from "express-session"
import cookieParser from "cookie-parser";
import pg from "pg";

import dotenv from "dotenv" // proteccion de datos de la base de datos



const router = Router();
const PassPortLocal = PassportLocal.Strategy // para qué, es una calse?
const {Pool} = pg;


let nombre;
let autenticacion = false;


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
    


// PARA INICIAR SESION
router.use(bodyParser.json()); //para soportar JSON encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

router.use(cookieParser('secreto'));
router.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));

//Configuracion Passport //
router.use(passport.initialize());
router.use(passport.session());


// Para buscar el usuario en la base de datos y validarlo en el input
passport.use(new PassPortLocal(function (username, password, done) {
    // done(err,{name: "uriel"},) usa 3 argumentos, name define si el inicio se inicio correctamente
    let usuario
    pool.query(`SELECT correo, contrasena, id, nombre from usuarios where correo LIKE $1`, [username], (error, res, fields) => {
        if (error) {
            throw error
        } else {
            usuario = res.rows[0]
            if (username == usuario.correo && password == usuario.contrasena) {
                nombre = usuario.nombre
                return done(null, { id: usuario.id, name: usuario.nombre})
            }
            return done(null, false)
        }
    })
}))






//{id: 1 , name:"cody"})
//1 => serializacion pasarle todo el objeto a un dato, cuando necesito usar al usario tomo el id y retorno el objeto (deserializacion)
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    done(null, { id });
})

// RUTAS GENERALES

// acceder a home
router.get("/", (req, res) => {
    res.render("home")
})

// acceder a arquitectura
router.get("/arquitectura", (req, res) => {
    res.render("arquitectura")
   
})

// app debe estar solo asi para que no se entre sin autentificar
router.get("/app", (req,res,next) =>{                   
    if(req.isAuthenticated()){ 
        autenticacion = true
        return next()
    }else{
        res.redirect("/login")
    }
},
(req, res) =>{ 
    res.render("app",{autenticacion})
})

// acceder a bootcamp
router.get("/bootcamp", (req, res) => {
    res.render("bootcamp")
})

// acceder a login
router.get("/login", (req, res) => {
    res.render("login")
})

//RUTAS ESPECIFICAS


// Al logear se mete a la app
router.post("/login",passport.authenticate("local",
    {failureRedirect: "/login"}),
        function(req, res){
        autenticacion = true
        res.render("app",{autenticacion,nombre})
                        }                  
)


//Crear usuario
//lo que se registra en el input debe pasarse a otro formato para poder subirlo a la BD

export default router //exportar todo lo que está en routes.jss