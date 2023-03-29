import { Router } from "express";
import bodyParser from "body-parser";
import passport from "passport";
import PassportLocal from "passport-local"
import session from "express-session"
import cookieParser from "cookie-parser";
import fs from "fs"
import express from "express";


const router = Router();
// PARA INICIAR SESION
router.use(bodyParser.json()); //para soportar JSON encoded bodies
router.use(bodyParser.urlencoded({
    extended: true}));
router.use(bodyParser.urlencoded({extended:true}));
router.use(cookieParser('secreto'));
router.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));

//Configuracion Passport //
router.use(passport.initialize());
router.use(passport.session());


passport.use(new PassportLocal(function(username,password,done){
    // done(err,{name: "uriel"},) usa 3 argumentos, name define si el inicio se inicio correctamente
    if (username === "codigofacilito" && password === "1234")
    return done(null,{id: 1 , name:"cody"});

    done(null,false);
}));
//{id: 1 , name:"cody"})
//1 => serializacion pasarle todo el objeto a un dato, cuando necesito usar al usario tomo el id y retorno el objeto (deserializacion)
passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
   done(null,{id: 1 , name:"cody"}) ;
})



router.get("/",(req,res)=>{
    // si ya inciamos mostar bienvenida
    res.render("home")
    // si no hemos iniciado sesion redireccionar a /login
})

router.get("/arquitectura",(req,res)=>{
    // si ya inciamos mostar bienvenida
    res.render("arquitectura")
    // si no hemos iniciado sesion redireccionar a /login
})

router.get("/bootcamp",(req,res)=>{
    // si ya inciamos mostar bienvenida
    res.render("bootcamp")
    // si no hemos iniciado sesion redireccionar a /login
})


router.get("/app",(req,res)=>{
    //mostar el formulario de login
    res.render("app")
    
    
})


router.get("/inicio",(req,res)=>{
    //mostar el formulario de login
    res.render("inicio")
    
    
})
router.get("/inicio",(req,res)=>{
    //mostar el formulario de login
    res.render("inicio")

})

router.post("/inicio", passport.authenticate('local',{
    successRedirect: "app",
    failureRedirect: "inicio",

}))

router.get("/fondo", (req,res)=>{
    res.render("fondo")

})




// router.get ('/', (req,res) => { // al usar routes, los get ya no son app.use sino router.get LEER SOBRE MODULES DE EXPRESS Y LOS MIDDLE WORD
//     res.render('index');
// })

export default router //exportar todo lo que está en routes.jss