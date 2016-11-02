$(document).ready(strt);

function strt(){
  var sysv ={sx:0,sy:0,endx:0,endy:0,offsetx:0,offsety:0, can:0}

  var longpress = 3000;
  var start;

  var el = document.body;
  el.addEventListener("touchstart", ev.start, false);
  el.addEventListener("touchend", ev.end, false);
  el.addEventListener("touchcancel", ev.cancel, false);
  el.addEventListener("touchmove", ev.move , false);

  var ev = {
    start: function(e){

    },
    end: function(e){
    },
    cancel: function(e){

    },
    move: function(e){
    }
  }


  $('body').on('mousedown', function(e){
      start = new Date().getTime();
      sysv.sx = e.pageX;
      sysv.sy = e.pageY;
      sysv.can = 1;
  })
  $('body').on('mousemove', function(e){
    if(sysv.can){
      sysv.endx =  sysv.offsetx + (e.pageX - sysv.sx) ;
      sysv.endy =  sysv.offsety + (e.pageY - sysv.sy) ;
      $('.item').each(function() {
              $(this).css('left', (parseInt($(this).attr('cx') || 0)) + sysv.endx  + 'px');
              $(this).css('top', (parseInt($(this).attr('cy') || 0)) + sysv.endy + 'px');
      })
    }

  });

  function g(a){
    return a - Math.floor(Math.random()*a);
  }

  setInterval(function(){
    // if(sysv.can){
    //    console.log( (new Date().getTime()) - ( start ))
    // }

  }, 100);

  $('body').on('mouseup', function(e){
    sysv.offsetx = sysv.endx  ;
    sysv.offsety = sysv.endy  ;
    sysv.can = 0;
  })
  function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  var pulses = [
          function(t){return Math.sin(t);},
          function(t){return Math.cos(t);},
          function(t){return Math.cos(t)*Math.sin(t);},
          function(t){return Math.sin(t)*Math.sin(t*1.5);},
          function(t){return Math.sin(Math.tan(Math.cos(t)*1.2));}
          // 'sin(tan(t)*0.05)',
          // 'cos(sin(t*3))*sin(t*0.2)',
          // 'sin(pow(8,sin(t)))',
          // 'sin(exp(cos(t*0.8))*2)',
          // 'sin(t-PI*tan(t)*0.01)',
          // 'pow(sin(t*PI),12)',
          // 'cos(sin(t)*tan(t*PI)*PI/8)',
          // 'sin(tan(t)*pow(sin(t),10))',
          // 'cos(sin(t*3)+t*3)',
          // 'pow(abs(sin(t*2))*0.6,sin(t*2))*0.6'
      ];

  var gen = [];
  function check(arr){
    var arrr = arr;
    for(var i in gen){
      if(Math.abs(gen[i][0] - arr[0]) > 100 &&
        Math.abs(gen[i][1] - arr[1]) > 100){
        gen.push(arr);
        return arr;
      }
    }
    check(arrr);
  }
  var ofs = 1;
  function getP(t){
    var w = window.innerWidth;
    var h = window.innerHeight;
    if(t>0){
      var posX = -w*1.5 + g(w*3.5), posY = -h*1.5 + g(h*3.5);
      return [posX , posY  ];
    }else{
      return [ w/2, h/2 ];
    }
  }

  $.get('http://20000.sliceofring.ru/test/circle', function(dt){
    for(var i in dt){
      var sz = Math.floor(dt[i].size/10);
      var w = sz + 'px';
    $('body').append("<div class='item' cx='" +(getP(i)[0] - sz/2)+"' cy='"+(getP(i)[1] - sz/2)+"'  style='background:"+getRandomColor()+";width:"+w+";height:"+w+";line-height:"+w+"'>"+w.replace('px','руб')+"</div>");
    }

    $('.item').each(function() {
      $(this).css('left', ($(this).attr('cx') || 0) + 'px');
      $(this).css('top', ($(this).attr('cy') || 0) + 'px');
    });

  })
}
