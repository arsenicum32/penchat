function loadContent(){
  (function(){
    var text = new fabric.Text('5', {
        fontSize: 15,
        backgroundColor: 'black',
        fill: 'white',
        scaleX: 50,
        scaleY: 50,
        left: $(window).width(),
        top: 0,
        lineHeight: 5,
        originX: 'left',
        fontFamily: 'Gill Sans',
        fontWeight: 'light',
        selectable: false
      });
      canvas.add(text);
  })();
  (function(){
    var arr = ['reasons', 'to be friends', 'with penchat'];
    for(var i in arr){
      var text = new fabric.Text(arr[i], {
          fontSize: 15,
          backgroundColor: 'black',
          fill: 'white',
          scaleX: 2,
          scaleY: 2,
          left: $(window).width() - 20,
          top: $(window).height() + i*30 + 10*i,
          lineHeight: 1,
          originX: 'right',
          fontFamily: 'Gill Sans',
          fontWeight: 'bold'
        });
        canvas.add(text);
    }
  })();
  (function(){
    var text = new fabric.Text('We re-invented\nthe social network!', {
        fontSize: 15,
        backgroundColor: 'black',
        fill: 'white',
        scaleX: 2,
        scaleY: 2,
        left: $(window).width() + 300,
        top: $(window).height()*0.75,
        lineHeight: 1,
        originX: 'left',
        fontFamily: 'Gill Sans',
        fontWeight: 'light',
        selectable: false
      });
      canvas.add(text);
  })();
  function screen(left,top, num, text, descr, click){
      var number = new fabric.Text(num.toString(), {
          fontSize: 15,
          backgroundColor: 'black',
          fill: 'white',
          scaleX: 20,
          scaleY: 20,
          lineHeight: 1,
          originX: 'left',
          fontFamily: 'Gill Sans',
          fontWeight: 'light',
          selectable: false
        });
      var title = new fabric.Text(text, {
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
        var desc = new fabric.Text(descr, {
            fontSize: 15,
            backgroundColor: 'white',
            fill: 'black',
            scaleX: 1.4,
            scaleY: 1.4,
            left: 130,
            top: 40+40*(text.split('\n').length),
            lineHeight: 1,
            originX: 'left',
            fontFamily: 'Gill Sans',
            fontWeight: 'light'
            //selectable: false
          });
      var callToAction = new fabric.Text('   '+click+'   ', {
          fontSize: 15,
          backgroundColor: ['hotpink','red','blue'][Math.floor(Math.random()*3)],
          fill: 'white',
          scaleX: 2,
          scaleY: 2,
          left: 130,//$(window).width()/3,
          top: $(window).height()/2 - 50,
          lineHeight: 1,
          originX: 'left',
          fontFamily: 'Gill Sans',
          fontWeight: 'bold',
          selectable: false
        });
      var rect = new fabric.Rect({
        fill: 'white',
        width: $(window).width()*2/3,
        height: $(window).height()/2
      });

      var group = new fabric.Group([ rect, number, title , desc , callToAction ], {
        left: left,
        top: top,
        onClick: click
      });
      canvas.add(group);
  }
  (function(){
    screen(1000,1000,1," design and management \n of training documentation "," Communication takes place on an infinite board\n on which each participant can post and edit content","join"); // $(window).width()*0.75 , $(window).height() + 350
    screen(1250,1500,2," the creation of author's publications\n and the presentation of goods or services "," Directly on the board, you can create a project.\n It may be:\n      ◉ your portfolio\n      ◉ art project\n      ◉ product or service presentation\n\t\t✼ made with penchat","create");
    screen(2250,1750,3," platform for webinars "," The same board can be used to create and broadcast\n educational programs. Or to create a video stream in real time.","watch");
    screen(2500,1250,4," open-source ","Let's develop together!","help");
    //screen(2000,750,5," у нас есть \n программа лицензированния \n для студий \n и творческих сообществ "," Хотите работать в penchat\n в собственной дизайн-студии на своих серверах - свяжитесь с нами!","связаться");
  })();
}
