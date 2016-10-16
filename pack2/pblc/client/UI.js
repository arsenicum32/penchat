$(document).ready(function(){
  $('#draggable').css('top', '120px');
  $('#draggable').css('left', '10px');
  $('#menu').hide();
  $('#help').css('top', $(window).height() - $('#help').height());
  $('#help').css('left', $(window).width() - $('#help').width());

  $('body').on('mousemove', function(e) {
    $('#sel').text('join');
    if ((e.pageY - 40) / $(window).height() > 0.2) {
      $('#menu').hide(150);
      $('.native').show(150);
    }
  });

  function dCr(x,y){
    var w = $(window).width(),
      h = $(window).height();
    return [Math.round(x/w),Math.round(y/h)];
  }
  function positM(x,y){
    var intr = $('.interface'); //$('interface').width()
    var chng = [0,0];
    if(dCr(x,y)[1]) chng[0]=-$('.interface').height();
    if(dCr(x,y)[0]) chng[1]=-$('.interface').width();
    $('.interface').css('top', y+chng[0]+5+'px');
    $('.interface').css('left', x+chng[1]+5+'px');
    $('.interface p').text( dCr(x,y));
  }
  var SHOWMENU = false;
  $('body').on('dblclick', function(e){
    SHOWMENU= 1 - SHOWMENU;
        if(SHOWMENU){
          $('.interface').toggleClass('hid');
          $('.interface').show();
          positM(e.clientX,e.clientY);
        }else{
          $('.interface').hide();
        }
  });
  $('body').on('click', function(e){
    var target = $(e.target);
    var final = target?target.attr('class')?target.attr('class').indexOf('interface'):1:2;
    //var parent = target.parent() || target;
    //console.log(final);
    if( final!=0 && final!=-1  ){ // || (parent.indexOf('interface')+1)
    }else{
      SHOWMENU= 0;
      //$('.interface').addClass('hid');
      $('.interface').hide();
    }
  });

  var items = {
    file: 'test',
    edit: 'two',
    add: `
      <div class='rect adder' onclick='addObject({type: "Rect"})'></div>
      <div class='circle adder' onclick='addObject({type: "Circle"})'></div>
      <div class='tri adder' onclick='addObject({type: "Triangle"})'></div>
    `,
    share: 'four',
    join: `
      <div class='join'>
        <img class="avap" src="https://robohash.org/ars32.png"></img>
        <div class="field">
          <input class='input' id='rn' placeholder='username' />
          <input class='input' id='rp' type='password' placeholder='password' />
        </div>
      </div>
    `,
    ids: 'six',
    counter: `
      <div class='profile'>
        <img class='ava' src="https://robohash.org/sefjkf.png" />
        <small>Name Surname</small>
      </div>
      <div class='profile'>
        <img class='ava' src="https://robohash.org/sehfjk.png" />
        <small>Name Surname</small>
      </div>
      <div class='profile'>
        <img class='ava' src="https://robohash.org/tgsgs.png" />
        <small>Name Surname</small>
      </div>
      <div class='profile'>
        <img class='ava' src="https://robohash.org/sehfj.png" />
        <small>Name Surname</small>
      </div>
    `
  }

  function genContent(arg) {
    return items[arg]?items[arg]:'';
  }

  $('#top a').on({
    'mouseover': function() {
      $('.native').hide(150);
      $('#menu').show(150);
      $('#menu').html(genContent($(this).text()));
    }
  });

  $('#counter').on('mouseover', function(){
    $('#menu').html(genContent('counter'));
  })

  $(function() {
    var propH = false;
    $("#draggable").draggable({
      containment: "body",
      start: function() {
        $(this).css('opacity', 0.5);
      },
      stop: function(){
        $(this).css('opacity', 1);
        //adaptatenative("#draggable",propH);
       }
      });
  });

  $(function() {
    $("#help").draggable({
      containment: "body"
    });
  });

  function adaptatenative(el,propH) {
    $(el).css('opacity', 1);
    var horizontal = $(el).offset().top / $("body").height();
    var newPropH = horizontal > 0.1 && horizontal < 0.5;
    if (newPropH != propH || propH=='go') {
      propH = newPropH;
      var w = $(el).width();
      var h = $(el).height();
      $(el).width(h);
      $(el).height(w);
    }
  }
  adaptatenative("#draggable",'go');

  // canvas.on('after:render',function(){
  //   var g = parseInt($('#counter span').text()) + 1;
  //   $('#counter span').text(g);
  // });

  //normselect();
});
