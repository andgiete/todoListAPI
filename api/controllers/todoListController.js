'use strict';

var mongoose = require('mongoose');
var Task = mongoose.model('Tasks'),
  User = mongoose.model('Users');
var jwt = require('jsonwebtoken');

function verify(token,secret){
  try{
    var decoded = jwt.verify(token,secret);
    return decoded;
  }catch(err){
    return false;
  }
};

exports.list_all_tasks = function(req, res){
  var decoded = verify(req.headers.authorization,'secret');
  if(!req.headers.authorization || !decoded ){
    res.json({message:'Not Authenticated'});
    return;
  }
  Task.find({username: decoded.username},function(err,task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res){
  var decoded = verify(req.headers.authorization,'secret');
  if(!req.headers.authorization || !decoded){
    res.json({message:'Not Authenticated'});
    return;
  }
  var new_task = new Task({
    name: req.body.name,
    username: decoded.username
  });
  new_task.save(function(err,task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res){
  var decoded = verify(req.headers.authorization,'secret')
  if(!req.headers.authorization || !decoded){
    res.json({message:'Not Authenticated'});
    return;
  }
  Task.findById(req.params.taskId, function(err, task){
    if(err)
      res.send(err);
    if(task.username == decoded.username){
      res.json(task);
    }else{
      res.json({message: 'You are not authorized to access this task!'});
    }
  });
};

exports.update_a_task = function(req, res){
  var decoded = verify(req.headers.authorization,'secret')
  if(!req.headers.authorization || !decoded){
    res.json({message:'Not Authenticated'});
    return;
  }
  Task.findOneAndUpdate({_id: req.params.taskId, username:decode.username}, req.body, {new: true}, function(err, task){
    if(err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res){
  var decoded = verify(req.headers.authorization,'secret')
  if(!req.headers.authorization || !decoded){
    res.json({message:'Not Authenticated'});
    return;
  }
  Task.remove({
    _id: req.params.taskId,
    username: decoded.username
  },function(err,task){
    if(err)
      res.send(err);
    res.json({message:'Task successfully deleted.'});
  });
};

function getUserFromDatabase(my_username){
  User.findOne({username: my_username},function(err,user){
    return err;
  });
};

exports.authenticate = function(req,res){
  User.findOne({username: req.body.username},function(err,user){
    if(err){
      res.send(err);
      return;
    }
    if(user && (user.password == req.body.password)){
      var token = jwt.sign({ username: user.username , iat: Date.now()}, 'secret',function(err,mytoken){
        if(err)
          res.send(err);
        res.json({token: mytoken});
      });
    }else{
      res.json({message:'Invalid username or password'});
    }
  });
};

exports.register = function(req, res){
  if(!(req.body.username && req.body.password)){
    res.json({message:'Insert Username and Password'});
    return;
  }
  var new_user = new User(req.body);
  new_user.save(function(err,user){
    if(err)
      res.send(err);
    res.json(user);
  });
}
