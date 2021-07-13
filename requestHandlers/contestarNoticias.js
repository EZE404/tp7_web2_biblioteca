const fs = require('fs');
const pug = require('pug');

const noticias = [
    {
        "nombre": "asfasdf",
        "apellido": "vvcxxcvb",
        "id": 1
    },
    {
        "nombre": "qwrerqwre",
        "apellido": "hgjghj",
        "id": 2
    }
]

module.exports.reqHandler = (req, res) => {

    fs.readFile('public/json/noticias.json', async (err, contenido) => {
        if (!err) {
            const contenidoParseado = await JSON.parse(contenido);
            console.log(contenidoParseado.noticias);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            const body = pug.renderFile('views/noticias.pug', { noticias: contenidoParseado.noticias });
            res.write(body);
            //res.write('<h1>Saludando desde /index</h1>');
            res.end();
        }
        
    })

}