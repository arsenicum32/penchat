$(document).ready(function(){
  var dropZone = document.getElementById('dropZone');

  function showDropZone() {
      dropZone.style.visibility = "visible";
  }
  function hideDropZone() {
      dropZone.style.visibility = "hidden";
  }

  function allowDrag(e) {
      if (true) {  // Test that the item being dragged is a valid one
          e.dataTransfer.dropEffect = 'copy';
          e.preventDefault();
      }
  }

  function handleDrop(e) {
      e.preventDefault();
      hideDropZone();

      var file = e.dataTransfer.files[0],
          reader = new FileReader();

      reader.onload = function (event) {
      //  alert(event.target.result);
        addImage({
          link: event.target.result,
          left: e.clientX + glob.offsetx,
          top: e.clientY + glob.offsety
        });
        //holder.style.background = 'url(' + event.target.result + ') no-repeat center';
      };

      reader.readAsDataURL(file);

      return false;

      //alert('Drop!');
  }

  // 1
  window.addEventListener('dragenter', function(e) {
      showDropZone();
  });

  // 2
  dropZone.addEventListener('dragenter', allowDrag);
  dropZone.addEventListener('dragover', allowDrag);

  // 3
  dropZone.addEventListener('dragleave', function(e) {
      hideDropZone();
  });

  // 4
  dropZone.addEventListener('drop', handleDrop);

});
