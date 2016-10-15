function animationWheel(delta){
  for (var n = 0; n < canvas.getObjects().length; n++) {
    var speed = canvas.item(n).left/300;
    if(canvas.item(n).letter){
      canvas.item(n).top += delta/20*speed;
    }
    if(canvas.item(n).tizer){
      canvas.item(n).flipY = 1;
      canvas.item(n).scaleY += delta/40;
    }
  }
}
(function(){
  
})();
