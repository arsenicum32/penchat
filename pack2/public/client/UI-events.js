$(document).ready(function(){
  (function(){
    $('#Bhand').on('click', function(){
      //alert('hand');
    });
    $('#Badd').on('click', function(){
      //alert('add');
      socket.emit('add',{});
    });
    $('#Btype').on('click', function(){
      $.get('http://api.penchat.ru/rel/addtext/простотыкайклаву', function(data){
              canvas.renderAll();
      });
    })
  })();
});
