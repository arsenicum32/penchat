function brusher(t, callback){
  if(t<0.8 && t>0.6){
    var img = new Image();
    img.src = '/public/win98.png';

    var texturePatternBrush = new fabric.PatternBrush(canvas);
    texturePatternBrush.source = img;
    canvas.freeDrawingBrush = texturePatternBrush;
    canvas.freeDrawingBrush.width = 72;
  }else{
    var hey = ['Pencil', 'Spray', 'Circle'];
    canvas.freeDrawingBrush = new fabric[ hey[Math.floor(Math.random()*3)] + 'Brush'](canvas);
    canvas.freeDrawingBrush.width = t*30;
    canvas.freeDrawingBrush.color = getRandomColor();
  }

  callback();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
