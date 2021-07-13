const querystring = require("querystring");
const fs = require("fs");
const formidable = require('formidable');
const pug= require('pug');
const pool = require('../database');
const _ = require('lodash');

module.exports.reqHandler = (req, res) => {
	console.log('entró a reqHandler')
	const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
		//console.log('files: ', files);
		if (files.imagen.name) {console.log('hay imagen cargada')} else {console.log('no se cargó imagen');}
		console.log('entró al callback de form.parse');
		if (!err) {
			console.log('fields ', fields);
			let dni = fields.dni;
			
			try {
				const respuesta = await pool.query(`select * from autor where dni = ${dni}`);
				console.log('respuesta sql ', respuesta.length, respuesta);

				if (respuesta.length > 0) {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write('El autor con ese dni ya existe');
					res.end();
					return;
				}
				
				let extension = files.imagen.name.split(".")[1];
				
				console.log('extension de la imagen:')
				console.log(extension);

				if (extension == "jpg" || extension == "png" || extension == "jpeg") {
					console.log('entró al if de la extension')
					let oldpath = files.imagen.path;
					let newpath = "public/img/" + fields.dni + "." + extension;
					fields.foto = "img/" + fields.dni + "." + extension;
					console.log('rutas foto: ', oldpath, newpath, fields.foto);

					fs.rename(oldpath, newpath, function (err) {
						if (err) {
							console.error(err);
							res.writeHead(500, { "Content-Type": "text/html" });
							res.write('<h1>Error en el guardado de la foto en el servidor</h1>');
							res.end();
							return;
						}

						console.log("foto guardada");
						
					});

				} else {
					//const cuerpo = pug.renderFile('vistas/errorExtensionFoto.pug', {extension:extension});
					res.writeHead(200, { "Content-Type": "text/html" });
					res.write('formato de imagen no soportado');
					res.end();
					return;
				}									
				
				
				
				console.log('se procede a insertar el autor');
				
				console.log('fields después de guardar foto: ', fields);
				const sql = `INSERT INTO autor SET dni = ?, nombre = ?, biografia = ?, mail = ?, foto = ?`;
				const respuesta2 = await pool.query(sql, [fields.dni, fields.nombre, fields.biografia, fields.email, fields.foto]);

				console.log('respuesta2 INSERT: ', respuesta2);

				if (respuesta2.affectedRows) {
					res.writeHead(200, {'Content-Type':'text/html'});
					res.end('autor guardado');
				}


			} catch (error) {
				console.error('ERROR:   ', error);
			}

		}

    });
}
	
