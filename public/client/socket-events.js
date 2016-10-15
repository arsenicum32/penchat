$(document).ready(function(){
  socket.on('canvas', function(msg){   // получаем ответ от сервера и данные на запрос ping, применяем изменения на холсте
    var method = msg.METHOD; // все функции вызываемые в этом блоке включенны в canvas_lib.js
    switch (method) {
      case ("add" || "addObject"):
        addObject(msg);
        break;
        case ("remove" || "rem"):
          removeObject(msg.id);
          break;
          case ("moving"):
          break;
          case ("scaling"):
          break;
          case ("rotating"):
          break;
          case ("modified"):
          break;
      default:
    }
  });
});
