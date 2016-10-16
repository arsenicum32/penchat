$(document).ready(function(){
  (function(){
    $('#Bhand').on('click', function(){
      //alert('hand');
    });
    $('#Badd').on('click', function(){
      //alert('add');
      socket.emit('add',{});
    });
    $('#Btype').on('click', function(){
    })
  })();

});


function drawmenu(cnv , see) {

  if(see='show'){
    $('#drawing-mode-options').show();
  }else{
    $('#drawing-mode-options').hide();
  }

  fabric.Object.prototype.transparentCorners = false;

  if (fabric.PatternBrush) {
    var vLinePatternBrush = new fabric.PatternBrush(cnv);
    vLinePatternBrush.getPatternSrc = function() {

      var patterncnv = fabric.document.createElement('cnv');
      patterncnv.width = patterncnv.height = 10;
      var ctx = patterncnv.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patterncnv;
    };

    var hLinePatternBrush = new fabric.PatternBrush(cnv);
    hLinePatternBrush.getPatternSrc = function() {

      var patterncnv = fabric.document.createElement('cnv');
      patterncnv.width = patterncnv.height = 10;
      var ctx = patterncnv.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();

      return patterncnv;
    };

    var squarePatternBrush = new fabric.PatternBrush(cnv);
    squarePatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 2;

      var patterncnv = fabric.document.createElement('cnv');
      patterncnv.width = patterncnv.height = squareWidth + squareDistance;
      var ctx = patterncnv.getContext('2d');

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);

      return patterncnv;
    };

    var diamondPatternBrush = new fabric.PatternBrush(cnv);
    diamondPatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 5;
      var patterncnv = fabric.document.createElement('cnv');
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color
      });

      var cnvWidth = rect.getBoundingRectWidth();

      patterncnv.width = patterncnv.height = cnvWidth + squareDistance;
      rect.set({ left: cnvWidth / 2, top: cnvWidth / 2 });

      var ctx = patterncnv.getContext('2d');
      rect.render(ctx);

      return patterncnv;
    };

    var img = new Image();
    //img.src = '../assets/honey_im_subtle.png';

    var texturePatternBrush = new fabric.PatternBrush(cnv);
    texturePatternBrush.source = img;
  }

  $('#drawing-mode-selector').on('change',function() {

    if ($(this).val() === 'hline') {
      cnv.freeDrawingBrush = vLinePatternBrush;
    }
    else if ($(this).val() === 'vline') {
      cnv.freeDrawingBrush = hLinePatternBrush;
    }
    else if ($(this).val() === 'square') {
      cnv.freeDrawingBrush = squarePatternBrush;
    }
    else if ($(this).val() === 'diamond') {
      cnv.freeDrawingBrush = diamondPatternBrush;
    }
    else if ($(this).val() === 'texture') {
      cnv.freeDrawingBrush = texturePatternBrush;
    }
    else {
      cnv.freeDrawingBrush = new fabric[$(this).val() + 'Brush'](cnv);
    }

    if (cnv.freeDrawingBrush) {
      cnv.freeDrawingBrush.color = drawingColorEl.value;
      cnv.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      cnv.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
    }
  });


    //  drawingOptionsEl = $('#drawing-mode-options'),
    //  drawingColorEl = $('#drawing-color'),


  $('#drawing-mode').on('change',function() {
    cnv.freeDrawingBrush.color = $(this).val();
  });
  $('#drawing-shadow-color').on('change',function() {
    cnv.freeDrawingBrush.shadowColor = $(this).val();
  });
  $('#drawing-line-width').on('change',function() {
    cnv.freeDrawingBrush.width = parseInt($(this).val(), 10) || 1;
  });
  $('#drawing-shadow-width').on('change',function() {
    cnv.freeDrawingBrush.shadowBlur = parseInt($(this).val(), 10) || 0;
  });
  $('#drawing-shadow-offset').on('change',function() {
    alert('test')
    cnv.freeDrawingBrush.shadowOffsetX = parseInt($(this).val(), 10) || 0;
    cnv.freeDrawingBrush.shadowOffsetY = parseInt($(this).val(), 10) || 0;
  });

  if (cnv.freeDrawingBrush) {
    cnv.freeDrawingBrush.color = drawingColorEl.value;
    cnv.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    cnv.freeDrawingBrush.shadowBlur = 0;
  }
};

var mode = 'hand';

function UI(m){
  mode = m;
}
