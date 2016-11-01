var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var mongoose = require('mongoose');
var express = require('express');

var router = express.Router();

var db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function callback () {
    console.log('connect to users');
});

var users = mongoose.model('Users', {
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password,done){
  users.findOne({ username : username },function(err,user){
    return err
      ? done(err)
      : user
        ? password === users.password
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password.' })
        : done(null, false, { message: 'Incorrect username.' });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  users.findById(id, function(err,user){
    err
      ? done(err)
      : done(null,user);
  });
});

var route = {};

route.login = function(req, res, next) {
  passport.authenticate('local',
    function(err, user, info) {
      return err
        ? next(err)
        : user
          ? req.logIn(user, function(err) {
              return err
                ? next(err)
                : res.redirect('/private');
            })
          : res.redirect('/');
    }
  )(req, res, next);
};

// Здесь все просто =)
route.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

// Регистрация пользователя. Создаем его в базе данных, и тут же, после сохранения, вызываем метод `req.logIn`, авторизуя пользователя
route.register = function(req, res, next) {
  var user = new users({ username: req.body.username, password: req.body.password});
  user.save(function(err) {
    return err
      ? next(err)
      : req.logIn(user, function(err) {
        return err
          ? next(err)
          : res.redirect('/private');
      });
  });
};

route.mustAuthenticatedMw = function (req, res, next){
  req.isAuthenticated()
    ? next()
    : res.redirect('/');
};

router.post('/login', route.login);
router.post('/logout', route.logout);
router.post('/register', route.register);

router.get('/:frame', function(req,res,next){
  res.render('./auth/'+req.params.frame+'.jade');
})

module.exports = router;
