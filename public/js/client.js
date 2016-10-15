var socket = io.connect( 'http://85.143.209.210:1280' );

socket.on('connect', function() {
     socket.emit('join', 'room'); //chat room id unique to two users
});

socket.on( 'mes', function( data ) {
     $("#chat" ).append('<div>' + data.name + ' : ' + data.message + '</div>');
});


$(document).ready(function(){
  $('#b').on('click', function(){
    //alert('test')
    sendpm('room' , $('#m').val(), $('#n').val() );
  })
})



//Form js
function sendpm(room,message,name) {
     socket.emit( 'mes', { room: room, message: message, name: name });
}
