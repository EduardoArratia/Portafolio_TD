// todos estos import son necesarios para la inicializacón de la página
import express from "express";
import hbs from "hbs";
import { fileURLToPath } from "url"; // 
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

hbs.registerPartials(path.join(__dirname, 'views', 'partials'), function (err) {})
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', (req,res) => { // para usar routes, en vez de app usar routes, LEER SOBRE MODULES DE EXPRESS Y LOS MIDDLE WORD
    res.render('index');
})

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});