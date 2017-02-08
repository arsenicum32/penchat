var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var router = express.Router();

mongoose.connect('mongodb://localhost/penchat', { promiseLibrary: require('bluebird') });

var db = mongoose.connection;
var Schema = mongoose.Schema;

// var schema = {
//   artists: new Schema({
//       name: String,
//       time: { type : Date, default: Date.now }
//     }).plugin( require('mongoose-simple-random') )
// }

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function callback () {
    console.log('connect to penchat');
});

function uniqueID(){
      function chr4(){
        return Math.random().toString(16).slice(-4);
      }
      return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}


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
  background: {type: String, default: ""},
  data: {type: Schema.Types.Mixed, default: {}},
  objects: {type: Array, default: []},
  time: { type : Date, default: Date.now }
});




// var users = mongoose.model('Users', {
//   phone: {type: String, lowercase: true, trim: true, required: true, unique: true},
//   phoneVerify: {type: Boolean, default: false},
//   artist: String,
//   email: String,
//   emailVerify: {type: Boolean, default: false},
//   username: {type: String, lowercase: true, trim: true, required: true, unique: true},
//   password: {type: String, trim: true, required: true},
//   ava: String,
//   desc: String,
//   time: { type : Date, default: Date.now }
// })

var models = {
  'history': history,
  'canvas': canvas
}

// var gets = {
//   '/': function(req,res,next){
//     var keys = [];
//     for(var k in models) keys.push(k);
//     res.json(keys);
//   },
//   '/:model/see': function(req,res,next){
//     if(models.hasOwnProperty(req.params.model)){
//       models[req.params.model].find({}, function(err,data){
//         res.render(req.params.model, err?{err:err}:{data:data} );
//       })
//     }else{
//       res.json({error: "no model find"});
//     }
//   },
//   '/:model/all': function(req,res,next){
//     if(models.hasOwnProperty(req.params.model)){
//       models[req.params.model].find({}, function(err,data){
//         res.json(err?err:data);
//       })
//     }else{
//       res.json({error: "no model find"});
//     }
//   },
//   '/:model/get/:id': function(req,res,next){
//     if(models.hasOwnProperty(req.params.model)){
//       models[req.params.model].findById( req.params.id , function(err,o){
//         o? res.json(o) : res.json({error: "not found"});
//       })
//     }else{
//       res.json({error: "no model find"});
//     }
//   },
//   '/:model/add': function(req,res,next){
//     if(models.hasOwnProperty(req.params.model)){
//       var ac = new models[req.params.model]( req.query );
//       res.json(ac.save());
//     }else{
//       res.json({error: "no model find"});
//     }
//   },
//   '/:model/upd/:id': function(req,res,next){
//     if(models.hasOwnProperty(req.params.model)){
//       models[req.params.model].findById( req.params.id , function(err,o){
//         if(o){
//           for(var i in req.query){
//             o[i] = req.query[i];
//           }
//           res.json(o.save());
//         } else {
//           res.json({error: "not found"});
//         }
//       })
//     }else{
//       res.json({error: "no model find"});
//     }
//   },
//   '/:model/rem/:id': function(req,res,next){
//     if(models.hasOwnProperty(req.params.model)){
//       if(req.query.token=='token'){
//         models[req.params.model].findById(req.params.id , function(err,o){
//           o? res.json(o.remove()) : res.json({error: "not found"})
//         })
//       }else{
//         res.json({error: "no token passed"});
//       }
//     }else{
//       res.json({error: "no model find"});
//

const mknorm = (vr)=> {
  if(parseFloat(vr) != NaN ){
    if(parseFloat(vr)==parseInt(vr) ) {return parseInt(vr)} else {return parseFloat(vr);}
  }else{
    try{
      return JSON.parse(vr)
    }catch(e){
      return vr;
    }
  }
}

// создаем новый канвас
router.get('/new/:name', (req,res)=>{
  res.json({res: true});
  var canvas = new models.canvas({name: req.params.name});
  canvas.save()
  .then(_=> res.json({success:true}), err=> res.json({error:err}));

  // .then(function() {
  //   var canvas = new models.canvas({name: req.params.name});
  //   return canvas.save();
  // })
})

router.get('/new/:name', (req,res)=>{
  res.json({res: true});
  var canvas = new models.canvas({name: req.params.name});
  canvas.save()
  .then(_=> res.json({success:true}), err=> res.json({error:err}));

  // .then(function() {
  //   var canvas = new models.canvas({name: req.params.name});
  //   return canvas.save();
  // })
})
router.get('/remove/:name', (req,res)=>{
  var promise = models.canvas.findOneAndRemove({name: req.params.name}).exec();
  promise.then(e=> res.json({success:e}), err=> res.json({error:err}));
})

//var lasttime = {};

// функции ниже будут логгироваться временем последнего вызова...
// грузим оперативную память
router.use( (req,res,next)=> {
  console.log(req.url);
  //lasttime[req.url] = (new Date()).getTime();
  next();
});

// router.get('/ping', (req,res)=> {
//   req.query.p ? res.json({has: lasttime.hasOwnProperty(req.query.p) }) :
//   res.json(lasttime);
// });

