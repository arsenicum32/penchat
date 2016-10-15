var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

mongoose.connect('mongodb://localhost/penchat');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function callback () {
    console.log('connect');
});

var history = mongoose.model('History', {
  action: String,
  desc: String,
  link: String,
  data: Object,
  time : { type : Date, default: Date.now }
});

var users = mongoose.model('Users', {
  name: String,
  email: String,
  phone: String,
  ava: String,
  desc: String,
  data: Object,
  time : { type : Date, default: Date.now }
});

var canvas = mongoose.model('Canvas', {
  name: String,
  owner: String,
  desc: String,
  data: Object,
  time: { type : Date, default: Date.now }
});

var models = {
  'history': history,
  'canvas': canvas,
  'users': users
}

var gets = {
  '/': function(req,res,next){
    var keys = [];
    for(var k in models) keys.push(k);
    res.json(keys);
  },
  '/see/:model': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].find({}, function(err,data){
        res.render(req.params.model, err?{err:err}:{data:data} );
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/all/:model': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].find({}, function(err,data){
        res.json(err?err:data);
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/get/:model/:id': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].findById( req.params.id , function(err,o){
        o? res.json(o) : res.json({error: "not found"});
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/add/:model': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      var ac = new models[req.params.model]( req.query );
      res.json(ac.save());
    }else{
      res.json({error: "no model find"});
    }
  },
  '/update/:model/:id': function(req,res,next){
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
  '/rem/:model': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      if(req.query.id){
        models[req.params.model].findById(req.query.id , function(err,o){
          o? res.json(o.remove()) : res.json({error: "not found"})
        })
      }else{
        res.json({error: "no id passed"});
      }
    }else{
      res.json({error: "no model find"});
    }
  }
}

for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
