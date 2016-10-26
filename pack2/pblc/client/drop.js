$(document).ready(function(){
  var dropZone = document.getElementById('uploadForm');

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
      hideDropZone();

      var file = e.dataTransfer.files[0],
          reader = new FileReader();

      reader.onload = function (event) {
        $('#uploadForm').ajaxForm(function(d) {
                if(d.path){
                  var info = d.path.split('.');
                  switch (info[info.length  - 2]) {
                    case 'image':
                      addImage({
                        link: d.path,
                        left: e.clientX + glob.offsetx,
                        top: e.clientY + glob.offsety
                      }, function(o){ sock.add(o); })
                      break;
                    case 'text':
                      $.get(d.path, function(dt){
                        addText({
                          text: dt,
                          left: e.clientX + glob.offsetx,
                          top: e.clientY + glob.offsety,
                          fontSize: 12 / dt.split('\n').length * 5 + 3
                        })
                        console.log(12 / dt.split('\n').length * 5 + 3);
                      })
                      break;
                    default:
                      addObject({
                        type: 'Circle',
                        width: 200,
                        height: 200,
                        fill: 'blue',
                        left: e.clientX + glob.offsetx,
                        top: e.clientY + glob.offsety
                      });
                  }
                }
        });
        $('#uploadForm').submit();
        //event.target.result  - base64 data
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
    setTimeout(function(){
      hideDropZone();
    }, 2000)
  });

  // 4
  dropZone.addEventListener('drop', handleDrop);

});
