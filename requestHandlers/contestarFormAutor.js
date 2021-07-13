//const fs = require('fs');
const pug = require('pug');

module.exports.reqHandler = (req, res) => {

    res.writeHead(200, {'Content-Type': 'text/html'});
    const cuerpo = pug.renderFile('views/alta_autor.pug');
    res.write(cuerpo);
    res.end();
    
}