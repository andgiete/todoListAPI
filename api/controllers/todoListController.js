'use strict';

var mongoose = require('mongoose');
var Task = mongoose.model('Tasks');
var jwt = require('jsonwebtoken');

function verify(token,secret){
  try{
    var decoded = jwt.verify(token,secret);
  }catch(err){
    return false;
  }
  return decoded;
};

exports.list_all_tasks = function(req, res){
  if(!req.headers.authorization || !verify(req.headers.authorization,'secret')){
    res.json({message:'Not Authenticated'});
    return;
  }
  Task.find({},function(err,task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res){
  if(!req.headers.authorization || !verify(req.headers.authorization,'secret')){
    res.json({message:'Not Authenticated'});
    return;
  }
  var new_task = new Task(req.body);
  new_task.save(function(err,task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res){
  console.log(req);
  if(!req.headers.authorization || !verify(req.headers.authorization,'secret')){
    res.json({message:'Not Authenticated'});
    return;
  }
  Task.findById(req.params.taskId, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res){
  if(!req.headers.authorization || !verify(req.headers.authorization,'secret')){
    res.json({message:'Not Authenticated'});
    return;
  }
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res){
  if(!req.headers.authorization || !verify(req.headers.authorization,'secret')){
    res.json({message:'Not Authenticated'});
    return;
  }
  Task.remove({
    _id: req.params.taskId
  },function(err,task){
    if(err)
      res.send(err);
    res.json({message:'Task successfully deleted.'});
  });
};

exports.authenticate = function(req,res){
  if(req.body.username == 'simon' && req.body.password == 'saliba'){
    var token = jwt.sign({ name: 'Simon Saliba' , iat: Date.now()}, 'secret',function(err,mytoken){
      if(err)
        res.send(err);
      console.log(mytoken);
      res.json({token: mytoken});
    });
  }else{
    res.json({message:'Invalid username or password'});
  }
}
