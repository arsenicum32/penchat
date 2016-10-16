function addObject(opt){
  var dim = parseFloat(opt.size) || fabric.util.getRandomInt(30, 60);
  var klass = opt.type || ['Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0, 2)];
  var options = {
    top: opt.top?parseFloat(opt.top):fabric.util.getRandomInt(0, 600),
    left: opt.left?parseFloat(opt.left):fabric.util.getRandomInt(0, 600),
    fill: opt.fill || ['pink', 'yellow', 'blue'][fabric.util.getRandomInt(0, 2)],
    id: opt.id || canvas.uniqueID(),
    name: opt.name || canvas.uniqueID()
  };
  if (klass === 'Circle') {
    options.radius = parseFloat(opt.radius) || dim;
  } else {
    options.width = parseFloat(opt.width) || dim;
    options.height = parseFloat(opt.height) || dim;
  }
  delete options.METHOD;
  //delete options.OWNER;
  var newObject = new fabric[klass](options);
  canvas.add(new fabric[klass](options));
  return newObject;
}

function addImage(opt){
  var imgObj = new Image();
  imgObj.src = opt.link;
  imgObj.onload = function () {
      var image = new fabric.Image(imgObj);
      image.set({
          left: opt.left || 250,
          top: opt.top || 250,
          id: opt.id || canvas.uniqueID()
      });
      image.scale(0.5).setCoords();
      canvas.add(image);
  }
  return imgObj;
}

function addText(opt){
  var options = {
    top: opt.top?parseFloat(opt.top):fabric.util.getRandomInt(0, 600),
    left: opt.left?parseFloat(opt.left):fabric.util.getRandomInt(0, 600),
    fill: opt.fill || 'black',
    fontFamily: opt.fontFamily || 'Gill Sans',
    id: opt.id || canvas.uniqueID(),
    name: opt.name || canvas.uniqueID()
  };
  parseFloat(opt.width)?options.width=parseFloat(opt.width):void(0);
  parseFloat(opt.height)?options.width=parseFloat(opt.height):void(0);
  opt.__text?options.__text=opt.__text:opt.text?options.__text=opt.text:options.__text='#penchat';
  delete options.METHOD;
  var NEW = new fabric.Text( options.__text || '#penchat', options );
  canvas.add(NEW);
  canvas.setActiveObject(NEW);
  return NEW;
}

function removeObject(id){
  var object = canvas.getItemById(id)?canvas.getItemById(id):canvas.getItemByName(id)?canvas.getItemByName(id):canvas.item(id);
  if(object){
    object.remove();
    return object;
  }else{
    return false;
  }
}
function objEdit(query){
  var id = query.id || query.name;
  var object = canvas.getItemById(id)?canvas.getItemById(id):canvas.getItemByName(id)?canvas.getItemByName(id):canvas.item(id);
  if(object){
    for(var n in query){
      object[n] = query[n];
    }
    return object;
  }else{
    return false;
  }
}
function objGet(id){
  var object = canvas.getItemById(id)?canvas.getItemById(id):canvas.getItemByName(id)?canvas.getItemByName(id):canvas.item(id);
  if(object){
    return object;
  }else{
    return false;
  }
}
function setBackground(backg){
  canvas.backgroundColor = backg; //:canvas.setBackgroundImage(backg.split('=')[1]);
  return {set: true};
}
function setOverlay(image){
  canvas.setOverlayImage(image);
  return {set: true};
}
