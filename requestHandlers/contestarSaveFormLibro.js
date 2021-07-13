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
		console.log('entró al callback de form.parse');
		if (!err) {
			console.log(fields);

			let autores = [];
			let participacion = [];
			_.forIn(fields, function(value, key) {
				console.log('lodash key ',key);
				if (key.substring(0, 5) == 'autor') {
					autores.push(value);
				}
				if (key.substring(0, 13) == 'participacion') {
					participacion.push(value);
				}
			});
			console.log('autores por lodash: ', autores);
			for(dni of autores) {
				try {
					const respuesta = await pool.query(`select * from autor where dni = ${dni}`);
					console.log('respuesta sql ', respuesta.length, respuesta);

					if (!respuesta.length) {
						res.writeHead(200, {'Content-Type':'text/html'});
						res.end(`Al menos uno de los autores cargados no existe`);
						return;
					}
				} catch (error) {
					console.log('Error en control de existencia de autores: ', error);
				}
			}

			try {
				const isbn = await pool.query(`select * from libro where isbn = ${fields.isbn}`);

				if (isbn.length) {
					res.writeHead(200, {'Content-Type':'text/html'});
					res.end(`Ya existe el libro con ISBN: ${fields.isbn}`);
					return;
				}

				const insert_libro = await pool.query(`insert into libro set isbn = ${fields.isbn}, titulo = ${fields.titulo}, descripcion = ${fields.descripcion}, año = ${fields.anio}, paginas = ${fields.paginas}, genero = ${fields.genero}`);

				console.log('Se guardó el libro. Se procede a insertar en libro-autor');
				if (insert_libro.affectedRows) {
					console.log('Entró al if de insert_libro.affectedRows');
					console.log('autores: ', autores);
					for(dni in autores) {
						console.log('Entró al for dni in autores, dni: ', autores[dni]);
						const args = [autores[dni], fields.isbn, participacion[dni]];
						const sql = `insert into libro_autor set dni_autor = ?, isbn_libro = ?, participacion = ?`;
						const insert_libro_autor = await pool.query(sql, args);
						
						if (!insert_libro_autor.affectedRows) {
							res.writeHead(200, {'Content-Type':'text/html'});
							res.end(JSON.stringify(insert_libro_autor));
							return;
						}
					}

					res.writeHead(200, {'Content-Type':'text/html'});
					res.end(`Libro guardado`);
				}
			} catch (error) {
				res.writeHead(200, {'Content-Type':'text/html'});
				console.log('error en el try catch de linea 40 (buscar isbn)');
				console.log('error en el trycatch de linea 40: ', error)
				res.end('error en el try catch de linea 40 (buscar isbn)');
			}

		}

    });
}
	
