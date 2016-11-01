var io = require('socket.io')(1280);

var m = require('./db').models;

io.sockets.on( 'connection', function( socket ) {
  console.log('socket connect');
  socket.on('leave', function(room) {
      socket.leave(room);
      console.log("User Leave the room: "+socket.room);
      io.sockets.in(room).emit('log', {
        users: io.sockets.adapter.rooms[room]
      });
  });
  socket.on('join', function(room) {
      socket.join(room);
      socket.room = room;
      console.log("User Joined the room: "+socket.room);
      io.sockets.in(room).emit('log', {
        users: io.sockets.adapter.rooms[room]
      });
  });
  socket.on('snd', function (data) {
      //console.log('snd: ' + JSON.stringify(data));
      trySave(data);
      data.room?
      io.sockets.in(data.room).emit('res', data):
      void(0);
  });
  socket.on('disconnect',function(){
    console.log('disconnect');
    io.sockets.in(socket.room).emit('log', {
      users: io.sockets.adapter.rooms[socket.room],
      disconnect: true
    });
  })
});


function trySave(dt){
  m.canvas.findOne({name: dt.room }, function(err,obj){
    var edit = obj ? dt.add || dt.obj : undefined ;
    if(edit && edit.id){
      for(var o in obj.objects){
        if(obj.objects[o].id == edit.id){
          console.log(dt.userseed);
          for(var i in edit){
            obj.objects[o][i] = edit[i];
          }
          sv(obj , obj.objects);
          return dt;
        }
      }

      if(edit && edit.id){
        obj.objects.push(edit);
        sv(obj , obj.objects);
        return dt;
      }
    }

    var dl = obj && dt.rem ? dt.rem : undefined ;
    if(dl && dl.id){
      console.log('DELETE');
      for(var o in obj.objects){
        if(obj.objects[o].id == dl.id){
          obj.objects.splice(o, 1);
          sv(obj , obj.objects);
          return dt;
        }
      }
    }
  });
}

function sv(mdl , ob){
  console.log('yeahhh');
  mdl.set( 'objects' , ob);
  mdl.markModified('objects');
  mdl.save();
}

var hist = {
  push: function(o){
    (new m.history(o)).save(function(err){
      console.log(err?err:'SUPER!!!!');
    }) ;
  }
}
