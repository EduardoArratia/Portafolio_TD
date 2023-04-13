import { Router } from "express";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator"
import passport from "passport";
import PassportLocal from "passport-local" // te permite guardar la info hasta finalizada la sesion.
import session from "express-session"
import cookieParser from "cookie-parser";
import pg from "pg";
import { Usuario } from '../public/js/clases/usuarios.js';
const usuario = new Usuario();
// proteccion de datos de la base de datos
// import CryptoJS from "crypto-js" para encriptar contraseña --- AUN NO LO UTILIZO


const router = Router();
const PassPortLocal = PassportLocal.Strategy // para qué, es una clase?

let nombre; // No entiendo esta variable
let autenticacion = false;

    
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

// ACTIVAR CUANDO SE ESTE TRABAJANDO Y NO TENER QUE LOGEAR A CADA RATO
// app debe estar solo asi para que no se entre sin autentificar
// router.get("/mapa", (req, res) => {
//     res.render("mapa")
// })


router.get("/mapa", (req,res,next) =>{                   
    if(req.isAuthenticated()){ 
        autenticacion = true
        return next()
    }else{
        res.redirect("/login")
    }
},
(req, res) =>{ 
    res.render("mapa",{autenticacion})
})

// acceder a bootcamp
router.get("/bootcamp", (req, res) => {
    res.render("bootcamp")
})

// acceder a login
router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/registro", (req, res) => {
    res.render("registro")
})
//RUTAS ESPECIFICAS


//utiliza la clase usuario para hacer login
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login"
  }), function(req, res) {
    const autenticacion = true;
    const nombre = req.user.name;
    console.log(nombre)
    res.render("mapa", { autenticacion, nombre });
  });
  // configurar el passport usando la clase a través de usuario.autenticar
  passport.use(new PassPortLocal(function(username, password, done) {
    usuario.autenticar(username, password, done);
  }));


// // UTILIZA LA CLASE USUARIO PARA AGREGAR

router.post("/registro", (req, res) => {
    const { nombre, apellido, edad, correo,contraseña} = req.body;
  
    const user = new Usuario();
    user.agregarUsuario(nombre, apellido, edad, correo,contraseña)
  
    res.redirect("/login")
  });


//Crear usuario
//lo que se registra en el input debe pasarse a otro formato para poder subirlo a la BD

export default router //exportar todo lo que está en routes.jss