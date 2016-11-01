var express = require('express');
var mongoose = require('mongoose');

var m = require('./db').models;


var gets = {
  '/:name/get/canvas': function(req, res){
    m.canvas.findOne({name: req.params.name} , function(err,mdl){
      err?res.json(err):mdl?res.json({objects:mdl.objects, background: ""}):res.json({error:"canvas not found"});
    })
  },
  '/:name/reset/canvas': function(req,res){
    m.canvas.findOne({name: req.params.name} , function(err,mdl){
      if(err) {res.json(err); return; }
      if(mdl) {
        mdl.set( 'objects' , []);
        mdl.markModified('objects');
        mdl.save();
        res.json(mdl.objects);
      }else{res.json({error:"canvas not found"});}
    })
  },
  '/:name/get/objects': function(req, res){
    m.canvas.findOne({name: req.params.name} , function(err,mdl){
      err?res.json(err):mdl?res.json(mdl.objects):res.json({error:"canvas not found"});
    })
  },
  '/:name/history/get': function(req, res){
    m.canvas.findOne({name: req.params.name} , function(err,mdl){
      err?res.json(err):mdl?fire(mdl.name):res.json({error:"canvas not found"});
    })
    function fire(name){
      m.history.find({owner: name}, function(err,md){
        err?res.json(err):md?res.json(md):res.json({error:"history not found"});
      })
    }
  },
  '/:name/set/objects/:id': function(req, res){
    m.canvas.findOne({name: req.params.name} , function(err,mdl){
      if(err){res.json(err)}else{
        if(mdl){
          var objs = mdl.objects;
          for(var i in objs){
            if(objs[i].id == req.params.id ){
              for(var n in req.query){
                objs[i][n] = req.query[n];
              }
              sv();
              return;
            }
          }

          var nobj = req.query;
          nobj.id ? void(0) : nobj.id = req.params.id ;
          objs.push(nobj);
          sv();

          function sv(){
            mdl.set( 'objects' , objs);
            mdl.markModified('objects');
            mdl.save(function(err2,obj){
              err2?res.json({error:err2, errorCode: 2}):res.json(obj);
            });
          }
      }else{res.json({error:"canvas not found"})}}
    })
  }
}


var router = express.Router();

for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
