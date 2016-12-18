function startTimer() {
    var my_timer = document.getElementById("timer");
    var time = my_timer.innerHTML;
    var arr = time.split(":");
    var h = arr[0];
    var m = arr[1];
    var s = arr[2];
    if (s == 0) {
      if (m == 0) {
        if (h == 0) {
          //alert("Время вышло");
          window.location.reload();
          return;
        }
        h--;
        m = 60;
        if (h < 10) h = "0" + h;
      }
      m--;
      if (m < 10) m = "0" + m;
      s = 59;
    }
    else s--;
    if (s < 10) s = "0" + s;
    document.getElementById("timer").innerHTML = h+":"+m+":"+s;
    setTimeout(startTimer, 1000);
  }

  startTimer()

  function auth(){
    VK.Auth.login(function(response) {
      if (response.session) {
        console.log(
          response.session
        );
        if (response.settings) {
          /* Выбранные настройки доступа пользователя, если они были запрошены */
        }
      } else {
        /* Пользователь нажал кнопку Отмена в окне авторизации */
      }
    });
  }


var socketAddr = '//1280.sliceofring.ru';

var sock = {
  name: 0,
  room: 'slice',
  changeroom: function(room, callback){
    socket.emit('leave', this.room);
    this.room = room;
    socket.emit('join', room);
  },
  event: function(o){
    socket.emit('snd',{room: this.room , userseed: this.name , obj: o});
  }
}

if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
  socket = io.connect(socketAddr, { 'connect timeout': 5000 }); //{'transports': ['xhr-polling']});
} else {
  socket = io.connect(socketAddr, { 'connect timeout': 5000 });
  var ss = socket.socket;
}

socket.on('res', function(msg){
  var newM = document.createElement('div');
  newM.className = 'mes';
  newM.innerHTML = '<p>' + msg.obj + '</p>';
  document.getElementById('mesl').appendChild(newM);
  console.log(msg);
})

socket.on('connect', function () {
  socket.emit('join', sock.room );
  setInterval(function(){
    sock.event(Math.random());
  }, 1000)
})
