function loadContent(){
  function stext(text, word){
    var arr = text.split(' ');
    for(var n=0;n<arr.length;n++){
      if(n && n%(4||word)===0 && arr[n].split('').length>2){
        arr.splice(n, 0, "\n");
      }
    }
    return arr.join(' ');
  }
  function screen(left,top, dt){
      var title = new fabric.Text((dt.label || "Товар"), {
          fontSize: 15,
          backgroundColor: 'black',
          fill: 'white',
          scaleX: 2,
          scaleY: 2,
          left: 130,
          top: 40,
          lineHeight: 1,
          originX: 'left',
          fontFamily: 'Gill Sans',
          fontWeight: 'light'
          //selectable: false
        });
        var text = stext((dt.desc||'Lorem ipsum dolor sit amet, dolor nostrum reprimique ad vix, eum te facete menandri. Pro ad movet delicata. Cetero omittantur ut his, vix alia nostrum definitionem ea. Tantas suscipit atomorum in eum, et quas aperiri maiestatis vis. Nam aeterno numquam cu, ad duis lobortis vix. Et eos sale lucilius.'));
        var desc = new fabric.Text(text, {
            fontSize: 15,
            backgroundColor: 'white',
            fill: 'black',
            scaleX: 1.4,
            scaleY: 1.4,
            left: 130,
            top: 80, //+40*(text.split('\n').length),
            lineHeight: 1,
            originX: 'left',
            fontFamily: 'Gill Sans',
            fontWeight: 'light'
            //selectable: false
          });
      var callToAction = new fabric.Text('   '+(dt.bt||'more')+'   ', {
          fontSize: 15,
          backgroundColor: ['hotpink','red','blue'][Math.floor(Math.random()*3)],
          fill: 'white',
          scaleX: 2,
          scaleY: 2,
          left: (dt.label|| "Товар").split('').length*12 + 40,//$(window).width()/3,
          top: 80,
          angle: -15,
          lineHeight: 1,
          originX: 'left',
          fontFamily: 'Gill Sans',
          fontWeight: 'bold',
          selectable: false
        });


      fabric.Image.fromURL((dt.im||'http://placekitten.com/200/300'), function(img) {
        img.scale(0.45);

        var group = new fabric.Group([ img , title , desc , callToAction ], {
          left: left,
          top: top
        });
        canvas.add(group);
        group.on({
          'mousedown': function(e){
            $('#callback').show(500);
            renderMes(( dt.mes || (dt.mesf && typeof dt.mesf == typeof function(){} ? dt.mesf() : false) || "Привет!!! Я товар... Если хочешь купить меня - оставь свой телфон или ссылку на себя..."), tC((new Date()).getTime()), ( dt.title || dt.label || 'Непонятная кошка'));
          }
        });

        group.scale(Math.random()*2 + 0.5).set({
          angle: Math.floor( Math.random()*40) - 20
        });

      });
  }
  (function(){
    var w = 1000;
    var h = w;//window.innerHeight;
    screen(w,h, datas[0]); // $(window).width()*0.75 , $(window).height() + 350
    screen(w*1.25,h*1.5, datas[1]);
    screen(w*2.250,h*1.750,datas[2]);
    screen(w*2.500,h*1.250,datas[3]);
    screen(w*2.000,h*0.750, datas[4]);
  })();
}
