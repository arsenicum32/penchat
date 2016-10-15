$(document).ready(function(){
  $('#add').on('click',function(){
    $.get('/api/add?top=0&fill=blue&left=0', function(){
      //canvas.renderAll();
    });
  });
});
