//const fs = require('fs');
const pug = require('pug');

module.exports.reqHandler = (req, res) => {

    res.writeHead(200, {'Content-Type': 'text/html'});
    const cuerpo = pug.renderFile('views/form_libro.pug', {generos:{terror, drama, comedia, cienciaficcion}});
    res.write(cuerpo);
    res.end();
    
}