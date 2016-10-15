function normselect(){
  for (var n = 0; n < canvas.getObjects().length; n++) {
   var color = ['blue','red','yellow','hotpink'][Math.floor(Math.random()*4)];
   if(!canvas.item(n).letter){
     canvas.item(n).set({
         borderColor: color,
         cornerColor: color,
         cornerSize: 6,
         transparentCorners: false
       });
   }
  }
}
