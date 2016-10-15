(function startup() {
  var el = document.getElementsByTagName("canvas")[0];
  window.res = function(){
    el.width = window.innerWidth;
    el.height = window.innerHeight;
    var ctx = el.getContext("2d");
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, el.width, el.height);
  }
  res();
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchmove", handleMove, false);
  window.addEventListener("resize", res, false);
  log("initialized.");
  window.onload = function(){
    //draw.cn(0,0);
  }
})();

// (function(){
//   window.sysv = {
//     sx: 0,
//     sy: 0,
//     endx: 0,
//     endy: 0,
//     offsetx: 0,
//     offsety: 0
//   };
// })();
