var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cors = require('cors');
var path = require('path');

var app = express();

//var socket = require('./routes/socket');


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
app.use(cors());
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//     req.getUrl = function() {
//       return {
//         full: req.protocol + "://" + req.get('host') + req.originalUrl,
//         path: req.protocol + "://" + req.get('host')
//       };
//     }
//     return next();
// });

app.use('/db', require('./routes/db').router );

app.listen(9000, function () {
  console.log('Example app listening on port 9000!');
})
