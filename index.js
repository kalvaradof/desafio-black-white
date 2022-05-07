// Requerimientos(4)
const http = require('http')
const url = require('url')//parra ingresar la url de la imagen
const fs = require('fs')
const Jimp = require('jimp')

http.createServer((req, res) => {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        fs.readFile('index.html', 'utf8', (err, html) => {
            res.end(html)
        })
    }
    //3. Los estilos de este HTML deben ser definidos por un archivo CSS alojado en el servidor.
    if (req.url == '/estilos') {
        res.writeHead(200, { 'Content-Type': 'text/css' })
        fs.readFile('style.css', (err, css) => {
            res.end(css)
        })
    }
    if (req.url.includes('/cambiar-imagen')) {
        const parametros = url.parse(req.url, true).query//va a cambiar la imagen segun la url que se ingrese en el form
        const imagenUrl = parametros.url
        // 4. El formulario debe redirigir a otra ruta del servidor que deberá procesar la imagen
        //tomada por la URL enviada del formulario con el paquete Jimp. La imagen debe ser
        //procesada en escala de grises, con calidad a un 60% y redimensionada a unos 350px
        //de ancho. Posteriormente debe ser guardada con nombre “newImg.jpg” y devuelta al cliente.
        Jimp.read(`${imagenUrl}`, (err, imagen) => {
            imagen
                .resize(350, Jimp.AUTO)
                .greyscale()
                .quality(60)
                .writeAsync('newImg.jpg')
                .then(() => {
                    fs.readFile('newImg.jpg', (err, Imagen) => {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                        res.end(Imagen)
                    })
                })
        })
    }
}).listen(3000, () => console.log('Servidor ON'))







