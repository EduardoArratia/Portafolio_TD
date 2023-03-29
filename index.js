// todos estos import son necesarios para la inicializacón de la página
import express from "express";



//Configura el directorio con la URL donde se va a ver.

import {dirname, join} from "path";
import { fileURLToPath } from "url";


//importar rutas desde routes.js en carpeta routes
import indexRoutes from "./routes/routes.js"

//Asignar express a una constante
const app = express();

// __dirname es donde quedará guardado de forma dínamica el path de los archivos en caso de mover el proyecto a otra carpeta o dirección
const __dirname = dirname(fileURLToPath(import.meta.url));

//Donde va la carpeta public donde irán css
app.use(express.static(join(__dirname,"/public")))

//Donde va la carpeta public donde irán los script
app.use(express.static(join(__dirname,"/js")))

//Configuracion HandleBars //
import hbs from "hbs";
hbs.registerPartials(__dirname + '/views/partials');
app.set("views", join(__dirname, "views"))
// app.set("views", join(__dirname, "views"))
app.set('view engine', 'hbs');


//Configurar que express use las rutas del archivo routes.js
app.use(indexRoutes)

//Levanta el servidor: hace que se vea la pagina y escuche este codigo hacia el server 3000
app.listen(3000,function (){
    console.log("Server cargado")
})

