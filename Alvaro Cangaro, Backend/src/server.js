const app = require('./app')

const main = async () => {
    await app.listen(app.get('port'))
    console.log(
        `Servidor HTTP conectado, escuchando en el puerto ${app.get('port')}`
    );
}

main()
