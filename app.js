var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var cors = require('cors');
var path = require('path');
var autoprefixer = require('autoprefixer-stylus');
var stylus = require('stylus');

var app = express();

var socket = require('./routes/socket');


app.set('view engine', 'jade');

app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: function(str, path) {
    return stylus(str)
      .use(autoprefixer())   // autoprefixer
      .set('filename', path) // @import
      .set('compress', true) // compress
    ;
  }
}));

app.use(busboy());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/db', require('./routes/db') );
//app.use('/api', require('./routes/api') );

app.get('/html/:page', function (req, res,next) {
  res.render(req.params.page);
});

app.get('/', function(req,res,next){
  res.send('hi!!');
})

app.listen(8500, function () {
  console.log('Example app listening on port 8500!');
})