router.get('/clear/:name', (req,res)=>{
  var promise = models.canvas.findOne({name: req.params.name}).exec();
  promise.then(canvas=> {
    canvas.objects = []
    canvas.background = ''
    canvas.markModified('objects');
    canvas.markModified('background');
    return canvas.save();
  }).then(_=> res.json({success: true}))
  .catch(err=> res.json({error:err}) );
})

router.post('/canvas/change/:name', (req, res)=> {
  var promise = models.canvas.findOne({name: req.params.name}).exec();

  var fnd = (canvas , ob) =>{
    var obj = false;
    for(var i in canvas.objects){
      if(canvas.objects[i].id == ob.id) obj = {item: canvas.objects[i], layer: i};
    }
    return obj;
  }
  var mdl = {error: true};

  promise.then(canvas=> {
    if(req.body.data.objects) {
      var objs = req.body.data.objects;
      for(var i in objs){
        if(!objs[i].id || !objs[i].type ) continue;
        const ob = fnd( canvas , objs[i]);
        if(ob){
          !objs[i].visible ? canvas.objects.slice(ob.layer,1):
          canvas.objects[ob.layer] = Object.assign( ob.item, objs[i] );
        }else{
          canvas.objects.push(objs[i]);
        }
      }
    }
    req.body.data.background ? canvas.background = req.body.data.background:void(0);
    canvas.markModified('objects');
    canvas.markModified('background');
    mdl = {objects: canvas.objects, background: canvas.background };
    return canvas.save();
  }).then(_=> res.json(mdl) )
  .catch(err=> res.json({error:err}) );
})
// получаем все канвасы
router.get('/canvas', (req,res)=>{
  var promise = models.canvas.find({}).select({_id: false, name: true}).sort({time: -1}).exec();
  promise.then(data=>{
    var ar = [];
    for(var i in data){ ar.push(data[i].name) } res.json(ar);
  })
  .catch(err=> res.json(err))
})
// получаем дату канваса
router.get('/canvas/:name', (req,res)=>{
  var promise = models.canvas.findOne({name: req.params.name}).exec();

  // promise.then(canvas=> {
  //   var objs = canvas.objects;
  //   for(var i in objs){
  //     objs[i].id = uniqueID();
  //   }
  //   canvas.objects = objs;
  //   canvas.markModified('objects');
  //   //console.log(canvas);
  //   return canvas.save();
  // }).then(_=> {
  //   res.json(true);
  // }, _=> res.json(false))
  promise.then(canvas=> res.json({objects: canvas.objects, background: canvas.background}) )
  .catch(err=> res.json({error:err}) );
});

// запихиваем новый объект в дату канваса
router.post('/canvas/:name/object/add' , (req,res)=> {
  var promise = models.canvas.findOne({name: req.params.name}).exec();

  //console.log(req.body);
  //res.json(req.query)

  promise.then(canvas=> {
    if(req.body.type){
      var o = req.body;
      !o.id ? o.id = uniqueID() : void(0)
      canvas.objects.push(o);
    }
    canvas.markModified('objects');
    return canvas.save();
  }).then(canvas=> res.json({success: true}))
  .catch(err=> res.json({error:err}) );
})
//редактируем объект
router.post('/canvas/:name/object/edit/:id',  (req,res)=>{
  var promise = models.canvas.findOne({name: req.params.name}).exec();

  promise.then(canvas=> {
    for(var i in canvas.objects){
      if( canvas.objects[i].id == req.params.id  ){
        canvas.objects[i] = Object.assign(canvas.objects[i] , req.body );
      }
    }
    canvas.markModified('objects');
    return canvas.save();
  }).then(canvas=> res.json({success: true}))
  .catch(err=> res.json({error:err}) );
})
// удаляем объект из даты канваса
router.get('/canvas/:name/object/rem/:id', (req,res)=> {
  var promise = models.canvas.findOne({name: req.params.name}).exec();

  promise.then(canvas=> {
    for(var i in canvas.objects){
      if( canvas.objects[i].id == req.params.id  ){
        canvas.objects.splice(i, 1)
      }
    }
    canvas.markModified('objects');
    return canvas.save();
  }).then(canvas=> res.json({success: true}))
  .catch(err=> res.json({error:err}) );
})
// изменяем фон канваса
router.get('/canvas/:name/background/:color',  (req,res)=>{
  var promise = models.canvas.findOne({name: req.params.name}).exec();

  promise.then(canvas=> {
    canvas.background = req.params.color;
    canvas.markModified('background');
    return canvas.save();
  }).then(canvas=> res.json({success: true}))
  .catch(err=> res.json({error:err}) );
})


// promise.then(function(user) {
//   user.name = 'Robert Paulson';
//
//   return user.save(); // returns a promise
// })
// .then(function(user) {
//   console.log('updated user: ' + user.name);
//   // do something with updated user
// })
// .catch(function(err){
//   // just need one of these
//   console.log('error:', err);
// });

module.exports = {
  router:router,
  models:models
};
