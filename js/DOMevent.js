(function(){
  $(document).ready(function(){
    $('#callback').hide();
    $('#sendaction').on('click',function(){
      if($('#nameor').val()!='' && $('#phoneor').val()!=''){
        var tx = 'Новый заказ от: '+ $('#nameor').val() +' '+ $('#phoneor').val();
        $('#sendaction').attr('disabled', 'disabled');
        sendorder(tx,function(d){
          $('.maincontent').html('<p>'+d+'</p><p>Спасибо! В ближайшее время мы свяжемся с вами!</p>');
        });
      }else{
        alert('постарайтесь заполнить поля');
      }
    });
    $('#close').on('click', function(){
      $('#callback').hide(500);
    });
  });
})();
