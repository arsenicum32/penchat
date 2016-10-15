canvas = new fabric.Canvas('c');
canvas.setHeight($(window).height());
canvas.setWidth($(window).width());
canvas.selection = false;
//canvas.defaultCursor = 'move';
//canvas.hoverCursor = 'move';
canvas.hoverCursor = 'pointer';
$(window).on('resize', function() {
  canvas.setHeight($(window).height());
  canvas.setWidth($(window).width());
  retina();
});
// super function for see cool image on retina display
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
// copy text to clipboard
function clip(text) {
	var copyElement = document.createElement('input');
	copyElement.setAttribute('type', 'text');
	copyElement.setAttribute('value', text);
	copyElement = document.body.appendChild(copyElement);
	copyElement.select();
	try {
		document.execCommand('copy');
	} catch (e) {
		copyElement.remove();
		console.log("document.execCommand('copy'); is not supported");
		prompt('Copy the text below. (ctrl c, enter)', text);
	} finally {
		if (typeof e == 'undefined') {
			copyElement.remove();
		}
	}
}

function dCr(x,y){
  var w = $(window).width(),
    h = $(window).height();
  return [Math.round(x/w),Math.round(y/h)];
}
function positM(x,y,el){
  var intr = $(el);
  var chng = [0,0];
  if(dCr(x,y)[1]) chng[0]=-$(el).height();
  if(dCr(x,y)[0]) chng[1]=-$(el).width();
  $(el).css('top', y+chng[0]+5+'px');
  $(el).css('left', x+chng[1]+5+'px');
  $(el).text( dCr(x,y));
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
    //SHOWMENU=true;
    if (options.target) {
      options.target.opacity = 0.5;
      canvas.renderAll();
    };
    ///////////////////////////////////////
    //
    //
    //   business-logic block for contents
    //
    //
    ///////////////////////////////////////
    if (canvas.getActiveObject()) {
      if(canvas.getActiveObject().onClick){
        var sw = canvas.getActiveObject().onClick;
        switch (sw) {
          case "присоединиться":
              window.open("http://penchat.ru", "_blank");
            break;
            case "создать":
                window.open("http://penchat.ru", "_blank");
              break;
              case "смотреть":
                  window.open("http://penchat.ru", "_blank");
                break;
                case "посетить api.penchat.ru":
                    window.open("http://api.penchat.ru", "_blank");
                  break;
                  case "связаться":
                    $('#callback').show();
                      //window.open("http://penchat.ru", "_blank");
                    break;
          default:
        }
      }
      /////////////////////////////////////////
    }
  },
  'mouse:up': function(options) {
    if (options.target) {
      options.target.opacity = 1;
      canvas.renderAll();
    };
    if (canvas.getActiveObject() == null) {
      // offsetX -= options.e.clientX - PRX;
      // offsetY -= options.e.clientY - PRY;
      // canvas.absolutePan(new fabric.Point(offsetX, offsetY));
      // CAN = false;
    }
  },
  'mouse:move': function(options) {
    // SHOWMENU=false;
    // if (canvas.getActiveObject() == null && CAN) {
    //   canvas.absolutePan(new fabric.Point(offsetX - options.e.clientX + PRX, offsetY - options.e.clientY + PRY));
    // }
  },
  'object:moved': function(e) {
    e.target.opacity = 0.5;
  },
  'object:modified': function(e) {
    e.target.opacity = 1;
    if(e.target.point){
      maps[e.target.point]['x']=e.target.left;
      maps[e.target.point]['y']=e.target.top;
    }
  }
});
fabric.Object.prototype.transparentCorners = false;
function randomgen(x,y){
    for (var i = 15; i--;) {
    var dim = fabric.util.getRandomInt(30, 60);
    var klass = ['Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0, 2)];
    var options = {
      top: fabric.util.getRandomInt(0, 600) + x || 0,
      left: fabric.util.getRandomInt(0, 600) + y || 0,
      fill: 'pink'
    };
    if (klass === 'Circle') {
      options.radius = dim;
    } else {
      options.width = dim;
      options.height = dim;
    }
    canvas.add(new fabric[klass](options));
  }
}
for (var n = 0; n < canvas.getObjects().length; n++) {
  canvas.item(n).hasControls = canvas.item(n).hasBorders = false;
}
//navigation scroll
var source = [0,0,2000,1000,0,2000,1000,1000,2000,2000,3000,2500,2000,0,0,0];

var scale = 1; // scale of polyline
for(var i=0;i<source.length;i++){
  source[i]=source[i]/scale;
}
	var maps = [];
	for(var i = 0, j = 0; i < source.length; i+=2, j++){
	 maps[j] = {};
	 maps[j]["x"] = source[i];
	 maps[j]["y"] = source[i+1];
	}
  for(var i=0;i<maps.length;i++){
    var text = new fabric.Text(i+"", {
    fontSize: 15,
    hasControls: false,
    textDecoration: "underline",
    backgroundColor: 'pink',
    left: maps[i]['x'],
    top: maps[i]['y'],
    lineHeight: 1,
    originX: 'left',
    fontFamily: 'Gill Sans',
    fontWeight: 'bold',
    point: i
  });
  canvas.add(text);
  //randomgen(maps[i]['x'],maps[i]['y']);
  }
	function fact(n){
	  return (n > 1)?n*fact(n-1):1;
	}
	function ni(n,i){
	 return fact(n)/(fact(i)*fact(n-i));
	}
	function bin(n,i,t){
	 return ni(n,i)*Math.pow(t,i)*Math.pow(1-t,n-i);
	}
	function bezier(t,maps){
	 var res = {x:0,y:0}, sumX = 0, sumY = 0;
	 for(var i = 0; i < maps.length; i++){
	  sumX += maps[i]["x"]*bin(maps.length-1,i,t);
	  sumY += maps[i]["y"]*bin(maps.length-1,i,t);
	 }
	 return {x:sumX,y:sumY};
	}
	var point = {}, t = 0, step = 0.000005;
var t=0;
var contentLoader;

$(window).bind('mousewheel', function(event) {
  $('mouse').hide(500);
  if(!contentLoader){
    loadContent();
    contentLoader = 1;
    normselect();
  }
  var rel = event.originalEvent.wheelDelta;
  animationWheel(rel); // animation listener
  if (canvas.getActiveObject()) { // ahahahaah rotate
    canvas.getActiveObject().angle += rel/20;
  }
  if(t < 1){
     if(rel>0){
       t += step*Math.abs(rel);//rel>0&&t>0?1:-1;
     }else{
       if(t>0) t -= step*Math.abs(rel);//rel>0&&t>0?1:-1;
       else t=0.99;
     }
	   point = bezier(t, maps);
     //console.log(point);
	   //ball.style.left = point["x"] + "px";
	   //ball.style.top = point["y"] + "px";
     canvas.absolutePan(new fabric.Point(offsetX + point["x"], offsetY + point["y"]));
	  }else{ t=0; }
});

$(window).on('keypress',function(e){
  // if(e.keyCode==99){
  //   clip(JSON.stringify(canvas));
  // }
});

var text = new fabric.Text('press c to copy canvas data', {
    fontSize: 15,
    backgroundColor: 'hotpink',
    left: 0,
    top: 0,
    lineHeight: 1,
    originX: 'left',
    fontFamily: 'Gill Sans',
    fontWeight: 'light'
  });
  canvas.add(text);

  // $('#script').text(JSON.stringify(canvas.toJSON(),null,'\t'));
  // $('#script').on({
  //   'input': function(){
  //     try{
  //       eval($(this).val());
  //     } catch(e){
  //       $('#errlog').html(e);
  //     } finally{
  //       $(this).focus();
  //     }
  //   }
  // });
  // $('#errlog').on('click',function(){
  //   $(this).hide(500);
  //   $('#script').hide(500);
  //   $('.hidden').show();
  // });
  // $('.hidden').on('click', function(){
  //   $(this).hide();
  //   $('#errlog').show();
  //   $('#script').show();
  // });

$(document).ready(function(){
  normselect();
});
canvas.renderAll();
