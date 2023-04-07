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


app.use(cors());

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

http.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
