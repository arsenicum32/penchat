$('#phone').on('keyup', function(e){
  if(e.keyCode==13 && $(this).css('border-color') == 'rgb(144, 238, 144)'){
    $(this).css('border' , 'none')
    $(this).val('');
    $(this).off('keyup');
    $(this).off('input');
    addText({text: "вам пришло смс с именем художника - введите его.. "});
    superplaceholder({
        el: document.getElementById('phone'),
        sentences: [ 'вам пришло смс с именем', 'введите его сюда :)'],
        options: {
            letterDelay: 100, // milliseconds
            sentenceDelay: 1000,
            startOnFocus: false,
            loop: false,
            shuffle: false,
            showCursor: true,
            cursor: '|'
        }
    });
    $(this).on('keyup', function(e){
      if(e.keyCode == 13){
        alert('fuck you')
      }
    });
  }
})

$('#phone').on('input', function(e){
  $.get(main.url + '/auth/phone?p=' + $(this).val() , function(d){
    if(d[1] == true){
      $('#phone').css('border' , '2px solid lightgreen')
    }else if(d[1] == false){
      $('#phone').css('border' , '2px solid red')
    }
  });
})

superplaceholder({
    el: document.getElementById('phone'),
    sentences: [ 'телефон без кода страны', 'пример: 916 000 21 21'],
    options: {
        // delay between letters (in milliseconds)
        letterDelay: 100, // milliseconds
        // delay between sentences (in milliseconds)
        sentenceDelay: 1000,
        // should start on input focus. Set false to autostart
        startOnFocus: false,
        // loop through passed sentences
        loop: false,
        // Initially shuffle the passed sentences
        shuffle: false,
        // Show cursor or not. Shows by default
        showCursor: true,
        // String to show as cursor
        cursor: '|'
    }
});
