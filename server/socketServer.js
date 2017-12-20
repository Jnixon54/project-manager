const socketServer = require('socket.io'); 
// Houses server-side socket event handling
module.exports = function(server) {
  const io = socketServer(server);
  let socketCount = 0;
  io.on('connect', socket => {
    socketCount++;
    console.log(`Socket opened: ${socket.id} Socket count: ${socketCount}`);
    socket.on('increase_count', data => {
      io.emit('update_client', {count: data.count += 1, processed: true})
    })
    
  })
}