var TMR = 0;

setInterval(function(){
  Math.random() > 0.95  ? addObject({}): void(0);
  console.log(TMR);
  TMR +=1;
  fireobject(TMR);
  Math.random() > 0.95  ? addText({text: "hello world"}) : void(0);
}, 100);

// alert('test');
//
// var timer = 0;
//
//
// if(true){
//     setInterval(function() {
//       console.log(timer);
//       timer += 0.1;
//       //fireobject(timer);
//     }, 100);
// }
//
// ПИТЧ
// _______________________________ 21 сек
// Добрый день, я Арсений, это Илья и Денис (Денис Илья)… 3
//
// И и за эти два дня мы переизобрёли социальную сеть… 2,5
//
// Наш проект penchat - платформа для публикации и обмена авторского и коллективного графического контента… 4,5
//
// Перед нами стояла задача: переосмыслить ключевые принципы UX-логики web и standartalone приложений… 5,5
//
// В ходе презентации я отвечу на три ключевых вопроса: что это, для кого, как это работает… 5,6
//
// _______________________________ 49 сек
// !!!! ЧТО (во время выступления мы продолжаем верстать презу на нашем продукте - сорян - хакатон...) 7
//
// Пенчат позволяет общаться средствами визуального языка… Социальная сеть для визуального контента… (гитхаб для дижитал художников это не беханс ни дрибл ли риалтайм борд ни фреймер зеплин юх пин ни тильда-редимаг и не продожаю этот ряд… ) 14
//
// Возможности паблиш-платформы:
// событийно-ориентированная анимация
// векторная графика -> в данные (невъебический обмен векторной графикой с webRTC)
// реактивная коммуникация на canvas (без лишних кнопок и 12ти колончатой бутсраповской вёрстки - рудименты книжного дизайна времён ян-чихольда) - дижитал форматы гораздо большее!!!
// даёшь канвасы - твой профиль/ твои личные сообщения/групповые чаты/коменты/лайки: реактивное рисование - к чёрту стикеры/списки/цифры/слова!!! 28
//
// _______________________________ 39 сек
// !!!! Для кого: 1
//
// Такое подойдёт практически для любой digital production кампании
// полносервисные рекламные агенства
// внутрифирменные рекламные агенства
// медийные рекламные агенства
// сетевые рекламные агенства
// дизайн бюро
// дизайн студии
// web студии 12
//
// Успешно дополнит ряд существующих социальных платформ, идеально впишется в forkflow типичного биханс-пинтрест-фрилансера (оттуда тянуть аудиторию) дабы существенно облегчить ему жизнь, в частных случаях будет использоваться как платформа для проведения вебинаров по рисованию.. (последнее просьба не переводить) 17
//
// Сотку даю - зайдёт среди учеников около-художественных заведений…. 4
//
// Будет на всю катушку выполнять функции онлайн портфолио, и промо страниц для перформанс-маркетинга.. 5
//
// __________________________________ 23 сек
// !!!! теперь десерт: как это работает… 2
//
// Я расшарил ссылку в телеграм.. Можете зайти и порисовать на демо холсте… 4
//
// На самом деле я дизайнер, временами покаживаю.. И во время пичта я поработаю с интересным брифом (там семь параллельных красных линий надо было нарисовать вроде, сейчас созвон с заказчиком…) 10
//
// 502!
//
// Хотел пару слов про перспективы продукта, ненарадуюсь на 502 - однозначно хайлоадс… 7
//
//
// Итого: 1,8 мин ///REDME

var fabr = [];

var robots = 0;

function fireobject(tt){
  $('.notify').hide();

  var t = tt/10;

  if(t==5){
    var o = addObject({
      type: 'Rect',
      width: 100,
      height: 100,
      fill: 'blue',
      left: 30,
      top: 40
    });
    fabr.push(o.id);
  }

  if(t<18 && t>7){
    objEdit({id: fabr[0], left: 30 + tt, top: 40 + t});
    $('.notify').show();
    $('.notify').css('top', '100px' );
    $('.notify').css('left', 40 + t*2 + 'px');
  }
  canvas.renderAll();
}
