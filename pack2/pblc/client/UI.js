$(document).ready(function(){
  $('#draggable').css('top', '120px');
  $('#draggable').css('left', '10px');
  $('#menu').hide();
  $('#tool').hide();
  $('#help').css('top', $(window).height() - $('#help').height());
  $('#help').css('left', $(window).width() - $('#help').width());

  $('body').on('mousemove', function(e) {
    $('#sel').text('join');
    if ((e.pageY - 40) / $(window).height() > 0.2) {
      $('#menu').hide(150);
      $('.native').show(150);
      if(canvas.getActiveObject()) $('#tool').show(150);
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

  items = {
    file: '<h2>no files uploaded</h2>',
    edit: 'join or login (╯°□°）╯︵ ┻━┻',
    add: `
      <div class='rect adder' onclick='sock.add(addObject({type: "Rect"}))'></div>
      <div class='circle adder' onclick='sock.add(addObject({type: "Circle"}))'></div>
      <div class='tri adder' onclick='sock.add(addObject({type: "Triangle"}))'></div>
    `,
    share: 'join or login ( ͡° ͜ʖ ͡°)',
    join: `
      <div class='join'>
        <img class="avap" id='im' src='https://robohash.org/f78797ef.png' />
        <div class="field">
          <input class='input' id='in' placeholder='username' />
          <input class='input' id='password' type='password' placeholder='password' />
          <small>type enter to continue ↩︎ </small>
          <script src='pblc/client/login.js'></script>
        </div>
      </div>
    `,
    ids: 'six',
    counter: '<h2>no users founds</h2>'
  }

  function genContent(arg) {
    return items[arg]?items[arg]:'';
  }

  $('#top a').on({
    'mouseover': function() {
      $('.native').hide(150);
      $('#tool').hide(150);
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
    $("#tool").draggable({
      containment: "body",
      stop: function(){
        router.put( { toolX: $(this).css('left'), toolY: $(this).css('top')} );
      }
    });
  });

  $('#tool textarea').on('input', function(){
    if(
      IsJson($(this).val())
    ){
      var o = JSON.parse($(this).val());
      objEdit(o);
      canvas.renderAll();
    }
  })

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

  function IsJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
});
