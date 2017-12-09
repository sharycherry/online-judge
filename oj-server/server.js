var express = require('express')
var app = express()
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require("path");
var http = require('http');

var socket_io = require('socket.io');
var io = socket_io();
var socketService = require('./services/SocketService.js')(io);

mongoose.connect("mongodb://user:user@ds117316.mlab.com:17316/soj");
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use("/api/v1", restRouter);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
})

// var server = http.createServer(app);
// io.attach(server);
// server.listen(3000);

// server.on('error', onError);
// server.on('listening', onListening);

// function onError(error){
//     throw error;
// }

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr == 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   console.log('Listening on ' + bind);
// }




