$('#gochat').on('click', function(){
  $('#callback').show();
  $('.block').hide();
});

$('#closechat').on('click', function(){
  $('#callback').hide();
  fullc();
  $('.block').show();
})

$('#artist').on('click', function(){
  $('.block').hide();
  $('#c').show();
});

$(document).ready(function(){
  setlanguage(navigator['language'].slice(0,2));
  fullc();
})

var index = Math.floor( Math.random()*datas.length );
function fullc(){
    setContent();
    index<datas.length?index++:index=0;
}
function setContent(){
  if(datas[index]){
    $('#iname').html( datas[index].label || 'Item' );
    $('#idesc').html( datas[index].desc || 'item desc' );
    $('#iphoto').attr('src', datas[index].im || 'http://placehold.it/200x200' );
    $('#iprice').html( datas[index].price + (Language=='ru'?'руб':'$') || (Language=='ru'?'1200руб':'9.9$') );
    $('#ilabel').html( (datas[index].bt||(Language=='ru'?'подробнее':'more')) );
  }else{
    index = 0;
  }
}
