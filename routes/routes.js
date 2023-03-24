import { Router } from "express";
const router = Router();



router.get ('/', (req,res) => { // al usar routes, los get ya no son app.use sino router.get LEER SOBRE MODULES DE EXPRESS Y LOS MIDDLE WORD
    res.render('index');
})

export default router //exportar todo lo que está en routes.js