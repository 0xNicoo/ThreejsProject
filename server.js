const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
});

let inputX = 0;
let inputY = 0;
const maxVel = 4;

app.use(cors());

app.use(express.static('dist'));

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    socket.on('arrowleft', () => {
        inputX = -maxVel;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowright', () => {
        inputX = maxVel;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowup', () => {
        inputY = +maxVel;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowdown', () => {
        inputY = -maxVel;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

http.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

function resetInputs(){
    inputX = 0;
    inputY = 0;
}