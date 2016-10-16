function setup(){
        canvas = new fabric.Canvas('c');
        canvas.setHeight($(window).height()/2);
        canvas.setWidth($(window).width()/2);
        canvas.selection = false;
        canvas.defaultCursor = 'move';
        canvas.hoverCursor = 'pointer';
        $(window).on('resize', function() {
          canvas.setHeight($(window).height()/2);
          canvas.setWidth($(window).width()/2);
        });

        $(window).on('keypress', function(e){ // remove object from canvas
          if(e.keyCode===8 && canvas.getActiveObject()){
            socket.emit('remove', canvas.getActiveObject() );
          }
        });

  var offsetX = 0, offsetY = 0, PRX, PRY, CAN = false;
  canvas.on({
    'mouse:down': function(options) {
      if (options.target) {
        //options.target.opacity = 0.5;
        canvas.renderAll();
      };
      if (canvas.getActiveObject() == null) {
        PRX = options.e.clientX;
        PRY = options.e.clientY;
        CAN = true;
      }
    },
    'mouse:up': function(options) {
      if (options.target) {
        options.target.opacity = 1;
        canvas.renderAll();
      };
      if (canvas.getActiveObject() == null) {
        offsetX -= options.e.clientX - PRX;
        offsetY -= options.e.clientY - PRY;
        canvas.absolutePan(new fabric.Point(offsetX, offsetY));
        CAN = false;
      }
    },
    'mouse:move': function(options) {
      if (canvas.getActiveObject() == null && CAN) {
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
}
