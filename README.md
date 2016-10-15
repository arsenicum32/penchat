#penchat api

Подключение к сокет-серверу:

```
var socket = io.connect( 'http://85.143.209.210:1280' ); // 85.143.209.210 сокет по этому ip

socket.on('connect', function() {
     socket.emit('join', 'room'); //комната и её получение
});

// получение сообщения
socket.on( 'res', function( data ) {
     $("#chat" ).append('<div>' + data.name + ' : ' + data.message + '</div>');
});


$(document).ready(function(){
  $('#b').on('click', function(){
    //alert('test')
    sendpm('room' , $('#m').val(), $('#n').val() );
  })
})

//отправка сообщения
function sendpm(room,message,name) {
     socket.emit( 'snd', { room: room, message: message, name: name });
}

```
