var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var cookieParser = require('cookie-parser')
var cors = require('cors');
var path = require('path');
var autoprefixer = require('autoprefixer-stylus');
var stylus = require('stylus');

var app = express();

var socket = require('./routes/socket');


app.set('view engine', 'jade');

// app.use(stylus.middleware({
//   src: path.join(__dirname, 'public'),
//   compile: function(str, path) {
//     return stylus(str)
//       .use(autoprefixer())   // autoprefixer
//       .set('filename', path) // @import
//       .set('compress', true) // compress
//     ;
//   }
// }));

app.use(busboy());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    req.getUrl = function() {
      return {
        full: req.protocol + "://" + req.get('host') + req.originalUrl,
        path: req.protocol + "://" + req.get('host')
      };
    }
    return next();
});

app.use(cookieParser('secret'));
//app.use(express.bodyParser());
//app.use(express.session({ secret: 'SECRET' }));

app.use('/db', require('./routes/db').router );
app.use('/api', require('./routes/api') );
app.use('/auth', require('./routes/auth') );

app.get('/html/:page', function (req, res,next) {
  res.render(req.params.page);
});

app.get('/testdata', function(req,res){
  require('fs').readFile('./test.json', 'utf-8' , function(err, data){
    res.json(JSON.parse(data));
  });
})

app.get('/', function(req,res,next){
  require('request').get('http://project77128.tilda.ws/slice', function(err,rs,body){
    $ = require('cheerio').load(body);
    $('#tildacopy').remove();
    $('body').prepend('<script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter40957384 = new Ya.Metrika({ id:40957384, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/40957384" style="position:absolute; left:-9999px;" alt="" /></div></noscript>');
    res.send($.html());
  })
  //res.render('index');
});

app.listen(9000, function () {
  console.log('Example app listening on port 9000!');
})
