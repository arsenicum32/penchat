var time = 5000;
setInterval(function(){
  time--;
  var h = time;
  var m = h%60;
  var s = m%60;

  document.getElementById('timer').innerHTML = h+':'+m+':'+s;
}, 1000)
