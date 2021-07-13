const querystring = require("querystring");
const fs = require("fs");
const formidable = require('formidable');
const pug= require('pug');


module.exports.reqHandler = (req, res) => {
	console.log('entró a reqHandler')
	const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
		console.log('entró al callback de form.parse');
		if (!err) {
			fs.readFile('public/json/noticias.json', async (err, contenido) => {
				if (!err) {
					const contenidoParseado = await JSON.parse(contenido);
					const id = contenidoParseado.contador + 1;

					fields.id = id;

					console.log('agregado id a fields');
					console.log(fields);

					let extension = files.imagen.name.split(".")[1];
					console.log('extension de la imagen:')
					console.log(extension);
					if (extension == "jpg" || extension == "png" || extension == "jpeg") {
						console.log('entró al if de la extension')
						let oldpath = files.imagen.path;
						let newpath = "public/img/" + fields.id + "." + extension;
						let urlImagen = "img/" + fields.id + "." + extension;
						
						console.log(oldpath, newpath, urlImagen);

						fs.rename(oldpath, newpath, function (err) {
							if (err) {
								console.error(err);
								res.writeHead(500, { "Content-Type": "text/html" });
								res.write('<h1>Error en el guardado de la foto en el servidor</h1>');
								res.end();
								return;
							}

							console.log("foto guardada");
							fields.imagen = urlImagen;
							contenidoParseado.noticias.push(fields);
							contenidoParseado.contador++;

							fs.writeFile('public/json/noticias.json', JSON.stringify(contenidoParseado, null, 2), (e) => {
								if (!e) {
									res.writeHead(200, {'Content-Type': 'text/html'});
									const cuerpo = pug.renderFile('views/noticia_saved.pug');
									res.write(cuerpo);
									res.end();
								}
							})


						});
					} else {
						const cuerpo = pug.renderFile('vistas/errorExtensionFoto.pug', {extension:extension});
						res.writeHead(500, { "Content-Type": "text/html" });
						res.write(cuerpo);
						res.end();
						return;
					}					
				}
			})
		}

    });
}



module.exports.reqHandler2 = (req, res) => {
	console.log("url: " + req.url);
	console.log("entro a reqHandler de guardarform.js");

	let datos = '';
	req.on('data', (parte) => {
		datos += parte;
	})

	req.on('end', async () => {
        console.log("datos: " + datos);
		try {
			console.log("entro al req.on_end");
			let datosParseados = await querystring.parse(datos);
            console.log('parse: '+datosParseados.nombre);

			fs.readFile('public/json/registro.json', async (e, contenido) => {
				if (!e) {
					let jsonParseado = await JSON.parse(contenido); // no funciona contenido.json()
					datosParseados.id = jsonParseado[0].contador + 1;
					jsonParseado.push(datosParseados); //{ 'name':'algo', 'apellido':'algo' }
					jsonParseado[0].contador++;
					
					//jsonParseado[0].contador = jsonParseado[0].contador++;

					fs.writeFile(
						'public/json/registro.json',
						JSON.stringify(jsonParseado, null, 2),
						(e) => {
							if (!e) {
								res.writeHead(200, { "Content-Type": "text/html" });
								res.write("<h1>DATOS GUARDADOS</h1>");
								res.end();
							} else {
                                console.log('error al escribir json: '+e.message)
                            }
						}
					);
				} else {
                    console.log('error en readFile: '+e.message);
                }
			});
		} catch (error) {
			console.error("Hubo error en req.on: " + error.message);
			res.writeHead(500, { "Content-Type": "text/html" });
			res.write("<h1>ERROR AL GUARDAR EN JSON: " + error.message + "</h1>");
			res.end();
		}
	});
};
