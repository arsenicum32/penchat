function DOMevents(x,y){
  var sysv ={sx: x||0,sy: y||0,endx:0,endy:0,offsetx:0,offsety:0, can:0}

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

  $('body').on('mouseup', function(e){
    sysv.offsetx = sysv.endx  ;
    sysv.offsety = sysv.endy  ;
    sysv.can = 0;
  })

  $('.item').each(function() {
    $(this).attr('cx' , $(this).attr('cx') + sysv.sx);
    $(this).attr('cy' , $(this).attr('cx') + sysv.sy);
    $(this).css('left', ($(this).attr('cx') || 0) + 'px');
    $(this).css('top', ($(this).attr('cy') || 0) + 'px');
  });

}

$(document).ready(function(){
  DOMevents(router.get('offsetx'), router.get('offsety'));
});
