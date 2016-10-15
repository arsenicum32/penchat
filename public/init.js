fabric.Canvas.prototype.getItemByName = function(name) {
    var object = null,
        objects = this.getObjects();

    for (var i = 0, len = this.size(); i < len; i++) {
      if (objects[i].name && objects[i].name === name) {
        object = objects[i];
        break;
      }
    }
    return object;
  };
fabric.Canvas.prototype.getItemById = function(id) {
      var object = null,
          objects = this.getObjects();

      for (var i = 0, len = this.size(); i < len; i++) {
        if (objects[i].id && objects[i].id === id) {
          object = objects[i];
          break;
        }
      }
      return object;
  };
fabric.Canvas.prototype.ObjectIndex = function(object) {
        for (var i = 0; i < canvas._objects.length; i++) {
          if (canvas._objects[i].id === object.id) {
            return i;
          }
        }
        return -1;
  };
fabric.Canvas.prototype.SeeData = function(){ // функция вместо track()
      return JSON.stringify(canvas.toDatalessJSON(), null, '\t');
  };
fabric.Canvas.prototype.uniqueID = function(){
      function chr4(){
        return Math.random().toString(16).slice(-4);
      }
      return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
  };
