const app = require('./app')

// starting server

const main = async () => {
    await app.listen(app.get('port'))
    console.log(
        `Servidor HTTP conectado, escuchando en el puerto ${app.get('port')}`
    );
}

main()




// const express = require('express');
// const rutas = require('./routes/productos');
// const app = express();
// const path = require('path');

// app.set("json spaces", 2)
// app.set('views', path.join(__dirname, './views'))
// app.set('view engine', 'pug')

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
// app.use('/html', express.static('html'))

// app.use("/api/productos", rutas)

// const server = app.listen(8080, () => {
//     console.log(`Servidor HTTP conectado, escuchando en el puerto ${server.address().port}`)
// })
// server.on('error', err => console.log(`Error en servidor: ${err}`))