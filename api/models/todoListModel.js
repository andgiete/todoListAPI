'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name:{
    type: String,
    required: 'Task Name: '
  },
  username:{
    type: String
  },
  created_date:{
    type: Date,
    default: Date.now
  },
  status:{
    type:[{
      type: String,
      enum: ['pending','ongoing','completed']
    }],
    default: ['pending']
  }
});

var UserSchema = new Schema({
  username:{
    type: String
  },
  password:{
    type: String
  },
  privilege:{
    type: String,
    enum: ['admin','guest']
  }
});

module.exports = mongoose.model('Tasks',TaskSchema);
module.exports = mongoose.model('Users',UserSchema);
