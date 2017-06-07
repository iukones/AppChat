'use strict'
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// se usa middleware de express.
app.use(express.static('client'));

// se crea una ruta de prueba para el hola mundo.
app.get('/hola-mundo', function (req, res) {
    res.status(200).send('Hola mundo desde express');
});

var messages = [{
  id: 1,
  text: 'Bienvenido al Chat de Tinsa',
  nickname: 'imartinez'
}];

// se crea conexion a "socket.oi"
io.on('connection', function (socket) {
    console.log("El usuario con IP: "+socket.handshake.address+" se ha conectado...");

    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
      messages.push(data);

      io.sockets.emit('messages', messages);
    });

});

// se configura puerto de servidor local.
server.listen(6677, function() {
  console.log('Servidor funcionando en http://localhost:6677');

});
