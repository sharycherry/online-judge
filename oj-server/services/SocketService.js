module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log(socket);
    var message = socket.handshake.query['message'];
    console.log('server received message: ' + message);
    io.to(socket.id).emit('message', 'hehe from server');
  });
}