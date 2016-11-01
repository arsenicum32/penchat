var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var router = express.Router();

mongoose.connect('mongodb://localhost/penchat', { promiseLibrary: require('bluebird') });

var db = mongoose.connection;
var Schema = mongoose.Schema;

var schema = {
  artists: new Schema({
      name: String,
      time: { type : Date, default: Date.now }
    }).plugin( require('mongoose-simple-random') )
}

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function callback () {
    console.log('connect to penchat');
});



var history = mongoose.model('History', {
  action: String,
  object: {type: Object, default: {} },
  canvas: String,
  owner: String,
  time : { type : Date, default: Date.now }
});

var canvas = mongoose.model('Canvas', {
  name: {type: String, lowercase: true, trim: true, required: true, unique: true},
  owner: String,
  desc: String,
  data: {type: Schema.Types.Mixed, default: {}},
  objects: {type: Array, default: []},
  tags: Array,
  time: { type : Date, default: Date.now }
});


var artists = mongoose.model('Artists', schema.artists );



var users = mongoose.model('Users', {
  phone: {type: String, lowercase: true, trim: true, required: true, unique: true},
  phoneVerify: {type: Boolean, default: false},
  artist: String,
  email: String,
  emailVerify: {type: Boolean, default: false},
  username: {type: String, lowercase: true, trim: true, required: true, unique: true},
  password: {type: String, trim: true, required: true},
  ava: String,
  desc: String,
  time: { type : Date, default: Date.now }
})

var models = {
  'history': history,
  'canvas': canvas,
  'users': users,
  'artists': artists
}

var gets = {
  '/': function(req,res,next){
    var keys = [];
    for(var k in models) keys.push(k);
    res.json(keys);
  },
  '/:model/see': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].find({}, function(err,data){
        res.render(req.params.model, err?{err:err}:{data:data} );
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/:model/all': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].find({}, function(err,data){
        res.json(err?err:data);
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/:model/get/:id': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].findById( req.params.id , function(err,o){
        o? res.json(o) : res.json({error: "not found"});
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/:model/add': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      var ac = new models[req.params.model]( req.query );
      res.json(ac.save());
    }else{
      res.json({error: "no model find"});
    }
  },
  '/:model/upd/:id': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].findById( req.params.id , function(err,o){
        if(o){
          for(var i in req.query){
            o[i] = req.query[i];
          }
          res.json(o.save());
        } else {
          res.json({error: "not found"});
        }
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/:model/rem/:id': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      if(req.query.token=='token'){
        models[req.params.model].findById(req.params.id , function(err,o){
          o? res.json(o.remove()) : res.json({error: "not found"})
        })
      }else{
        res.json({error: "no token passed"});
      }
    }else{
      res.json({error: "no model find"});
    }
  }
}

for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = {
  router:router,
  models:models
};
