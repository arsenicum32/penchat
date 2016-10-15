var io = require('socket.io')(1280);

io.sockets.on( 'connection', function( socket ) {
  console.log('socket connect');
  socket.on('join', function(room) {
      socket.join(room);
      socket.room = room;
      console.log("User Joined the room: "+socket.room);
  });
  socket.on('snd', function (data) {
      console.log('snd: ' + JSON.stringify(data));
      data.room?
      io.sockets.in(data.room).emit('res', data):
      void(0);
  });
});
