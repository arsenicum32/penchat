$(document).ready(function(){
  canvas = new fabric.Canvas('c');
  canvas.setHeight($(window).height());
  canvas.setWidth($(window).width());
  canvas.selection = false;
  canvas.defaultCursor = 'move';
  canvas.hoverCursor = 'pointer';

  function retina(){
    if( window.devicePixelRatio !== 1 ){
          var c = canvas.getElement();
          var w = c.width, h = c.height;
          c.setAttribute('width', w*window.devicePixelRatio);
          c.setAttribute('height', h*window.devicePixelRatio);
          c.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
        }
    canvas.renderAll();
  }
  retina();

  $(window).on('resize', function() {
    canvas.setHeight($(window).height());
    canvas.setWidth($(window).width());
    retina();
  });
  function dCr(x,y){
    var w = $(window).width(),
      h = $(window).height();
    return [Math.round(x/w),Math.round(y/h)];
  }
  function positM(x,y){
    var intr = $('interface'); //$('interface').width()
    var chng = [0,0];
    if(dCr(x,y)[1]) chng[0]=-$('interface').height();
    if(dCr(x,y)[0]) chng[1]=-$('interface').width();
    $('interface').css('top', y+chng[0]+5+'px');
    $('interface').css('left', x+chng[1]+5+'px');
    $('interface p').text( dCr(x,y));
  }

  // create a rectangle object
  var offsetX = 0; //-canvas.getWidth()/2;
  var offsetY = 0; //-canvas.getHeight()/2;
  //canvas.absolutePan(new fabric.Point(offsetX, offsetY));

  var PRX, PRY;
  var CAN = false;
  var SHOWMENU = false;
  canvas.on({
    'mouse:down': function(options) {

      canvas.isDrawingMode = mode == 'pen';

      if (options.target) {
        //options.target.opacity = 0.5;
        canvas.renderAll();
      };
      if (canvas.getActiveObject() == null && mode != 'pen') {
        PRX = options.e.clientX;
        PRY = options.e.clientY;
        CAN = true;
      }
    },
    'mouse:up': function(options) {
      if (options.target) {
        options.target.opacity = 1;
        canvas.renderAll();

      }
      if (canvas.getActiveObject() == null && mode != 'pen') {
        offsetX -= options.e.clientX - PRX;
        offsetY -= options.e.clientY - PRY;
        canvas.absolutePan(new fabric.Point(offsetX, offsetY));
        CAN = false;

        if(mode=='text'){
          addText({text: "hello canvas!!!"});
        }
      }
    },
    'mouse:move': function(options) {
      normselect();
      if (canvas.getActiveObject() == null && CAN && mode != 'pen') {
        canvas.absolutePan(new fabric.Point(offsetX - options.e.clientX + PRX, offsetY - options.e.clientY + PRY));
      }
    },
    'object:moving': function(e) {
      socket.emit('some', {id: e.target.id, left: e.target.left, top: e.target.top} );
    },
    'object:scaling': function(e){
      socket.emit('some',
                {id: e.target.id,
                scaleX: e.target.scaleX ,
                scaleY: e.target.scaleY ,
                originX: e.target.originX,
                originY: e.target.originY,
                flipX: e.target.flipX,
                flipY: e.target.flipY
              });
    },
    'object:rotating':function(e){
      socket.emit('some',
                {id: e.target.id,
                angle: e.target.angle,
                originX: e.target.originX,
                originY: e.target.originY
              });
    },
    'object:modified': function(e) {
      //e.target.opacity = 1;
      socket.emit('modified', e.target);
    },
    'mouse:over': function(e) {
      canvas.renderAll();
    },
    'mouse:out': function(e) {
      canvas.renderAll();
    }
  });
  $('body').on("keypress", function(e){ // эта сучка удаляет объекты со сцены, если мы не в режиме Т
    var sym = String.fromCharCode(e.charCode);
        if(e.keyCode===61){
          var activeObject = canvas.getActiveObject();
          var activeGroup = canvas.getActiveGroup();
          var item = activeObject || activeGroup;
          if(item){ // говно !!!!!!!
            //socket.emit('remove',{id: item.id});
            if(item.type==='text'){
              canvas.getActiveObject()?canvas.getActiveObject().setText( canvas.getActiveObject().text.slice(0, -1) ):void(0);
              //socket.emit('settext', {id: canvas.getActiveObject().id , text: 'sef' });
            }else{
              item.remove();
            }
          }else{

          }
          canvas.renderAll();
        }else{
          var activeObject = canvas.getActiveObject();
          var activeGroup = canvas.getActiveGroup();
          var item = activeObject || activeGroup;
          if(item){
            if(item.type==='text' && mode=='text'){
              canvas.getActiveObject()?canvas.getActiveObject().setText( canvas.getActiveObject().text + sym):void(0);
                    socket.emit('settext', {id: canvas.getActiveObject().id , text: canvas.getActiveObject().text + sym });
                    canvas.renderAll();
            }
          }
        }
      });
  // "add" rectangle onto canvas
  //fabric.Object.prototype.transparentCorners = false;
  // add random objects
  for (var i = 15; i--;) {
    var dim = fabric.util.getRandomInt(30, 60);
    var klass = ['Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0, 2)];
    var options = {
      top: fabric.util.getRandomInt(0, 600),
      left: fabric.util.getRandomInt(0, 600),
      fill: ['pink', 'yellow', 'hotpink'][fabric.util.getRandomInt(0, 2)]
    };
    if (klass === 'Circle') {
      options.radius = dim;
    } else {
      options.width = dim;
      options.height = dim;
    }
    canvas.add(new fabric[klass](options));
  }
  //canvas.item(0).lockRotation = true;
  //canvas.item(0).lockScalingX = canvas.item(0).lockScalingY = true;
  // for (var n = 0; n < canvas.getObjects().length; n++) {
  //   canvas.item(n).hasControls = canvas.item(n).hasBorders = false;
  // }
  // canvas.renderAll();

  canvas.on('mouse:move',function(){
    $('textarea').val(JSON.stringify( canvas.toJSON(), null, ' '));
  });

  var CashArea = $('textarea').val();

  $('textarea').val(JSON.stringify( canvas.toJSON(), null, ' '));
  var CashArea = JSON.parse($('textarea').val());

  setInterval(function(){
    try{
      CashArea = JSON.parse($('textarea').val());
    } catch(e){

    } finally{

    }
  },200);

  $('textarea').on('input', function(){
    try{
      var parse = JSON.parse($(this).val());
      for (var n in parse){
          console.log(parse[n]);
          //socket.emit('some', parse[n]);
        }
    } catch(e) {
      console.log(e);
    } finally{

    }
    canvas.loadFromJSON($(this).val());
    canvas.renderAll();
  });
});
