function scrollDown() {
  var focusBottom = document.getElementById("adobewordpress");
  focusBottom.scrollTop = focusBottom.scrollHeight;
}

$("input").keypress(function(event) {
  if (event.which == 13) {
    event.preventDefault();
    $('form.chat input[type="submit"]').click();
  }
});
$('form.chat input[type="submit"]').click(function(event) {
  event.preventDefault();
  var message = $('form.chat input[type="text"]').val();
  if ($('form.chat input[type="text"]').val()) {
    var d = new Date();
    var clock = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var currentDate =
      (('' + day).length < 2 ? '0' : '') + day + '.' +
      (('' + month).length < 2 ? '0' : '') + month + '.' +
      d.getFullYear() + '&nbsp;&nbsp;' + clock;
    setTimeout(function() {
      $('form.chat > span').addClass('spinner');
    }, 100);
    setTimeout(function() {
      $('form.chat > span').removeClass('spinner');
    }, 2000);
  }
  $('form.chat input[type="text"]').val('');
  scrollDown();
  sendorder(message, function(){
    $('form.chat div.messages').append('<div class="message"><div class="myMessage"><p>' + message + '</p><date>' + currentDate + '</date></div></div>');
  });
});

/* DEMO */
if(parent==top) {
  $('a.article').show();
}
var mes = 'Привет, вы попали в скромный магазинчик интернет-артефактов... Хотите приобрести эту штуку?';

function renderMes(text, date, owner, side){
  var s = side?"myMessage":"fromThem";
  $('#adobewordpress').append('<div class="message">\
            <div class="'+s+'">\
             <p>'+text+'</p>\
              <date><b>' + owner  + '</b> '+date+'</date>\
            </div>\
          </div>\
  </div>');
}

var lasttime  = 0;
(function(){
  readDialog(function(d){
    var dt = d.response;
    if(dt){
      $('#adobewordpress').html('');
      lasttime = dt[dt.length - 1].d;
      for(var n in dt){
        renderMes( dt[n].b, tC(dt[n].d) , dt[n].o );
      }
      renderMes(mes, tC((new Date()).getTime()), 'бот Василий');
      scrollDown();
    }
  });
})();
setInterval( function(){
  readDialog(function(d){
    var dt = d.response;
    if(dt[dt.length - 1].d != lasttime ){
      lasttime = dt[dt.length - 1].d;
      renderMes( dt[dt.length - 1].b, tC(dt[dt.length - 1].d) , dt[dt.length - 1].o );
    }
  });
}, 5000);

function tC(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
