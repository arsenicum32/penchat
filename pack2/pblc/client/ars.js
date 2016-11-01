ars = {
  join: function(){
    drawlogo();
    drawme();
    $('#phone').remove();
    setTimeout(function(){
       var tp = $(window).height() *.8;
       var wt = $(window).width()/2 - 125;
       var r = addObject({type: "Rect" , id: 'phone', left: wt - 10, top: tp - 30 , width: 250 , height: 150});
      $('body').append('<input class="input item" cy="'
      +tp+'" cx="'+wt
      +'" id="phone" style="position:absolute; border: 2px solid '
      +r.fill+';margin:0; left:'+wt+'px; top: '
      +tp+'px; z-index: 2000" placeholder="phone" /><script src="pblc/join/phone.js"></script>')
    }, 800);

    // setTimeout(function(){
    //   $('body').append(`
    //     <form style='position: absolute; top: 0; left: 0; background: white'  action="http://ardesigner.myjino.ru/upload.php" method="post" enctype="multipart/form-data">
    //       <input    name="login" type='hidden' size="15"    maxlength="15">
    //       <input type="file" name="fupload">
    //       <input    type="submit" name="submit"    value="отправить">
    //     </form>
    //   `)
    // },1500)
    if(router){
      glob.offsetx = offsetX = router.get().offsetx || 0;
      glob.offsety = offsetY = router.get().offsety || 0;
      canvas.absolutePan(new fabric.Point(glob.offsetx, glob.offsety));
    }
  }
}

//http://ardesigner.myjino.ru

function drawme(){
  fabric.Image.fromURL( user.ava , function (oImg) {
    //oImg.set('left', PosX).set('top',PosY);
    canvas.add(oImg);
    canvas.renderAll();
  }, {"left": 20, "top": 120, "scaleX": 0.25, "scaleY": 0.25});

  addText({
    text: 'Привет, '+user.name ,
    rotate: fabric.util.getRandomInt(-180, 180) ,
    top: window.innerHeight*0.2 ,
    left: window.innerWidth*0.1
  });
}

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
        //id: 'tizer'
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
      //id: logo[lt],
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
