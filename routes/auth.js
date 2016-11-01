var express = require('express');
var mongoose = require('mongoose');
var mr = require('mongoose-simple-random');
var request = require('request');
var bluebird = require('bluebird');

var m = require('./db').models;

function isValid(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return [ digits , (digits.match(phoneRe) !== null)];
}

var gets = {
  '/phone': function(req,res){
    res.json(isValid(req.query.p || ''));
  },
  '/login': function(req,res){
    if(req.query.username && req.query.password){
      m.users.findOne({ username: req.query.username , password: req.query.password} , function(err,o){
        err?
          res.json(err)
          :
          o?res.json({sucsess: o._id}):
          res.json({error: "login or password is incorrect"});
      });
    }else{ res.json({error: "login or password are empty"})}
  },
  '/info/:id': function(req,res){
    m.users.findById(req.params.id, function(err,o){
      err?res.json(err):o?res.json({username: o.username , ava: o.ava , desc: o.desc}):res.json({error: "no users found"});
    });
  },
  '/exist/:name': function(req,res){
    m.users.findOne({username: req.params.name} , function(err,o){
      res.json(err?err:o?{user: o._id}:{user: null});
    });
  },
  '/ava/:name': function(req,res){
    req.query.link?
    m.users.findOne({username: req.params.name} , function(err,o){
      if(err){ res.json(err);}else{
        if(!o){
          res.json({error: "users not found"})
        }else{
          o.set('ava' , req.query.link );
          o.markModified('ava');
          o.save(function(err,r){ res.json(err?err:r)});
        }
      }
    }):m.users.findOne({username: req.params.name}, function(err,o){
      res.json(err?err:o?{ava:o.ava}:{ava:null});
    });
  },
  '/join': function(req,res){
    var q = req.query;
    if(q.username && q.password && isValid(q.phone)[1] ){
      var us = new m.users({
        username: q.username,
        password: q.password,
        phone: isValid(q.phone)[0]
      });
      us.save(function(err,o){
        console.log(o);
        if(err){
          res.json(err);
        }else{
          res.json({ sucsess: req.getUrl().path + '/auth/join/s2/'+ us._id });
        }
      });
    }else{ res.json({error: "no params passed"}) }
  },
  '/join/s2/:id': function(req,res){
    m.users.findById( req.params.id , function(err,o){
      if(o){
        m.artists.findOneRandom(function(er,ran){
          if(er){ res.json(er); }else{
            if(ran){
              request('http://sms.ru/sms/send?api_id=CBA175D0-B1D4-92D2-12F9-C5C1844DF710&to=7'+ o.phone + '&text=' + ran.name , function (error, response, body) {
                console.log(error  + ':' + response + ':' + body.split('\n')[0] );
                if (!error && response.statusCode == 200) {
                  o.set('artist' ,  ran._id );
                  o.markModified('artist');
                  o.save(function(err,r){
                    if(err){res.json(err)}else{ res.json( { sucsess: req.getUrl().path + '/auth/join/s3/' + o._id + '/' + ran._id }) }
                  });
                }else{
                  res.json(error?error:{error:response.statusCode});
                }
              })
            }else{ res.json({error: "ran not found"}) }
          }
        })
      }else{ res.json({error: "no user find"}); }
    });
  },
  '/join/s3/:uid/:id': function(req , res){
    m.artists.findById( req.params.id , function(err,o){
      if(err){ res.json(err); }else{
        if(o){ if(req.query.code){
          if(req.query.code == o.name){
            m.users.findById(req.params.uid, function(err, USER){
              if(err){res.json(err)}else{
                if(USER){
                  USER.set('phoneVerify' , true );
                  USER.markModified('phoneVerify');
                  USER.save(function(err,good){
                    res.json(err?err:{sucsess: good._id });
                  });
                }else{ res.json({error: "user not found"} )}
              }
            });
          }else{ res.json({error: "wrong code"}); }
        }else{ res.json({error: "no code passed"}) }
        }else{ res.json({error: "artist not found"}) }
      }
    })
  }
}
var router = express.Router();

for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
