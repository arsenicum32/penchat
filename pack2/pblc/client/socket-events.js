String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var sock = {
  name: 0,
  change: function(o){
    socket.emit('snd',{room:'test', userseed: this.name , obj: o});
  },
  add: function(o){
    o.type ? o.type = o.type.capitalize() : void(0);
    socket.emit('snd',{room:'test', userseed: this.name , add: o});
  },
  rem: function(o){
    o.id ? void(0) : o.id = o.name;
    socket.emit('snd', {room:'test', userseed: this.name , rem: o});
  }
}

$(document).ready(function(){

  (function(){
    if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
      //85.143.209.210
          socket = io.connect('http://localhost:1280', { 'connect timeout': 5000 }); //{'transports': ['xhr-polling']});
        } else {
          socket = io.connect('http://localhost:1280', { 'connect timeout': 5000 });
          var ss = socket.socket;

        }
        //$('#logbox').hide();

        socket.on('connect_error', function(){
          addText({text:`connect server error ¯\(°_o)/¯`});
        });

        socket.on('reconnect',function(){
          addText({text:'reconnect !!!',fontSize: 500});
          location.reload();
        });

        socket.on('connect', function () {
          socket.emit('join', 'test');

          $.get('http://localhost:9000/testdata',function(data){
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

          //socket.emit('snd', {foo:'bar',room:'test',message:'hello'})

          $('#logbox').hide(1500);
          //callFabricOn();
          socket.on('people change', function (msg) {  // msg.render.hasOwnProperty('background')
            $('#counter span').text(msg);
          });
        });
  })();
});
