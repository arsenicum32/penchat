String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var sock = {
  name: 0,
  room: 'test',
  changeroom: function(room, callback){
    socket.emit('leave', this.room);
    this.room = room;
    socket.emit('join', room);
    $.get(serverAddr+ '/api/'+this.room+'/get/canvas',function(data){
      canvas.loadFromJSON(data,function() {
        callback?callback():void(0);
        canvas.renderAll();
      });
    });
  },
  change: function(o){
    socket.emit('snd',{room: this.room , userseed: this.name , obj: o});
  },
  add: function(o){
    o.type ? o.type = o.type.capitalize() : void(0);
    socket.emit('snd',{room: this.room , userseed: this.name , add: o});
  },
  rem: function(o){
    o.id ? void(0) : o.id = o.name;
    socket.emit('snd', {room: this.room , userseed: this.name , rem: o});
  }
}

$(document).ready(function(){
  router.get().canvas ?
  sock.room = router.get().canvas:
  void(0);
  serverAddr = 'www.sliceofring.ru';//'http://localhost:9000';//'http://85.143.209.210';
  socketAddr = 'ws.sliceofring.ru';//'http://localhost:1280';
  (function(){
    if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
      //85.143.209.210
          socket = io.connect(socketAddr, { 'connect timeout': 5000 }); //{'transports': ['xhr-polling']});
        } else {
          socket = io.connect(socketAddr, { 'connect timeout': 5000 });
          var ss = socket.socket;

        }

        socket.on('connect_error', function(){
          addText({text:`connect server error ¯\(°_o)/¯`});
        });

        socket.on('reconnect',function(){
          addText({text:'reconnect !!!',fontSize: 500});
          location.reload();
        });

        socket.on('connect', function () {
          socket.emit('join', sock.room );

          $.get(serverAddr+ '/api/'+sock.room+'/get/canvas',function(data){
            canvas.loadFromJSON(data);
            canvas.renderAll();
          });

          socket.on('log', function(msg){
            console.log(msg);
            sock.name?
            console.log(sock.name):
            sock.name = Object.keys(msg.users.sockets)[ Object.keys(msg.users.sockets).length - 1]
            ;

            $('#usersQuantity').text( Object.keys(msg.users.sockets).length );

            items.counter = '';
            var K = Object.keys(msg.users.sockets);

            for(var i in K){
              items.counter +=
                '<div class="profile">'+
                  '<img class="ava '+(sock.name==K[i]?'me':'')+'" src="https://robohash.org/'+K[i].slice(0,5)+'.png" />'+
                  '<small>'+ K[i].slice(0,5) +'</small>'+
                '</div>'
            }
          })

          socket.on('res', function(msg){
            console.log(msg);
            if(msg.obj && msg.userseed){
              msg.userseed != sock.name ? objEdit(msg.obj) : void(0);
              canvas.renderAll();
            }else if(msg.add && msg.userseed){
              msg.userseed != sock.name ? addObject(msg.add) : void(0);
              canvas.renderAll();
            }else if(msg.rem && msg.userseed){
              msg.userseed != sock.name ? removeObject(msg.rem.id) : void(0);
              canvas.renderAll();
            }
          })

          $('#logbox').hide(1500);
          //callFabricOn();
          socket.on('people change', function (msg) {  // msg.render.hasOwnProperty('background')
            $('#counter span').text(msg);
          });
        });
  })();
});
