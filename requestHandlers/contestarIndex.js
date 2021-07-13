
const pug = require('pug');

module.exports.reqHandler = (req, res) => {

    res.writeHead(200, {'Content-Type':'text/html'});
    const body = pug.renderFile('views/index.pug');
    res.write(body);
    res.end();
}