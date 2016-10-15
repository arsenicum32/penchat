(function(){
  var mb = false;
  window.makebutton = function(){
    if (!mb){
      mb = true;
      setTimeout(function(){
        $('body').append("<a href='#' class='sendsuper' id='sendsuper'>"+(Language=='ru'?'отправить шедевр':'send masterpiece')+"</a>");
        $('#sendsuper').on('click', function(){
          $(this).remove();
          $('body').append('<div class="alert"><p>'+(Language=='ru'?'ваш шедевр может оказаться в этом паблике':'your masterpiece may posted in this')+'</p><a href="#">'+(Language=='ru'?'паблик':'group')+'</a><a href="#" class="bt">'+(Language=='ru'?'счастлив':'I am happy')+'</a></div>');
          $('#c').hide();

          var picture = document.getElementsByTagName("canvas")[0].toDataURL("image/jpeg", 0.7);

          $('.bt').on('click', function(){
            $('.alert').remove();
            $('.block').show();
          })
        });
      }, 1500);
    }
  }
})();
