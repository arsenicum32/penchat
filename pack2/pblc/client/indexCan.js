var glob = {
  offsetx: 0,
  offsety: 0
}

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
  if(router){
    glob.offsetx = offsetX = router.get().offsetx || 0;
    glob.offsety = offsetY = router.get().offsety || 0;
    canvas.absolutePan(new fabric.Point(glob.offsetx, glob.offsety));
  }

  var PRX, PRY;
  var CAN = false;
  var SHOWMENU = false;
  canvas.on({
    'mouse:down': function(options) {

      canvas.isDrawingMode = mode == 'pen';

      if (options.target) {
        //options.target.opacity = 0.5;
        canvas.renderAll();
        $('#tool').show();
        $('#tool').css('left', (router.get().toolX || options.e.clientX) + 'px');
        $('#tool').css('top', (router.get().toolY || options.e.clientY) + 'px');
        $('#tool textarea').val(JSON.stringify(options.target,null,'\t'));
      }
      if (canvas.getActiveObject() == null && mode != 'pen') {
        $('#tool').hide();
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

        glob.offsetx = offsetX;
        glob.offsety = offsetY;

        if(mode=='text'){
          addText({text: "hello canvas!!!"});
        }
      }

      /////ROUTER
      router.put(glob)
      ///////////
    },
    'mouse:move': function(options) {
      normselect();
      if (canvas.getActiveObject() == null && CAN && mode != 'pen') {
        canvas.absolutePan(new fabric.Point(offsetX - options.e.clientX + PRX, offsetY - options.e.clientY + PRY));
      }
    },
    'object:moving': function(e) {

      sock.change( {
        id: e.target.id,
        name: e.target.name,
        left: e.target.left,
        top: e.target.top,
        originX: e.target.originX,
        originY: e.target.originY
      } );
      $('#tool textarea').val(JSON.stringify(e.target,null,'\t'));
    },
    'object:scaling': function(e){
      sock.change( {
        id: e.target.id,
        name: e.target.name,
        scaleX: e.target.scaleX,
        scaleY: e.target.scaleY,
        originX: e.target.originX,
        originY: e.target.originY
      } );
      $('#tool textarea').val(JSON.stringify(e.target,null,'\t'));
    },
    'object:rotating':function(e){
      sock.change(  {
        id: e.target.id,
        name: e.target.name,
        angle: e.target.angle,
        originX: e.target.originX,
        originY: e.target.originY
      } );
      $('#tool textarea').val(JSON.stringify(e.target,null,'\t'));
    },
    'object:modified': function(e) {
      sock.change( e.target );
      $('#tool textarea').val(JSON.stringify(e.target,null,'\t'));
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
              sock.rem(item);
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
  // for (var i = 15; i--;) {
  //     //sock.add(
  //       addObject({})
  //     //);
  // }
  //canvas.item(0).lockRotation = true;
  //canvas.item(0).lockScalingX = canvas.item(0).lockScalingY = true;
  // for (var n = 0; n < canvas.getObjects().length; n++) {
  //   canvas.item(n).hasControls = canvas.item(n).hasBorders = false;
  // }
  // canvas.renderAll();

  canvas.on('mouse:move',function(){
    $('#help textarea').val(JSON.stringify( canvas.toJSON(), null, ' '));
  });

  var CashArea = $('#help textarea').val();

  $('#help textarea').val(JSON.stringify( canvas.toJSON(), null, ' '));
  var CashArea = JSON.parse($('#help textarea').val());

  setInterval(function(){
    try{
      CashArea = JSON.parse($('#help textarea').val());
    } catch(e){

    } finally{

    }
  },200);

  $('#help textarea').on('input', function(){
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