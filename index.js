// todos estos import son necesarios para la inicializacón de la página
import express from "express";

//Configura el directorio con la URL donde se va a ver.
import { dirname,join } from "path";
import { fileURLToPath } from "url";  
//configura hbs
import hbs from "hbs";

//importar rutas desde routes.js en carpeta routes
import indexRoutes from "./routes/routes.js";
import bodyParser from "body-parser"

//Asignar express a una constante
const app = express();

app.use(bodyParser.json()); //para soportar JSON encoded bodies
app.use(bodyParser.urlencoded({
    extended: true}));

// __dirname es donde quedará guardado de forma dínamica el path de los archivos en caso de mover el proyecto a otra carpeta o dirección
const __dirname = dirname(fileURLToPath(import.meta.url));
hbs.registerPartials(join(__dirname, '/views/partials'));
//Configurar que express use las rutas del archivo routes.js
app.use(indexRoutes)
////Configuración de carpeta donde están los archivos
app.set('view engine', 'hbs');
app.set('views','./views');
app.use(express.static("public"));


//Levanta el servidor: hace que se vea la pagina y escuche este codigo hacia el server 3000
app.listen(3000,function (){
    console.log("Server cargado")
})