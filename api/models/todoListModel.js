'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name:{
    type: String,
    required: 'Task Name: '
  },
  Created_date:{
    type: Date,
    default: Date.now
  },
  status:{
    type:[{
      type: String,
      enum: ['pending','ongoing','completed']
    }],
    defualt: ['pending']
  }
});

module.exports = mongoose.model('Task',TaskSchema);
