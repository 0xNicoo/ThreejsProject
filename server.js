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
const maxVel = 1;

app.use(cors());

app.use(express.static('dist'));

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    socket.on('arrowleftDown', () => {
        inputX = -maxVel;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowrightDown', () => {
        inputX = maxVel;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowupDown', () => {
        inputY = +maxVel;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowdownDown', () => {
        inputY = -maxVel;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowleftUp', () => {
        inputX = 0;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowrightUp', () => {
        inputX = 0;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowupUp', () => {
        inputY = 0;
        io.emit('outputs', {inputX, inputY})
        resetInputs();
    })

    socket.on('arrowdownUp', () => {
        inputY = 0;
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