const express = require('express');
const app = express();
const session = require('express-session');
const productsTest = require('./routes/productsTest');
const Chat = require('./models/chat.js');
const path = require('path');
const { Server: IOServer } = require('socket.io');
const Container = require('./container');
const { dbConnectionMySQL, dbConnectionSQLite } = require('./dbConfig');
const passport = require('passport');
const User = require('./models/users.js');
const randomNumbers = require('./routes/randomNumbers');
require('dotenv').config();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).default({ port: 8080, mode: 'fork' }).alias({ p: 'port', m: 'mode', }).argv;
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const infoRoutes = require('./routes/infoRoutes');
const normalizeMensajes = require('./normalizr');
const registerStrategy = require('./passport/register');
const loginStrategy = require('./passport/login');
const cluster = require('cluster');
const os = require('os');

let expressServer;

if (argv.mode === 'cluster' && cluster.isPrimary) {
    const threads = os.cpus();

    threads.map(() => cluster.fork());

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    expressServer = app.listen(argv.port, () =>
        console.log(
            `Servidor escuchando en el puerto ${argv.port} - worker: ${process.pid}`
        )
    );
}

const io = new IOServer(expressServer);
const products = new Container(dbConnectionMySQL, 'products');

app.use(
    session({
        secret: process.env.SESSIONSECRET,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 500000,
        },
        rolling: true,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/productos-test', productsTest);
app.use('/api/randomsN', randomNumbers);
app.use('/', loginRoutes);
app.use('/', registerRoutes);
app.use('/info', infoRoutes);
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendFile(path.join(__dirname, '../public/user.html'));
    } else {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    }
});

app.get('*', (req, res) => {
    res.status(404).send('404 - Ruta no encontrada');
});

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

const chat = new Chat('chats', {
    author: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    text: { type: String, required: true },
});

io.on('connection', async (socket) => {
    console.log('Usuario conectado ' + socket.id);

    const normalizedMessages = normalizeMensajes(await chat.getAll());

    socket.emit('server:messages', normalizedMessages);
    socket.emit('server:products-test', { products: [] });

    socket.on('client:addProduct', async (product) => {
        await products.save(product);
        io.emit('server:products', await products.getAll());
    });

    socket.on('client:newMessage', async (message) => {
        const savedMsg = await chat.save(message);
        const normalizedMessages = normalizeMensajes(await chat.getAll());
        io.emit('server:messages', normalizedMessages);
    });
});