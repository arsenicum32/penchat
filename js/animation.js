var sys = {
  startleft : []
}
function animationWheel(delta){
  for (var n = 0; n < canvas.getObjects().length; n++) {
    var speed = canvas.item(n).left/300;
    if(canvas.item(n).letter){
      if(!sys.startleft[n]) sys.startleft[n] = canvas.item(n).top;
      canvas.item(n).top = sys.startleft[n]  + delta/20*speed;
    }
    if(canvas.item(n).tizer){
      //canvas.item(n).flipY = 1;
      canvas.item(n).scaleY = 1 + delta/20;
    }
  }
}
(function(){

})();
