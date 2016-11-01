function drawlogo(){
  function getRandomArbitary(min, max)
  {
    return Math.floor(Math.random() * (max - min) + min);
  }

  var logo = ['p','e','n','c','h','a','t'];
  var size = 150;
  var alligature = [0.75,0.65,0.92,0.87,0.43,0.21][getRandomArbitary(0,5)];
  var help;
  for(var lt in logo){
    if (!help){
      help=1;
      var text = new fabric.Text("платформа для публикации и обмена\nавторского и коллективного графического контента", {
        borderColor: "blue",
        cornerColor: "blue",
        originX: "center",
        originY: "center",
        cornerSize: 9,
        transparentCorners: false,
        fontSize: size/10,
        left: $(window).width()/2+(size*alligature)*lt-logo.length/2*(size*alligature),
        top: $(window).height()/2+size/2,
        lineHeight: 1,
        originX: 'left',
        fontFamily: 'Gill Sans',
        fontWeight: 'bold',
        tizer:1
      });
      canvas.add(text);
    }
    var text = new fabric.Text(logo[lt], {
      borderColor: "blue",
      cornerColor: "blue",
      originX: "center",
      originY: "center",
      cornerSize: 9,
      transparentCorners: false,
      fontSize: size,
      left: $(window).width()/2+(size*alligature)*lt-logo.length/2*(size*alligature),
      top: $(window).height()/2-size/2,
      lineHeight: 1,
      originX: 'left',
      fontFamily: 'Gill Sans',
      fontWeight: 'bold',
      letter: logo[lt]
    });
    canvas.add(text);
  }
  var objects = [];
  for (var n = 0; n < canvas.getObjects().length; n++) {
    if(canvas.item(n).letter){
      objects.push(n);
    }
  }
  var obj = objects[getRandomArbitary(0, objects.length)];
  canvas.item(obj).angle = getRandomArbitary(-35, 35);
  canvas.setActiveObject(canvas.item(obj));
}
