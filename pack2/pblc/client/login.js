$('#in').on('input', function(){
  var v  = $('#in').val();
  var geturl = main.url + '/auth/ava/' + v;
  $.get(geturl , function(d){
    d.ava?
    $('#im').attr('src', d.ava):
    $('#im').attr('src', 'https://robohash.org/' + v + '.png')
  });
});

var user = {
  name: '',
  password: '',
  ava: ''
}

var bthf = {
  again: function(s){
    $('#menu').html(s);
  },
  join: function(){
    router.set({canvas: 'join' , ars: 'join' , offsetx: 0 , offsety: 0}); //, username: user.name , password: user.password
    sock.changeroom('join', function(){
      ars.join();
    });
    $('#menu').html('<h1>Добро пожаловать на penchat!</h1>')
  }
}

$('.join').on('keypress', function(e){
  if(e.keyCode==13){
    if($('#in').val()){$('#in').css('background','lightgreen')}else{
      $('#in').css('background','red');
    }
    if($('#password').val()){
      $('#password').css('background','lightgreen');
    }else{ $('#password').css('background','red'); }

    if($('#in').val() && $('#password').val()){
      user.name = $('#in').val(); user.password = $('#password').val(); user.ava = $('#im').attr('src');
      $.get(main.url + '/auth/login?username=' + $('#in').val()
      + '&password=' + $('#password').val() , function(d){
        if(d.error){
          var html = $('.join').html();

          $('#menu').html(`
            <div>
              <p>пишет, что:
              <small>${d.error}</small>
              </p>
              <div>
                <a class='joinhelp' href='#'>пробовать ещё!!</a>
                <a class='joinhelp' href='#' onclick='bthf.join()'>да я здесь впервые!!</a>
              </div>
            </div>
          `);
        }
        if(d.sucsess){
          $('.join').html(d.sucsess);
        }
      })
    }
  }
})
