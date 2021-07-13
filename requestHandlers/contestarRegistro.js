const fs = require('fs');
const pug = require('pug');
module.exports.reqHandler = async (req, res) => {

    fs.readFile('public/json/categorias.json', async (err, contenido)=>{
        if(!err){
            const contenidoParseado= await JSON.parse(contenido);
            console.log(contenidoParseado);
            res.writeHead(200, {'Content-Type':'text/html'});
            const cuerpo = pug.renderFile('views/registro.pug',{categorias: contenidoParseado});
            res.write(cuerpo);
            res.end();
        }
    });
    

    
}