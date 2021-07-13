const http = require('http');
const fs = require('fs');
const path = require('path');
const url2 = require('url');
const querystring = require('querystring');

const contestarIndex = require('./requestHandlers/contestarIndex.js');
const contestarContacto = require('./requestHandlers/contestarContacto.js');
const contestarNoticias = require('./requestHandlers/contestarNoticias.js');
const contestarAcerca = require('./requestHandlers/contestarAcerca.js');
const contestarRegistro = require('./requestHandlers/contestarRegistro.js');
const contestarGuardarForm = require('./requestHandlers/contestarGuardarForm.js');
const contestarFormAutor = require('./requestHandlers/contestarFormAutor.js');
const contestarSaveFormAutor = require('./requestHandlers/contestarSaveFormAutor.js');
const contestarAutor = require('./requestHandlers/contestarAutor.js');
const contestarFormLibro = require('./requestHandlers/contestarFormLibro.js');
const contestarSaveFormLibro = require('./requestHandlers/contestarSaveFormLibro.js');
const contestarLibro = require('./requestHandlers/contestarLibro.js');

http.createServer(requestHandler).listen(8000, () => {
    console.log('Servidor iniciado');
});

const tiposMime = {
    '.jpg' : 'image/jpeg',
    '.jpeg' : 'image/jpeg',
    '.html': 'text/html',
    '.css' : 'text/css',
    '.js' : 'application/javascript',
    '.ico' : 'image/x-icon',
    '.png' : 'image/png',
    '.gif' : 'image/gif'
}

function requestHandler(req, res) {
/*     const objQuerystrings = querystring.parse(new URL(req.url, "http://localhost:8000").search.substr(1));
    console.log('ruta2: ');
    console.log(ruta2); */
    const ruta = new URL(req.url, "http://localhost:8000").pathname;
    //const ruta = url2.parse(req.url, true);
    //console.log('query antes de enrutar: ', query);

    if (req.url == '/' || req.url == '/index') {
        contestarIndex.reqHandler(req, res);
        return
    }

    if (req.url == '/contacto') {
        contestarContacto.reqHandler(req, res);
        return
    }

    if (req.url == '/noticias') {
        contestarNoticias.reqHandler(req, res);
        return
    }
    if (ruta == '/autor') {
        contestarAutor.reqHandler(req, res);
        return
    }

    if (req.url == '/acerca') {
        contestarAcerca.reqHandler(req, res);
        return
    }

    if (ruta == '/registro') {
        contestarRegistro.reqHandler(req, res);
        return;
    }
    //---------AUTOR----------
    if (ruta == '/form_autor') {
        contestarFormAutor.reqHandler(req, res);
        return;
    }
    if (ruta == '/alta_autor') {
        contestarSaveFormAutor.reqHandler(req, res);
        return;
    }
    //---------Libro---------
    if (ruta == '/form_libro') {
        contestarFormLibro.reqHandler(req, res);
        return;
    }
    if (ruta == '/alta_libro') {
        contestarSaveFormLibro.reqHandler(req, res);
        return;
    }
    if (req.url == '/insertar') {
        contestarRegistro.reqHandler(req, res);
        return;
    }

    if (req.url == '/guardarForm') {
        contestarGuardarForm.reqHandler(req, res);
        return;
    }

    let url = 'public'+req.url;

    console.log(url);

    fs.stat(url, (error) => {
        if (!error) {
            fs.readFile(url, (error, contenido) => {
                if (!error) {
                    let extension = path.extname(url);
                    let content_type = tiposMime[extension];

                    res.writeHead(200, {'Content-Type':content_type});
                    res.write(contenido);
                    res.end();
                } else {
                    res.writeHead(500, {'Content-Type':'text/html'});
                    res.write('<h1>No se pudo leer 404.html</h1>');
                    res.end();
                }
            })
        } else {
            contestar404(req, res);
        }
    })

}


function contestar404(req, res) {
    fs.stat('public/html/404.html', (error) => {
        if (!error) {
            fs.readFile('public/html/404.html', 'utf-8', (error, contenido) => {
                if (!error) {
                    res.writeHead(404, {'Content-Type':'text/html'});
                    res.write(contenido);
                    res.end();
                } else {
                    res.writeHead(500, {'Content-Type':'text/html'});
                    res.write('<h1>No se pudo leer 404.html</h1>');
                    res.end();
                }
            })
        } else {
            res.writeHead(404, {'Content-Type':'text/html'});
            res.write('<h1>No se encontró 404.html</h1>');
            res.end();
        }
    })
}