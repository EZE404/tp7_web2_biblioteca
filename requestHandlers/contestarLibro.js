
const pug = require('pug');
const pool = require('../database');
const querystring = require('querystring');
const path = require('path');
const url = require('url');


module.exports.reqHandler = async (req, res) => {
    const query = querystring.parse(new URL(req.url, "http://localhost:8000").search.substr(1));
    console.log('Entró a reqHandler de contestarAutor');
    console.log(query.dni);

    try {
        const autor = await pool.query('select * from autor where dni = ?', [query.dni]);
        console.log('autor: ', autor);
        
        if (autor.length) {
            const cuerpo = pug.renderFile('views/biografia.pug', {autor:autor[0]});
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(cuerpo);
            res.end();
        } else {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write("<h1>No existe ese autor</h1>");
            res.end();
        }
    } catch (error) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(error);
        res.end();
    }
}
