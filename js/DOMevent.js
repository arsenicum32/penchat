(function(){
  $(document).ready(function(){
    $('#callback').hide();
    $('#sendaction').on('click',function(){
      $('.maincontent').html('Спасибо! В ближайшее время мы свяжемся с вами!');
    });
    $('#close').on('click', function(){
      $('#callback').hide(500);
    });
  });
})();
